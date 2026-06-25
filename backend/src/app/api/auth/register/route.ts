import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { hashPassword, signJWT } from '../../../../lib/auth';
import { registerSchema } from '../../../../lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { username, email, password } = result.data;

    // Check if email already exists
    const existingEmail = await db.users.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 409 }
      );
    }

    // Check if username already exists
    const existingUsername = await db.users.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { error: 'User with this username already exists.' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user. By default, new users are customers.
    // In production, roles are protected.
    const newUser = await db.users.create({
      username,
      email,
      passwordHash,
      role: 'customer'
    });

    // Generate JWT
    const token = signJWT({
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    });

    return NextResponse.json({
      message: 'Registration successful!',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
