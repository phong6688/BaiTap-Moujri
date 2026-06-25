import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { getUserFromRequest } from '../../../../lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single order details (Authenticated)
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload) {
      return NextResponse.json(
        { error: 'Unauthorized: Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const order = await db.orders.findOne({ id });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Customers can only see their own orders. Admins can see any order.
    if (userPayload.role !== 'admin' && order.userId !== userPayload.userId) {
      return NextResponse.json(
        { error: 'Forbidden: Access denied' },
        { status: 403 }
      );
    }

    return NextResponse.json(order, { status: 200 });

  } catch (error: any) {
    console.error('Failed to get order details:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT update order status (Admin only)
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload || userPayload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const existingOrder = await db.orders.findOne({ id });

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const { status } = await req.json();
    if (!status || !['pending', 'processing', 'shipped', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid or missing status value' },
        { status: 400 }
      );
    }

    const updatedOrder = await db.orders.update(id, { status });

    return NextResponse.json({
      message: `Order status updated to ${status}`,
      order: updatedOrder
    }, { status: 200 });

  } catch (error: any) {
    console.error('Failed to update order:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
