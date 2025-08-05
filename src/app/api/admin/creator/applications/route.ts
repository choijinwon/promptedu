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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'PENDING';

    // 신청서 목록 조회
    const applications = await prisma.creatorApplication.findMany({
      where: {
        status: status as any,
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    // 데이터 변환
    const transformedApplications = applications.map((app: any) => ({
      id: app.id,
      userId: app.userId,
      motivation: app.motivation,
      experience: app.experience,
      portfolio: app.portfolio,
      status: app.status,
      createdAt: app.createdAt,
      reviewedAt: app.reviewedAt,
      reviewedBy: app.reviewedBy,
      feedback: app.reviewNote,
      user: app.user
    }));

    return NextResponse.json({
      applications: transformedApplications
    });

  } catch (error) {
    console.error('Get creator applications error:', error);
    return NextResponse.json(
      { error: '신청서 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
} 