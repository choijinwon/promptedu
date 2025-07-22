# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com)에 접속
2. 새 프로젝트 생성
3. 프로젝트 URL과 anon key 복사

## 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# 개발 환경 설정
NODE_ENV=development
```

**중요**: `SUPABASE_SERVICE_ROLE_KEY`는 Supabase 대시보드의 Settings > API에서 확인할 수 있습니다.

## 3. 데이터베이스 스키마 설정

Supabase SQL Editor에서 다음 쿼리 실행:

```sql
-- shared_prompts 테이블 생성
CREATE TABLE shared_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT '일반',
  template TEXT NOT NULL,
  variables TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  is_favorite BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT,
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- profiles 테이블 생성
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE shared_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- shared_prompts 정책 설정
CREATE POLICY "공개 프롬프트는 모든 사용자가 조회 가능" ON shared_prompts
  FOR SELECT USING (is_public = true);

CREATE POLICY "사용자는 자신의 프롬프트를 생성/수정/삭제 가능" ON shared_prompts
  FOR ALL USING (auth.uid() = user_id);

-- profiles 정책 설정
CREATE POLICY "사용자는 자신의 프로필을 조회/수정 가능" ON profiles
  FOR ALL USING (auth.uid() = user_id);

-- 조회수 증가 함수 생성
CREATE OR REPLACE FUNCTION increment_views(prompt_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE shared_prompts 
  SET views = views + 1 
  WHERE id = prompt_id;
END;
$$ LANGUAGE plpgsql;

-- 좋아요 증가 함수 생성
CREATE OR REPLACE FUNCTION increment_likes(prompt_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE shared_prompts 
  SET likes = likes + 1 
  WHERE id = prompt_id;
END;
$$ LANGUAGE plpgsql;
```

## 4. Google OAuth 설정

### Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "APIs & Services" > "Credentials" 메뉴로 이동
4. "Create Credentials" > "OAuth 2.0 Client IDs" 클릭
5. 애플리케이션 유형: "Web application" 선택
6. 승인된 리디렉션 URI 추가:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   ```

### Supabase 설정
1. Supabase 대시보드에서 "Authentication" > "Providers" 메뉴로 이동
2. Google 제공자 활성화
3. Google Cloud Console에서 받은 Client ID와 Client Secret 입력

## 5. GitHub OAuth 설정

### GitHub OAuth App 생성
1. [GitHub Developer Settings](https://github.com/settings/developers) 접속
2. "OAuth Apps" > "New OAuth App" 클릭
3. 애플리케이션 정보 입력:
   - Application name: PromptEDU
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: `https://your-project-id.supabase.co/auth/v1/callback`

### Supabase 설정
1. Supabase 대시보드에서 "Authentication" > "Providers" 메뉴로 이동
2. GitHub 제공자 활성화
3. GitHub OAuth App에서 받은 Client ID와 Client Secret 입력

## 6. API 엔드포인트

프로젝트에는 다음 API 엔드포인트가 구현되어 있습니다:

### 프롬프트 관련 API
- `GET /api/prompts` - 프롬프트 목록 조회
- `POST /api/prompts` - 새 프롬프트 생성
- `GET /api/prompts/[id]` - 특정 프롬프트 조회
- `PUT /api/prompts/[id]` - 프롬프트 수정
- `DELETE /api/prompts/[id]` - 프롬프트 삭제
- `POST /api/prompts/[id]/like` - 좋아요 토글

### 프로필 관련 API
- `GET /api/profile` - 사용자 프로필 조회
- `POST /api/profile` - 프로필 생성 또는 업데이트

## 7. 서버 재시작

환경 변수를 설정한 후 개발 서버를 재시작:

```bash
pnpm dev
```

## 8. 테스트

1. 브라우저에서 http://localhost:3000 접속
2. "로그인" 버튼 클릭
3. "Google로 로그인" 또는 "GitHub로 로그인" 버튼 클릭
4. OAuth 인증 플로우 확인
5. 프롬프트 생성 및 공유 기능 테스트

## 문제 해결

### 일반적인 오류들:

1. **"supabaseUrl is required"**
   - 환경 변수가 올바르게 설정되었는지 확인
   - `.env.local` 파일이 프로젝트 루트에 있는지 확인

2. **"OAuth provider not configured"**
   - Supabase 대시보드에서 OAuth 제공자가 활성화되었는지 확인
   - Client ID와 Secret이 올바르게 입력되었는지 확인

3. **"Redirect URI mismatch"**
   - Google/GitHub OAuth 설정의 리디렉션 URI가 Supabase 콜백 URL과 일치하는지 확인

4. **"Invalid client"**
   - OAuth App의 Client ID가 올바른지 확인
   - 도메인이 승인된 리디렉션 URI에 포함되어 있는지 확인

5. **API 오류**
   - `SUPABASE_SERVICE_ROLE_KEY`가 올바르게 설정되었는지 확인
   - 데이터베이스 스키마가 올바르게 생성되었는지 확인 