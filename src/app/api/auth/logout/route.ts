import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 클라이언트에서 JWT를 삭제하도록 응답
    return NextResponse.json({
      message: '로그아웃되었습니다.',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: '로그아웃 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 