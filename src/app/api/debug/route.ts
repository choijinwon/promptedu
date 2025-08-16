import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      environmentVariables: {
        hasJwtSecret: !!process.env.JWT_SECRET,
      },
      errors: [],
    };

    console.log('🔍 Debug info:', debugInfo);

    return NextResponse.json(debugInfo);

  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { error: '디버그 정보를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
