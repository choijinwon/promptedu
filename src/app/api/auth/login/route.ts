import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
    });

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

    // 임시 로그인 로직 (Prisma 제거 후)
    if (email === 'a@test.com' && password === 'password123') {
      const user = {
        id: 'temp-user-id',
        email: 'a@test.com',
        username: 'testuser',
        name: '테스트 사용자',
        role: 'USER',
        isVerified: true,
      };

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      console.log('Login successful for user:', user.email);
      return NextResponse.json({
        message: '로그인이 완료되었습니다.',
        user,
        token,
      });
    }

    console.log('User not found for email:', email);
    return NextResponse.json(
      { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 }
    );

  } catch (error) {
    console.error('❌ Login error:', error);
    
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 