# Supabase Auth 설정 가이드

## 프로덕션 환경에서 Supabase Auth 사용하기

### 1. Supabase Dashboard 설정

#### 1.1 Authentication 설정
1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인
2. 프로젝트 선택
3. **Authentication** > **Settings** 메뉴로 이동

#### 1.2 이메일 템플릿 설정
1. **Email Templates** 탭으로 이동
2. **Confirm signup** 템플릿 수정:

```html
<h2>🎉 Prompt Hub에 오신 것을 환영합니다!</h2>
<p>안녕하세요, {{ .Email }}님!</p>
<p>Prompt Hub 회원가입을 완료하기 위해 이메일 인증을 진행해주세요.</p>
<p>아래 버튼을 클릭하여 이메일 인증을 완료하시면 모든 서비스를 이용하실 수 있습니다.</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{ .ConfirmationURL }}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
    이메일 인증하기
  </a>
</div>

<p style="margin-top: 30px; font-size: 14px; color: #666;">
  만약 버튼이 작동하지 않는다면, 아래 링크를 복사하여 브라우저에 붙여넣기 해주세요:<br>
  <a href="{{ .ConfirmationURL }}" style="color: #667eea;">{{ .ConfirmationURL }}</a>
</p>

<p style="margin-top: 20px; font-size: 14px; color: #666;">
  이 링크는 24시간 후에 만료됩니다.
</p>

<div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
  <p>이 이메일은 Prompt Hub 회원가입 과정에서 발송되었습니다.</p>
  <p>문의사항이 있으시면 support@prompthub.com으로 연락해주세요.</p>
</div>
```

#### 1.3 URL 설정
1. **URL Configuration** 섹션에서:
   - **Site URL**: `https://promptedu.io`
   - **Redirect URLs**: `https://promptedu.io/verify-email`

#### 1.4 이메일 제공자 설정
1. **Email Auth** 섹션에서:
   - **Enable email confirmations**: ✅ 활성화
   - **Enable email change confirmations**: ✅ 활성화
   - **Enable secure email change**: ✅ 활성화

### 2. 환경 변수 설정

프로덕션 환경에서 다음 환경 변수를 설정하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://pahwayjrezkkgixykqpe.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://promptedu.io"

# Environment
NODE_ENV="production"
```

### 3. 데이터베이스 스키마 확인

다음 테이블들이 올바르게 생성되어 있는지 확인하세요:

#### 3.1 users 테이블
```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255),
  name VARCHAR(100),
  role VARCHAR(20) DEFAULT 'USER',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3.2 RLS 정책 설정
```sql
-- RLS 비활성화 (개발용)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- 또는 RLS 정책 설정 (프로덕션용)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 정보만 읽을 수 있음
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- 사용자는 자신의 정보만 수정할 수 있음
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### 4. 테스트

#### 4.1 회원가입 테스트
1. 프로덕션 환경에서 회원가입
2. 이메일 확인
3. 로그인 테스트

#### 4.2 이메일 인증 테스트
1. 회원가입 후 이메일 수신 확인
2. 인증 링크 클릭
3. 자동 로그인 확인

### 5. 문제 해결

#### 5.1 이메일이 발송되지 않는 경우
- Supabase Dashboard에서 이메일 설정 확인
- 스팸 폴더 확인
- 이메일 제공자 설정 확인

#### 5.2 인증 링크가 작동하지 않는 경우
- Redirect URLs 설정 확인
- 이메일 템플릿의 링크 형식 확인
- 토큰 만료 시간 확인

#### 5.3 로그인 실패
- 사용자 데이터베이스 동기화 확인
- 이메일 인증 상태 확인
- 비밀번호 정책 확인

### 6. 보안 고려사항

#### 6.1 비밀번호 정책
- 최소 6자 이상
- 복잡성 요구사항 설정 가능

#### 6.2 세션 관리
- JWT 토큰 만료 시간 설정
- 리프레시 토큰 사용 고려

#### 6.3 이메일 보안
- 이메일 인증 필수
- 이메일 변경 시 재인증

### 7. 모니터링

#### 7.1 로그 확인
- Supabase Dashboard > Logs
- 애플리케이션 로그
- 이메일 발송 로그

#### 7.2 메트릭 확인
- 회원가입 성공률
- 이메일 인증 성공률
- 로그인 성공률

### 8. 백업 및 복구

#### 8.1 데이터 백업
- 정기적인 데이터베이스 백업
- 사용자 데이터 백업

#### 8.2 장애 복구
- 인증 서비스 장애 시 대응 방안
- 데이터 복구 절차

---

## 개발 환경 vs 프로덕션 환경

### 개발 환경
- `NODE_ENV=development`
- 이메일 시뮬레이션
- 자동 인증 처리
- 디버그 정보 제공

### 프로덕션 환경
- `NODE_ENV=production`
- Supabase Auth 사용
- 실제 이메일 발송
- 보안 강화
- 성능 최적화
