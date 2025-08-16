import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 데이터베이스 연결 테스트
    let databaseConnection = "연결 실패";
    let adminAccounts: any[] = [];

    try {
      // 관리자 계정 조회
      const admins = await prisma.user.findMany({
        where: {
          role: 'ADMIN'
        },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          role: true,
          isVerified: true,
        }
      });

      adminAccounts = admins;
      databaseConnection = "연결 성공";
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      databaseConnection = "연결 실패";
    }

    return NextResponse.json({
      databaseConnection,
      adminAccounts,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { 
        error: '디버그 정보를 불러올 수 없습니다.',
        databaseConnection: "연결 실패",
        adminAccounts: [],
      },
      { status: 500 }
    );
  }
}
