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

    // 사용자의 최신 신청서 조회
    const application = await prisma.creatorApplication.findFirst({
      where: { userId: payload.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            email: true
          }
        }
      }
    });

    if (!application) {
      return NextResponse.json({
        application: null
      });
    }

    return NextResponse.json({
      application: {
        id: application.id,
        motivation: application.motivation,
        experience: application.experience,
        portfolio: application.portfolio,
        status: application.status,
        createdAt: application.createdAt,
        reviewedAt: application.reviewedAt,
        reviewedBy: application.reviewedBy,
        feedback: application.reviewNote,
        user: application.user
      }
    });

  } catch (error) {
    console.error('Get application error:', error);
    return NextResponse.json(
      { error: '신청서 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// PUT /api/creator/applications - 승인/거부 처리 (관리자)
export async function PUT(request: NextRequest) {
  try {
    const token = extractTokenFromHeader(request.headers.get('authorization') || undefined);
    if (!token) return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: '유효하지 않은 토큰입니다.' }, { status: 401 });
    const admin = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!admin || admin.role !== 'ADMIN') return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });

    const { applicationId, action, reviewNote } = await request.json();
    if (!applicationId || !['APPROVED', 'REJECTED'].includes(action)) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }
    // 신청 존재 확인
    const application = await prisma.creatorApplication.findUnique({ where: { id: applicationId } });
    if (!application) return NextResponse.json({ error: '신청 내역이 없습니다.' }, { status: 404 });
    if (application.status !== 'PENDING') {
      return NextResponse.json({ error: '이미 처리된 신청입니다.' }, { status: 400 });
    }
    // 상태 업데이트
    const updated = await prisma.creatorApplication.update({
      where: { id: applicationId },
      data: {
        status: action,
        reviewedBy: admin.id,
        reviewedAt: new Date(),
        reviewNote: reviewNote || null,
      },
      include: {
        user: true,
      },
    });
    // 승인 시 유저 role 변경
    if (action === 'APPROVED') {
      await prisma.user.update({ where: { id: updated.userId }, data: { role: 'CREATOR' } });
    }
    return NextResponse.json({ message: '처리 완료', application: updated });
  } catch (error) {
    console.error('Approve/reject creator application error:', error);
    return NextResponse.json({ error: '처리 실패' }, { status: 500 });
  }
} 