import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { getUserFromRequest } from '../../../lib/auth';
import { contactSchema } from '../../../lib/validation';

// GET all contact submissions (Admin only)
export async function GET(req: NextRequest) {
  try {
    const userPayload = getUserFromRequest(req);
    if (!userPayload || userPayload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const contacts = await db.contacts.findMany();
    return NextResponse.json(contacts, { status: 200 });
  } catch (error: any) {
    console.error('Failed to get contact submissions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST create contact inquiry (Public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    const newContact = await db.contacts.create({
      name,
      email,
      subject,
      message
    });

    // Student feature callout: Here they could configure nodemailer to send a receipt
    // or notify administrators of new tickets.
    console.log(`[Contact Submit] Inbound message created: ${newContact.id}`);

    return NextResponse.json({
      message: 'Inquiry submitted successfully!',
      contact: newContact
    }, { status: 201 });

  } catch (error: any) {
    console.error('Failed to create inquiry:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
