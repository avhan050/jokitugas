import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createToken, setSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role,
        balance: 0,
        rating: 5.0,
        completedJobs: 0,
      },
    });

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
    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Check for Prisma unique constraint violation if findUnique missed it (race condition)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    
    return NextResponse.json({ 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error' 
    }, { status: 500 });
  }
}
