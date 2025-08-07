import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    console.log('Admin login attempt:', { username, password: password ? '[HIDDEN]' : 'undefined' });

    // Validation
    if (!username || !password) {
      console.log('Validation failed:', { username: !!username, password: !!password });
      return NextResponse.json(
        { error: '아이디와 비밀번호는 필수입니다.' },
        { status: 400 }
      );
    }

    // Find user by username
    console.log('Looking for user with username:', username);
    const user = await prisma.user.findUnique({
      where: { username },
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

    console.log('User found:', user ? { id: user.id, username: user.username, role: user.role } : 'Not found');

    if (!user) {
      return NextResponse.json(
        { error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // Check if user is admin
    console.log('Checking admin role:', user.role);
    if (user.role !== 'ADMIN') {
      console.log('User is not admin:', user.role);
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    // Verify password
    console.log('Verifying password...');
    const isValidPassword = await comparePassword(password, user.password);
    console.log('Password verification result:', isValidPassword);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: '관리자 로그인이 완료되었습니다.',
      user: userWithoutPassword,
      token,
    });

  } catch (error) {
    console.error('Admin login error:', error);
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
