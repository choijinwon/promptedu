import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // TODO: 실제 인증 로직 구현
    // 현재는 간단한 검증만 수행
    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 임시 사용자 데이터 (실제로는 데이터베이스에서 조회)
    const mockUser = {
      id: 1,
      name: '테스트 사용자',
      email: email,
      role: 'student',
    };

    // TODO: 실제 비밀번호 검증 로직 구현
    if (password.length < 6) {
      return NextResponse.json(
        { error: '비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      user: mockUser,
      message: '로그인에 성공했습니다.',
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 