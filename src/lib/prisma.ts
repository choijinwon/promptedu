import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 데이터베이스 URL 확인 및 로깅
const databaseUrl = process.env.DATABASE_URL || 
                   process.env.NETLIFY_DATABASE_URL || 
                   process.env.NETLIFY_DATABASE_URL_UNPOOLED ||
                   process.env.SUPABASE_DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not set');
  console.error('Available environment variables:', {
    DATABASE_URL: !!process.env.DATABASE_URL,
    NETLIFY_DATABASE_URL: !!process.env.NETLIFY_DATABASE_URL,
    NETLIFY_DATABASE_URL_UNPOOLED: !!process.env.NETLIFY_DATABASE_URL_UNPOOLED,
    SUPABASE_DATABASE_URL: !!process.env.SUPABASE_DATABASE_URL,
  });
} else {
  console.log('✅ Database URL is configured');
  console.log('🔍 Using database:', databaseUrl.includes('supabase') ? 'Supabase' : 'Other');
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
  // Netlify 환경을 위한 추가 설정
  errorFormat: 'pretty',
})

// 연결 상태 확인 함수
export const checkDatabaseConnection = async () => {
  try {
    console.log('🔍 Attempting database connection...');
    console.log('🔍 Database URL type:', databaseUrl ? 'SET' : 'NOT_SET');
    console.log('🔍 Environment:', process.env.NODE_ENV);
    
    await prisma.$connect();
    console.log('✅ Database connection check successful');
    
    // 간단한 쿼리로 연결 확인
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Test query successful:', result);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection check failed:', error);
    console.error('❌ Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return false;
  }
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 