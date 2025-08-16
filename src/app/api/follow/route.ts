import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';

// 팔로우하기
export async function POST(request: NextRequest) {
  try {
    const token = extractTokenFromHeader(request.headers.get('authorization') || undefined);
    if (!token) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
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

    const { followingId } = await request.json();

    if (!followingId) {
      return NextResponse.json(
        { error: '팔로우할 사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 자기 자신을 팔로우할 수 없음
    if (payload.userId === followingId) {
      return NextResponse.json(
        { error: '자기 자신을 팔로우할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    const tempFollow = {
      id: 'temp-follow-id',
      followerId: payload.userId,
      followingId: followingId,
      createdAt: new Date().toISOString(),
      following: {
        id: followingId,
        name: '사용자',
        username: 'user',
        avatar: null
      }
    };

    return NextResponse.json({
      message: '팔로우가 완료되었습니다.',
      follow: tempFollow,
    });
  } catch (error) {
    console.error('Follow creation error:', error);
    return NextResponse.json(
      { error: '팔로우에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 팔로우 취소
export async function DELETE(request: NextRequest) {
  try {
    const token = extractTokenFromHeader(request.headers.get('authorization') || undefined);
    if (!token) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
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

    const { searchParams } = new URL(request.url);
    const followingId = searchParams.get('followingId');

    if (!followingId) {
      return NextResponse.json(
        { error: '팔로우 취소할 사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 임시 응답 (실제 데이터베이스 연동 전까지)
    return NextResponse.json({
      message: '팔로우가 취소되었습니다.',
    });
  } catch (error) {
    console.error('Follow deletion error:', error);
    return NextResponse.json(
      { error: '팔로우 취소에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 팔로우 상태 확인
export async function GET(request: NextRequest) {
  try {
    const token = extractTokenFromHeader(request.headers.get('authorization') || undefined);
    if (!token) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
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

    const { searchParams } = new URL(request.url);
    const followingId = searchParams.get('followingId');
    const type = searchParams.get('type'); // 'following', 'followers', 'status'

    if (!followingId && type !== 'following' && type !== 'followers') {
      return NextResponse.json(
        { error: '사용자 ID 또는 타입이 필요합니다.' },
        { status: 400 }
      );
    }

    // 임시 데이터 (실제 데이터베이스 연동 전까지)
    if (type === 'status' && followingId) {
      return NextResponse.json({
        isFollowing: false,
      });
    } else if (type === 'following') {
      return NextResponse.json({
        following: [],
      });
    } else if (type === 'followers') {
      return NextResponse.json({
        followers: [],
      });
    }

    return NextResponse.json(
      { error: '잘못된 요청입니다.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Follow status check error:', error);
    return NextResponse.json(
      { error: '팔로우 상태 확인에 실패했습니다.' },
      { status: 500 }
    );
  }
}
