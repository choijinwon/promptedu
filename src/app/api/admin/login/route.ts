import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateToken } from '@/lib/auth';
import { getUserByEmail, getUserByUsername } from '@/lib/supabase-db';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    console.log('Admin login attempt:', { username, password: password ? '[HIDDEN]' : 'MISSING' });

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { error: '아이디와 비밀번호는 필수입니다.' },
        { status: 400 }
      );
    }

    // 데이터베이스에서 관리자 조회 (username으로)
    const user = await getUserByUsername(username);
    
    if (!user) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // 관리자 권한 확인
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 없습니다.' },
        { status: 403 }
      );
    }

    // 비밀번호 확인
    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    const admin = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      role: user.role,
      isVerified: user.isVerified,
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

  } catch (error) {
    console.error('Admin login error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error
    });
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
