import { NextRequest, NextResponse } from 'next/server';
import { checkSupabaseConnection } from '@/lib/supabase-db';

export async function GET(request: NextRequest) {
  try {
    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      environmentVariables: {
        hasJwtSecret: !!process.env.JWT_SECRET,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT_SET',
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT_SET',
      },
      supabaseTest: null as any,
      errors: [] as string[]
    };

    // Supabase 연결 테스트
    try {
      console.log('🔍 Testing Supabase connection in debug API...');
      const isConnected = await checkSupabaseConnection();
      debugInfo.supabaseTest = { success: isConnected };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      debugInfo.errors.push(`Supabase error: ${errorMessage}`);
      debugInfo.supabaseTest = { 
        error: errorMessage,
        errorType: typeof error,
        errorStack: error instanceof Error ? error.stack : undefined
      };
    }

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
