import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateToken } from '@/lib/auth';
import { checkSupabaseConnection, getUserByEmail } from '@/lib/supabase-db';
import { supabase as supabaseAuth } from '@/lib/supabase';

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

    // 프로덕션 환경에서는 Supabase Auth 사용
    if (process.env.NODE_ENV === 'production') {
      console.log('🚀 Production mode: Using Supabase Auth for login');
      
      try {
        // Supabase Auth로 로그인
        const { data, error } = await supabaseAuth.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          console.error('❌ Supabase Auth login error:', error);
          return NextResponse.json(
            { error: error.message || '이메일 또는 비밀번호가 올바르지 않습니다.' },
            { status: 401 }
          );
        }

        if (!data.user) {
          return NextResponse.json(
            { error: '로그인에 실패했습니다.' },
            { status: 401 }
          );
        }

        // 우리 데이터베이스에서 사용자 정보 조회
        const { data: user, error: userError } = await supabaseAuth
          .from('users')
          .select('id, email, username, name, role, is_verified')
          .eq('id', data.user.id)
          .single();

        if (userError || !user) {
          console.error('❌ User not found in database:', userError);
          return NextResponse.json(
            { error: '사용자 정보를 찾을 수 없습니다.' },
            { status: 404 }
          );
        }

        // 이메일 인증 확인
        if (!user.is_verified) {
          return NextResponse.json(
            { error: '이메일 인증이 필요합니다. 이메일을 확인해주세요.' },
            { status: 401 }
          );
        }

        // JWT 토큰 생성
        const token = generateToken({
          userId: user.id,
          email: user.email,
          role: user.role,
        });

        console.log('✅ Login successful via Supabase Auth:', user.email);

        return NextResponse.json({
          message: '로그인이 완료되었습니다.',
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            role: user.role,
            isVerified: user.is_verified,
          },
          token,
          authData: {
            user: data.user.id,
            session: data.session ? 'active' : 'none'
          }
        });

      } catch (authError) {
        console.error('❌ Supabase Auth error:', authError);
        return NextResponse.json(
          { error: '인증 서비스 오류가 발생했습니다.' },
          { status: 500 }
        );
      }
    }

    // 개발 환경에서는 기존 방식 사용
    console.log('🔧 Development mode: Using custom login');
    
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

    // Supabase에서 사용자 조회
    console.log('Looking for user with email:', email);
    const user = await getUserByEmail(email);

    if (!user) {
      console.log('User not found for email:', email);
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }
    
    console.log('User found:', { id: user.id, email: user.email, role: user.role });

    // 비밀번호 검증
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

    // 토큰 생성
    console.log('Generating token...');
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // 비밀번호 제거
    const { password: _, ...userWithoutPassword } = user;

    console.log('Login successful for user:', user.email);
    console.log('Returning response with token:', token ? 'TOKEN_EXISTS' : 'NO_TOKEN');
    return NextResponse.json({
      message: '로그인이 완료되었습니다.',
      user: userWithoutPassword,
      token,
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 