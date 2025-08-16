import { NextRequest, NextResponse } from 'next/server';

// 동적으로 Prisma 클라이언트 import
const getPrisma = async () => {
  const { prisma } = await import('@/lib/prisma');
  return prisma;
};

export async function GET(request: NextRequest) {
  console.log('🔍 Debug API called');
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    environmentVariables: {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasDirectUrl: !!process.env.DIRECT_URL,
      hasJwtSecret: !!process.env.JWT_SECRET,
      databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
      directUrl: process.env.DIRECT_URL ? 'SET' : 'NOT_SET',
    },
    prismaTest: null as any,
    errors: [] as string[]
  };

  // Prisma 연결 테스트
  try {
    console.log('🔍 Testing Prisma connection in debug API...');
    
    const prisma = await getPrisma();
    const users = await prisma.user.findMany({
      select: { id: true },
      take: 1
    });
    
    debugInfo.prismaTest = { success: true, userCount: users.length };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    debugInfo.errors.push(`Prisma error: ${errorMessage}`);
    debugInfo.prismaTest = { error: errorMessage };
  }

  return NextResponse.json(debugInfo);
}
