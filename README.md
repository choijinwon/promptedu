# OpenPrompt - AI 프롬프트 관리 플랫폼

OpenPrompt는 AI 프롬프트를 생성, 관리, 공유할 수 있는 웹 애플리케이션입니다. 사용자들은 체계적인 프롬프트를 만들고, 다른 사용자들과 공유하며, 커뮤니티에서 영감을 얻을 수 있습니다.

## 🚀 주요 기능

### 📝 프롬프트 생성 및 관리
- **단계별 프롬프트 템플릿**: 6가지 전문 템플릿 제공
  - 단계별 학습 가이드
  - 문제 해결 프레임워크
  - 프로젝트 계획 수립
  - 연구 방법론
  - 비즈니스 전략 수립
  - 언어 학습 커리큘럼
- **변수 시스템**: 동적 프롬프트 생성
- **카테고리 분류**: 학습, 작업, 창작, 분석 등
- **공개/비공개 설정**: 프롬프트 공유 여부 선택

### 🔄 프롬프트 공유 및 탐색
- **공유 프롬프트 갤러리**: 다른 사용자들의 프롬프트 탐색
- **검색 및 필터링**: 제목, 카테고리, 내용으로 검색
- **정렬 기능**: 최신순, 인기순, 조회순, 제목순
- **좋아요 시스템**: 유용한 프롬프트에 좋아요 표시

### 👤 사용자 관리
- **OAuth 인증**: Google, GitHub 로그인 지원
- **프로필 관리**: 사용자 정보 및 아바타 설정
- **내 프롬프트**: 개인 프롬프트 관리

### 📊 분석 및 통계
- **사용 통계**: 프롬프트 사용 현황 분석
- **인기 프롬프트**: 가장 많이 사용되는 프롬프트
- **카테고리별 통계**: 분야별 사용 현황

## 🛠 기술 스택

### Frontend
- **Next.js 15**: React 기반 풀스택 프레임워크
- **TypeScript**: 타입 안전성 보장
- **Material-UI (MUI)**: 현대적이고 반응형 UI
- **React Hooks**: 상태 관리 및 사이드 이펙트

### Backend & Database
- **Supabase**: PostgreSQL 기반 백엔드 서비스
- **Next.js API Routes**: RESTful API 엔드포인트
- **Row Level Security (RLS)**: 데이터 보안
- **OAuth 인증**: Google, GitHub 소셜 로그인

### 개발 도구
- **pnpm**: 빠른 패키지 매니저
- **ESLint**: 코드 품질 관리
- **TypeScript**: 정적 타입 검사

## 📁 프로젝트 구조

```
OpenPrompt/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 엔드포인트
│   │   │   ├── prompts/       # 프롬프트 관련 API
│   │   │   ├── profile/       # 프로필 관련 API
│   │   │   └── auth/          # 인증 관련 API
│   │   ├── prompt-creator/    # 프롬프트 생성 페이지
│   │   ├── shared-prompts/    # 공유 프롬프트 페이지
│   │   ├── my-prompts/        # 내 프롬프트 페이지
│   │   ├── analytics/         # 분석 페이지
│   │   └── profile/           # 프로필 페이지
│   ├── components/            # 재사용 가능한 컴포넌트
│   ├── contexts/              # React Context
│   └── lib/                   # 유틸리티 및 설정
├── public/                    # 정적 파일
└── docs/                      # 문서
```

## 🚀 API 엔드포인트

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

## 🛠 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/OpenPrompt.git
cd OpenPrompt
```

### 2. 의존성 설치
```bash
pnpm install
```

### 3. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# 개발 환경 설정
NODE_ENV=development
```

### 4. 개발 서버 실행
```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 📊 데이터베이스 스키마

### shared_prompts 테이블
```sql
CREATE TABLE shared_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT '일반',
  template TEXT NOT NULL,
  variables TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT,
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### profiles 테이블
```sql
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
```

## 🔧 설정 가이드

자세한 설정 방법은 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)를 참조하세요.

### Supabase 설정
1. [supabase.com](https://supabase.com)에서 새 프로젝트 생성
2. 환경 변수 설정
3. 데이터베이스 스키마 생성
4. OAuth 제공자 설정 (Google, GitHub)

## 🚀 배포

### Vercel 배포
```bash
pnpm build
vercel --prod
```

### Netlify 배포
```bash
pnpm build
netlify deploy --prod
```

자세한 배포 방법은 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참조하세요.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 [Issues](https://github.com/your-username/OpenPrompt/issues)를 통해 연락해주세요.

---

**OpenPrompt** - AI 프롬프트 관리의 새로운 표준 🚀 