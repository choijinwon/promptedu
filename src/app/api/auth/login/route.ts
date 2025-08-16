import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateToken } from '@/lib/auth';
import { checkSupabaseConnection, getUserByEmail } from '@/lib/supabase-db';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT_SET',
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
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

    // Supabase 연결 시도
    console.log('🔍 Checking Supabase connection...');
    const isConnected = await checkSupabaseConnection();
    
    if (isConnected) {
      // Supabase 연결 성공 시 실제 데이터베이스에서 조회
      console.log('✅ Using Supabase database');
      
      const user = await getUserByEmail(email);
      if (user) {
        const isValidPassword = await comparePassword(password, user.password);
        if (isValidPassword) {
          const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
          });

          const { password: _, ...userWithoutPassword } = user;
          console.log('Login successful for user:', user.email);
          return NextResponse.json({
            message: '로그인이 완료되었습니다.',
            user: userWithoutPassword,
            token,
          });
        }
      }
    } else {
      console.warn('⚠️ Supabase connection failed, using temporary login');
    }

    // Supabase 연결 실패 또는 사용자 없음 시 임시 로그인
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

      console.log('Login successful for user (temporary):', user.email);
      return NextResponse.json({
        message: '로그인이 완료되었습니다. (임시 로그인)',
        user,
        token,
      });
    }

    // 관리자 임시 로그인
    if (email === 'admin@example.com' && password === 'password123') {
      const user = {
        id: 'temp-admin-id',
        email: 'admin@example.com',
        username: 'admin',
        name: '관리자',
        role: 'ADMIN',
        isVerified: true,
      };

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      console.log('Login successful for admin (temporary):', user.email);
      return NextResponse.json({
        message: '로그인이 완료되었습니다. (임시 로그인)',
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