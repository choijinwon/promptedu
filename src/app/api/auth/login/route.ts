import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('Login attempt:', { email, password: password ? '[HIDDEN]' : 'MISSING' });

    // Validation
    if (!email || !password) {
      console.log('Validation failed: missing email or password');
      return NextResponse.json(
        { error: '이메일과 비밀번호는 필수입니다.' },
        { status: 400 }
      );
    }

    // Find user
    console.log('Looking for user with email:', email);
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        password: true,
        role: true,
        isVerified: true,
      }
    });

    if (!user) {
      console.log('User not found for email:', email);
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }
    
    console.log('User found:', { id: user.id, email: user.email, role: user.role });

    // Verify password
    console.log('Verifying password...');
    const isValidPassword = await comparePassword(password, user.password);
    console.log('Password verification result:', isValidPassword);
    if (!isValidPassword) {
      console.log('Password verification failed');
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // Generate token
    console.log('Generating token...');
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    console.log('Login successful for user:', user.email);
    return NextResponse.json({
      message: '로그인이 완료되었습니다.',
      user: userWithoutPassword,
      token,
    });

  } catch (error) {
    console.error('Login error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 