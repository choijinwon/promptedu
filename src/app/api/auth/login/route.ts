import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateToken } from '@/lib/auth';
import { checkSupabaseConnection } from '@/lib/supabase-db';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT_SET',
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
    });

    // Supabase 연결 확인
    console.log('🔍 Checking Supabase connection...');
    const isConnected = await checkSupabaseConnection();
    
    if (!isConnected) {
      console.warn('⚠️ Supabase connection failed');
      return NextResponse.json(
        { 
          error: '데이터베이스 연결에 실패했습니다. 잠시 후 다시 시도해주세요.',
          details: 'Supabase 연결에 문제가 있습니다. 관리자에게 문의해주세요.',
          environment: process.env.NODE_ENV,
        },
        { status: 503 }
      );
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

    // 임시 로그인 로직 (Supabase 연결 확인 후)
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