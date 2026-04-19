import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comparePassword, createToken, setSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    console.log('Login attempt for:', email);
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      console.log('User not found:', email);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create token
    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Set cookie
    await setSession(token);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
