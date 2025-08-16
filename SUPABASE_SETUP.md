# Supabase + Netlify 설정 가이드

## 1. Supabase 프로젝트 설정

### 1.1 Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에 가입
2. 새 프로젝트 생성
3. 프로젝트 설정에서 다음 정보 확인:
   - Project URL
   - Anon Key (public)
   - Service Role Key (secret)

### 1.2 데이터베이스 스키마 설정
Supabase SQL Editor에서 다음 스키마를 실행:

```sql
-- 사용자 테이블
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  avatar TEXT,
  bio TEXT,
  role TEXT DEFAULT 'USER',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 카테고리 테이블
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 프롬프트 테이블
CREATE TABLE prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  price INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  author_id UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  tags TEXT,
  image TEXT,
  downloads INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  rating FLOAT DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'DRAFT',
  is_public BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  type TEXT DEFAULT 'MARKETPLACE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 기타 필요한 테이블들도 추가...
```

## 2. Netlify 환경변수 설정

### 2.1 Netlify 대시보드에서 설정
1. Netlify 대시보드 → Site settings → Environment variables
2. 다음 환경변수 추가:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

### 2.2 환경변수 설명
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 공개 API 키
- `SUPABASE_DATABASE_URL`: Prisma에서 사용할 데이터베이스 연결 URL

## 3. 로컬 개발 환경 설정

### 3.1 .env.local 파일 생성
프로젝트 루트에 `.env.local` 파일 생성:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# 기타 설정
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=your-jwt-secret
```

### 3.2 Prisma 설정
```bash
# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma migrate deploy
```

## 4. 테스트

### 4.1 API 테스트
배포 후 다음 URL로 테스트:

```
https://your-site.netlify.app/api/supabase-test
https://your-site.netlify.app/api/test
```

### 4.2 예상 응답
```json
{
  "success": true,
  "message": "Supabase connection test completed",
  "environment": "production",
  "envCheck": {
    "NEXT_PUBLIC_SUPABASE_URL": true,
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": true,
    "SUPABASE_DATABASE_URL": true
  },
  "isConnected": true,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 5. 문제 해결

### 5.1 연결 오류
- 환경변수가 올바르게 설정되었는지 확인
- Supabase 프로젝트가 활성 상태인지 확인
- 데이터베이스 URL 형식이 올바른지 확인

### 5.2 권한 오류
- RLS (Row Level Security) 설정 확인
- 테이블 권한 설정 확인

### 5.3 로그 확인
- Netlify 함수 로그 확인
- Supabase 대시보드에서 쿼리 로그 확인

## 6. 보안 고려사항

- Service Role Key는 서버 사이드에서만 사용
- Anon Key는 클라이언트에서 사용 가능
- RLS 정책을 적절히 설정하여 데이터 보호
- 환경변수는 절대 Git에 커밋하지 않음 