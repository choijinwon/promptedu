# 환경 변수 설정 가이드

## Supabase 설정

### 1. Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성합니다.
2. 프로젝트 설정에서 API 키를 확인합니다.

### 2. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. 데이터베이스 스키마 설정
Supabase SQL 편집기에서 다음 SQL을 실행합니다:

```sql
-- 공유 프롬프트 테이블
CREATE TABLE shared_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT '일반',
  template TEXT NOT NULL,
  variables TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  user_id TEXT NOT NULL,
  author_name TEXT DEFAULT '익명 사용자',
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 프로필 테이블
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 정책 설정
ALTER TABLE shared_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 공개 프롬프트 조회 정책
CREATE POLICY "공개 프롬프트 조회" ON shared_prompts
  FOR SELECT USING (is_public = true);

-- 사용자별 프롬프트 관리 정책
CREATE POLICY "사용자 프롬프트 관리" ON shared_prompts
  FOR ALL USING (auth.uid()::text = user_id);

-- 프로필 관리 정책
CREATE POLICY "프로필 관리" ON profiles
  FOR ALL USING (auth.uid()::text = user_id);
```

### 4. 개발 서버 재시작
환경 변수를 설정한 후 개발 서버를 재시작합니다:

```bash
pnpm dev
```

## 현재 상태 확인

환경 변수가 설정되지 않은 경우:
- 프롬프트는 로컬 스토리지에만 저장됩니다
- API 호출 시 503 오류가 발생합니다
- 브라우저 콘솔에 경고 메시지가 표시됩니다

환경 변수가 올바르게 설정된 경우:
- 프롬프트가 Supabase 데이터베이스에 저장됩니다
- 다른 사용자와 프롬프트를 공유할 수 있습니다
- 실시간 데이터 동기화가 가능합니다 