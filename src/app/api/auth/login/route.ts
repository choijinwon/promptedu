import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // 데이터베이스 연결 확인 (선택적)
    let dbConnected = false;
    try {
      await prisma.$connect();
      console.log('✅ Database connection successful');
      dbConnected = true;
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      // 연결 실패해도 계속 진행 (기존 연결 사용)
      console.log('⚠️ Continuing with existing connection...');
    }

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
    console.log('Returning response with token:', token ? 'TOKEN_EXISTS' : 'NO_TOKEN');
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
    
    // 더 구체적인 오류 메시지 제공
    let errorMessage = '서버 오류가 발생했습니다.';
    if (error instanceof Error) {
      if (error.message.includes('prisma') || error.message.includes('database') || error.message.includes('connect')) {
        errorMessage = '데이터베이스 연결 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.message.includes('bcrypt')) {
        errorMessage = '비밀번호 처리 중 오류가 발생했습니다.';
      } else if (error.message.includes('jwt')) {
        errorMessage = '토큰 생성 중 오류가 발생했습니다.';
      } else if (error.message.includes('timeout')) {
        errorMessage = '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 