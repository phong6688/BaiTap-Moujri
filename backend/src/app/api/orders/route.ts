import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getUserFromRequest } from '../../../lib/auth';
import { orderSchema } from '../../../lib/validation';

// GET orders (Authenticated)
export async function GET(req: NextRequest) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload) {
      return NextResponse.json(
        { error: 'Unauthorized: Authentication required' },
        { status: 401 }
      );
    }

    let orders;
    if (userPayload.role === 'admin') {
      // Admins see all orders
      orders = await db.orders.findMany();
    } else {
      // Customers see only their own orders
      orders = await db.orders.findMany({ userId: userPayload.userId });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error('Failed to get orders:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST create order (Authenticated)
export async function POST(req: NextRequest) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload) {
      return NextResponse.json(
        { error: 'Unauthorized: Authentication required' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { items, totalAmount, shippingAddress, paymentMethod } = result.data;

    // Verify stock and process items
    const orderItems = [];
    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return NextResponse.json(
          { error: 'Invalid order item payload' },
          { status: 400 }
        );
      }

      const product = await db.products.findOne({ id: item.productId });
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for product ${product.name}. Available: ${product.stock}` },
          { status: 400 }
        );
      }

      // Deduct stock
      await db.products.update(product.id, {
        stock: product.stock - item.quantity
      });

      orderItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    const newOrder = await db.orders.create({
      userId: userPayload.userId,
      userEmail: userPayload.email,
      items: orderItems,
      totalAmount: Number(totalAmount),
      shippingAddress,
      paymentMethod
    });

    return NextResponse.json({
      message: 'Order created successfully',
      order: newOrder
    }, { status: 201 });

  } catch (error: any) {
    console.error('Failed to create order:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
