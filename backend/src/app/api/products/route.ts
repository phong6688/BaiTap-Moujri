import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getUserFromRequest } from '../../../lib/auth';
import { productSchema } from '../../../lib/validation';

// GET all products (Public)
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;

    const products = await db.products.findMany({ category, search });
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST create a product (Admin only)
export async function POST(req: NextRequest) {
  try {
    const userPayload = getUserFromRequest(req);
    
    if (!userPayload || userPayload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, description, price, salePrice, image, gallery, category, stock, status, featured } = result.data;

    const newProduct = await db.products.create({
      name,
      description,
      price: Number(price),
      salePrice: salePrice !== undefined && Number(salePrice) > 0 ? Number(salePrice) : undefined,
      image,
      gallery: Array.isArray(gallery) ? gallery : [],
      category,
      stock: Number(stock),
      status: status || (Number(stock) > 0 ? 'in_stock' : 'out_of_stock'),
      featured: !!featured
    });

    return NextResponse.json({
      message: 'Product created successfully',
      product: newProduct
    }, { status: 201 });

  } catch (error: any) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
