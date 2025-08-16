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
})

// 연결 상태 확인 함수
export const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connection check successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection check failed:', error);
    return false;
  }
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 