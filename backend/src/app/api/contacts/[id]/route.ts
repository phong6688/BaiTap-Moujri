import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { getUserFromRequest } from '../../../../lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT update contact status (Admin only)
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
    const existing = await db.contacts.findOne({ id });

    if (!existing) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    const { status } = await req.json();
    if (!status || !['read', 'unread'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const updated = await db.contacts.update(id, { status });

    return NextResponse.json({
      message: `Message status updated to ${status}`,
      contact: updated
    }, { status: 200 });

  } catch (error: any) {
    console.error('Failed to update contact status:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE contact submission (Admin only)
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
    const deleted = await db.contacts.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Message deleted successfully'
    }, { status: 200 });

  } catch (error: any) {
    console.error('Failed to delete message:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
