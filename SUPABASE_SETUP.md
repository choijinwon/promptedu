# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com)에 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인
4. 새 프로젝트 생성:
   - **Name**: prompt-hub
   - **Database Password**: 안전한 비밀번호 설정
   - **Region**: 가까운 지역 선택

## 2. 데이터베이스 연결 정보 확인

프로젝트 생성 후:
1. **Settings** → **Database** 메뉴로 이동
2. **Connection string** 섹션에서 정보 확인
3. **Connection pooling** 섹션에서 연결 문자열 복사

## 3. 환경 변수 설정

`.env` 파일을 다음과 같이 수정:

```env
# Supabase Database URL (PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
```

## 4. 데이터베이스 마이그레이션

```bash
# Prisma 클라이언트 재생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma db push

# 시드 데이터 실행
npx prisma db seed
```

## 5. Supabase 대시보드에서 확인

1. **Table Editor**에서 테이블들이 생성되었는지 확인
2. **Authentication** → **Users**에서 사용자 확인
3. **SQL Editor**에서 데이터 확인

## 6. 배포 시 환경 변수 설정

### Netlify 배포 시:
1. Netlify 대시보드 → **Site settings** → **Environment variables**
2. 위의 환경 변수들을 추가

### Vercel 배포 시:
1. Vercel 대시보드 → **Project settings** → **Environment variables**
2. 위의 환경 변수들을 추가

## 7. 보안 설정

### Row Level Security (RLS) 설정:

```sql
-- 사용자 테이블에 RLS 활성화
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- 프롬프트 테이블에 RLS 활성화
ALTER TABLE "Prompt" ENABLE ROW LEVEL SECURITY;

-- 카테고리 테이블에 RLS 활성화
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
```

## 8. API 키 관리

- **anon key**: 클라이언트에서 사용
- **service_role key**: 서버에서 사용 (관리자 기능)
- **service_role key는 절대 클라이언트에 노출하지 마세요!**

## 9. 연결 테스트

```bash
# 데이터베이스 연결 테스트
npx prisma db pull

# API 테스트
curl http://localhost:3001/api/test-db
```

## 10. 문제 해결

### 일반적인 문제들:

1. **연결 실패**: DATABASE_URL 확인
2. **인증 실패**: JWT_SECRET 확인
3. **RLS 오류**: 테이블 권한 설정 확인
4. **마이그레이션 실패**: 스키마 충돌 확인

### 로그 확인:
```bash
# Prisma 로그 활성화
DEBUG="prisma:*" npm run dev
``` 