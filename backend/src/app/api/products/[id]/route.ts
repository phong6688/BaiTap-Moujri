import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { getUserFromRequest } from '../../../../lib/auth';
import { productSchema } from '../../../../lib/validation';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single product (Public)
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const product = await db.products.findOne({ id });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    console.error('Failed to get product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT update product (Admin only)
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
    const existingProduct = await db.products.findOne({ id });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const result = productSchema.partial().safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const updates = result.data;

    const updatedProduct = await db.products.update(id, {
      name: updates.name,
      description: updates.description,
      price: updates.price !== undefined ? Number(updates.price) : undefined,
      salePrice: updates.salePrice !== undefined ? (Number(updates.salePrice) > 0 ? Number(updates.salePrice) : undefined) : undefined,
      image: updates.image,
      gallery: Array.isArray(updates.gallery) ? updates.gallery : undefined,
      category: updates.category,
      stock: updates.stock !== undefined ? Number(updates.stock) : undefined,
      status: updates.status || (updates.stock !== undefined ? (Number(updates.stock) > 0 ? 'in_stock' : 'out_of_stock') : undefined),
      featured: updates.featured !== undefined ? !!updates.featured : undefined
    });

    return NextResponse.json({
      message: 'Product updated successfully',
      product: updatedProduct
    }, { status: 200 });

  } catch (error: any) {
    console.error('Failed to update product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE product (Admin only)
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload || userPayload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const deleted = await db.products.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Product not found or already deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Product deleted successfully'
    }, { status: 200 });

  } catch (error: any) {
    console.error('Failed to delete product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
