import { NextResponse } from 'next/server';
import { checkSupabaseConnection } from '@/lib/supabase-db';

export async function GET() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // 환경변수 확인
    const envCheck = {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_DATABASE_URL: !!process.env.SUPABASE_DATABASE_URL,
    };
    
    console.log('🔍 Environment variables:', envCheck);
    
    // Supabase 연결 테스트
    const isConnected = await checkSupabaseConnection();
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection test completed',
      environment: process.env.NODE_ENV,
      envCheck,
      isConnected,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Supabase test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Supabase connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
