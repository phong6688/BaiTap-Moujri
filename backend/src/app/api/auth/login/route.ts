import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { comparePassword, signJWT } from '../../../../lib/auth';
import { loginSchema } from '../../../../lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { usernameOrEmail, password } = result.data;

    // Try finding the user by email first, then by username
    let user = await db.users.findOne({ email: usernameOrEmail });
    if (!user) {
      user = await db.users.findOne({ username: usernameOrEmail });
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = signJWT({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    });

    return NextResponse.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
