import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { getUserFromRequest } from '../../../../lib/auth';
import { blogSchema } from '../../../../lib/validation';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single blog (Public)
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const blog = await db.blogs.findOne({ id });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error: any) {
    console.error('Failed to get blog post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT update blog (Admin only)
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
    const existing = await db.blogs.findOne({ id });

    if (!existing) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const result = blogSchema.partial().safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const updates = result.data;
    const updated = await db.blogs.update(id, {
      title: updates.title,
      summary: updates.summary,
      content: updates.content,
      image: updates.image,
      category: updates.category,
      status: updates.status
    });

    return NextResponse.json({
      message: 'Blog post updated successfully',
      blog: updated
    }, { status: 200 });

  } catch (error: any) {
    console.error('Failed to update blog post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE blog (Admin only)
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
    const deleted = await db.blogs.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Blog post deleted successfully'
    }, { status: 200 });

  } catch (error: any) {
    console.error('Failed to delete blog post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
