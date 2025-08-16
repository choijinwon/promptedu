import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-db';

export async function GET(request: NextRequest) {
  console.log('🔍 Debug API called');
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    environmentVariables: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT_SET',
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT_SET',
    },
    supabaseTest: null as any,
    errors: [] as string[]
  };

  // Supabase 연결 테스트
  try {
    console.log('🔍 Testing Supabase connection in debug API...');
    
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (error) {
      debugInfo.errors.push(`Supabase error: ${error.message} (${error.code})`);
      debugInfo.supabaseTest = { error: error.message, code: error.code };
    } else {
      debugInfo.supabaseTest = { success: true, data };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    debugInfo.errors.push(`Supabase exception: ${errorMessage}`);
    debugInfo.supabaseTest = { exception: errorMessage };
  }

  return NextResponse.json(debugInfo);
}
