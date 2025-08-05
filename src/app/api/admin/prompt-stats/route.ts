import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

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

    // 관리자 권한 확인
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { role: true }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    // 프롬프트 상태별 통계
    const [pending, approved, rejected, total] = await Promise.all([
      prisma.prompt.count({
        where: { status: 'PENDING' }
      }),
      prisma.prompt.count({
        where: { status: 'ACTIVE' }
      }),
      prisma.prompt.count({
        where: { status: 'REJECTED' }
      }),
      prisma.prompt.count()
    ]);

    return NextResponse.json({
      pending,
      approved,
      rejected,
      total
    });

  } catch (error) {
    console.error('Prompt stats error:', error);
    return NextResponse.json(
      { error: '통계 데이터를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 