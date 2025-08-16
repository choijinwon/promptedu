import { NextRequest, NextResponse } from 'next/server';
import { prisma, checkDatabaseConnection } from '@/lib/prisma';
import { checkSupabaseConnection, getUserByEmail } from '@/lib/supabase-db';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // 데이터베이스 연결 확인
    console.log('🔍 Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
      NETLIFY_DATABASE_URL: process.env.NETLIFY_DATABASE_URL ? 'SET' : 'NOT_SET',
      NETLIFY_DATABASE_URL_UNPOOLED: process.env.NETLIFY_DATABASE_URL_UNPOOLED ? 'SET' : 'NOT_SET',
      SUPABASE_DATABASE_URL: process.env.SUPABASE_DATABASE_URL ? 'SET' : 'NOT_SET',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT_SET',
    });

    // 데이터베이스 연결 상태 확인 (Prisma와 Supabase 모두 시도)
    console.log('🔍 Checking database connections...');
    
    let isConnected = false;
    let connectionMethod = 'none';
    let connectionError = null;
    
    // 먼저 Prisma 연결 시도
    try {
      isConnected = await checkDatabaseConnection();
      if (isConnected) {
        connectionMethod = 'prisma';
        console.log('✅ Using Prisma connection');
      }
    } catch (error) {
      console.log('❌ Prisma connection failed:', error);
      connectionError = error;
    }
    
    // Prisma가 실패하면 Supabase 연결 시도
    if (!isConnected) {
      try {
        isConnected = await checkSupabaseConnection();
        if (isConnected) {
          connectionMethod = 'supabase';
          console.log('✅ Using Supabase connection');
        }
      } catch (error) {
        console.log('❌ Supabase connection also failed:', error);
        connectionError = error;
      }
    }
    
    // 연결 실패 시에도 계속 진행 (임시 해결책)
    if (!isConnected) {
      console.warn('⚠️ Database connection failed, but continuing with mock response for testing');
      console.error('❌ Connection error details:', connectionError);
      
      // 임시로 테스트 응답 반환
      return NextResponse.json(
        { 
          error: '데이터베이스 연결에 실패했습니다. 잠시 후 다시 시도해주세요.',
          details: 'Prisma와 Supabase 연결 모두 실패했습니다.',
          environment: process.env.NODE_ENV,
          hasDatabaseUrl: !!process.env.DATABASE_URL,
          hasNetlifyDatabaseUrl: !!process.env.NETLIFY_DATABASE_URL,
          hasSupabaseDatabaseUrl: !!process.env.SUPABASE_DATABASE_URL,
          hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
          connectionError: connectionError ? String(connectionError) : 'Unknown error'
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

    // Find user based on connection method
    console.log('Looking for user with email:', email);
    let user = null;
    
    if (connectionMethod === 'prisma') {
      user = await prisma.user.findUnique({
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
    } else if (connectionMethod === 'supabase') {
      user = await getUserByEmail(email);
    }

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
    console.error('❌ Login error:', error);
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('❌ Error name:', error instanceof Error ? error.name : 'Unknown error type');
    console.error('❌ Error message:', error instanceof Error ? error.message : String(error));
    console.error('❌ Error constructor:', error?.constructor?.name || 'Unknown constructor');
    
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