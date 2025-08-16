import { NextRequest, NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/prisma';
import { checkSupabaseConnection } from '@/lib/supabase-db';

export async function GET(request: NextRequest) {
  console.log('🧪 Testing database connections...');
  
  const results = {
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    environmentVariables: {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasNetlifyDatabaseUrl: !!process.env.NETLIFY_DATABASE_URL,
      hasSupabaseDatabaseUrl: !!process.env.SUPABASE_DATABASE_URL,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    connections: {
      prisma: null as boolean | null,
      supabase: null as boolean | null
    },
    errors: []
  };

  // Prisma 연결 테스트
  try {
    console.log('🔍 Testing Prisma connection...');
    const prismaConnected = await checkDatabaseConnection();
    results.connections.prisma = prismaConnected;
    console.log('✅ Prisma test completed:', prismaConnected);
  } catch (error) {
    console.error('❌ Prisma test failed:', error);
    results.connections.prisma = false;
    results.errors.push({
      type: 'prisma',
      error: error instanceof Error ? error.message : String(error)
    });
  }

  // Supabase 연결 테스트
  try {
    console.log('🔍 Testing Supabase connection...');
    const supabaseConnected = await checkSupabaseConnection();
    results.connections.supabase = supabaseConnected;
    console.log('✅ Supabase test completed:', supabaseConnected);
  } catch (error) {
    console.error('❌ Supabase test failed:', error);
    results.connections.supabase = false;
    results.errors.push({
      type: 'supabase',
      error: error instanceof Error ? error.message : String(error)
    });
  }

  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  
  console.log('🧪 POST test with body:', body);
  
  return NextResponse.json({
    message: 'POST test successful',
    receivedBody: body,
    timestamp: new Date().toISOString()
  });
} 