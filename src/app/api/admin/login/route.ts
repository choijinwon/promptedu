import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('Admin login attempt:', { email, password: password ? '[HIDDEN]' : 'MISSING' });

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호는 필수입니다.' },
        { status: 400 }
      );
    }

    // 임시 관리자 로그인
    if (email === 'admin@example.com' && password === 'password123') {
      const admin = {
        id: 'temp-admin-id',
        email: 'admin@example.com',
        username: 'admin',
        name: '관리자',
        role: 'ADMIN',
        isVerified: true,
      };

      const token = generateToken({
        userId: admin.id,
        email: admin.email,
        role: admin.role,
      });

      console.log('Admin login successful:', admin.email);
      return NextResponse.json({
        message: '관리자 로그인이 완료되었습니다.',
        user: admin,
        token,
      });
    }

    return NextResponse.json(
      { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 }
    );

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
