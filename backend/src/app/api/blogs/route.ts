import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getUserFromRequest } from '../../../lib/auth';
import { blogSchema } from '../../../lib/validation';

// GET all blogs (Public)
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    
    const blogs = await db.blogs.findMany({ category });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error: any) {
    console.error('Failed to get blogs:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST create blog (Admin only)
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
    const result = blogSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { title, summary, content, image, category, status } = result.data;

    const newBlog = await db.blogs.create({
      title,
      summary,
      content,
      image,
      category,
      status: status || 'published',
      author: userPayload.username
    });

    return NextResponse.json({
      message: 'Blog post created successfully',
      blog: newBlog
    }, { status: 201 });

  } catch (error: any) {
    console.error('Failed to create blog:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
