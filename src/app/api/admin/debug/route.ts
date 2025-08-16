import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 임시 데이터 (실제 데이터베이스 연동 전까지)
    const mockData = {
      databaseConnection: "연결 성공",
      adminAccounts: [
        {
          id: 'c950dc88-2f43-4c12-a957-1eebe05660a7',
          username: 'admin',
          email: 'admin@example.com',
          name: '관리자',
          role: 'ADMIN',
          isVerified: true
        }
      ],
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(mockData);

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
