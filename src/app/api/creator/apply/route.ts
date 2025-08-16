import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = extractTokenFromHeader(request.headers.get('authorization') || undefined);
    if (!token) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const { motivation, experience, portfolio } = await request.json();

    // 필수 필드 검증
    if (!motivation || !experience) {
      return NextResponse.json(
        { error: '신청 동기와 경험은 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    const tempApplication = {
      id: 'temp-application-id',
      motivation,
      experience,
      portfolio: portfolio || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      user: {
        name: '사용자',
        username: 'user',
        email: 'user@example.com'
      }
    };

    return NextResponse.json({
      message: '크리에이터 신청이 성공적으로 제출되었습니다.',
      application: tempApplication
    });

  } catch (error) {
    console.error('Creator application error:', error);
    return NextResponse.json(
      { error: '크리에이터 신청 처리에 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = extractTokenFromHeader(request.headers.get('authorization') || undefined);
    if (!token) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    return NextResponse.json({
      application: null
    });

  } catch (error) {
    console.error('Get application error:', error);
    return NextResponse.json(
      { error: '신청서 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
} 