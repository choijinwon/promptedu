import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'v0 - AI 프로토타입 생성 도구 | 목업 기반 완벽한 프로토타입 | PromptEdu',
  description: 'v0는 목업을 입력하면 거의 완벽한 프로토타입을 생성하는 AI 도구로, 디자인과 개발을 연결하는 혁신적인 플랫폼입니다. v0의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'v0',
    'AI 프로토타입',
    '목업 변환',
    '프로토타입 생성',
    '디자인 to 코드',
    'v0 AI',
    'v0 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'v0 - AI 프로토타입 생성 도구 | 목업 기반 완벽한 프로토타입',
    description: 'v0는 목업을 입력하면 거의 완벽한 프로토타입을 생성하는 AI 도구로, 디자인과 개발을 연결하는 혁신적인 플랫폼입니다.',
    url: 'https://promptedu.io/ai-tools/v0',
  },
};

export default function V0Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <span className="text-3xl">🎨</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            v0
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            AI 프로토타입 생성 도구
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              프로토타입
            </span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
              목업 변환
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎨 목업 기반 생성</h3>
              <p className="text-gray-600">
                디자인 목업이나 스케치를 입력하면 AI가 분석하여 완전히 작동하는 프로토타입을 생성합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">⚡ 빠른 프로토타이핑</h3>
              <p className="text-gray-600">
                몇 분 내에 아이디어를 실제 작동하는 프로토타입으로 변환하여 개발 시간을 크게 단축합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🔧 완전한 기능 구현</h3>
              <p className="text-gray-600">
                단순한 UI뿐만 아니라 실제 작동하는 기능과 인터랙션을 포함한 완전한 프로토타입을 생성합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎯 다양한 플랫폼 지원</h3>
              <p className="text-gray-600">
                웹, 모바일, 데스크톱 등 다양한 플랫폼에 맞는 프로토타입을 생성하여 유연한 개발을 지원합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">💼 스타트업 및 기업</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• MVP(최소 기능 제품) 빠른 개발</li>
                <li>• 투자자 프레젠테이션용 프로토타입</li>
                <li>• 사용자 피드백 수집용 데모</li>
                <li>• 내부 검토 및 승인용 모델</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-pink-600">🎨 디자이너 및 UX 전문가</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 디자인 컨셉 검증</li>
                <li>• 사용자 경험 테스트</li>
                <li>• 인터랙션 프로토타입 제작</li>
                <li>• 클라이언트 시연용 모델</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">👨‍💻 개발자 및 엔지니어</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 기술 검증 및 개념 증명</li>
                <li>• 새로운 기술 스택 테스트</li>
                <li>• API 및 서비스 통합 테스트</li>
                <li>• 성능 및 확장성 검증</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 입력 형식 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📥 지원 입력 형식</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎨 디자인 파일</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Figma 디자인 파일</li>
                <li>• Sketch 파일</li>
                <li>• Adobe XD 파일</li>
                <li>• Photoshop/Illustrator 파일</li>
                <li>• PNG/JPG 이미지</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">✏️ 스케치 및 목업</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 손으로 그린 스케치</li>
                <li>• 디지털 목업</li>
                <li>• 와이어프레임</li>
                <li>• 플로우차트</li>
                <li>• 마인드맵</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📝 텍스트 설명</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자연어 설명</li>
                <li>• 기능 요구사항</li>
                <li>• 사용자 스토리</li>
                <li>• 기술 명세서</li>
                <li>• 비즈니스 로직</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🔗 기존 코드</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• HTML/CSS 코드</li>
                <li>• JavaScript/TypeScript</li>
                <li>• React/Vue 컴포넌트</li>
                <li>• API 스펙</li>
                <li>• 데이터베이스 스키마</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 생성되는 프로토타입 유형 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 생성되는 프로토타입 유형</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🌐 웹 애플리케이션</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 반응형 웹사이트</li>
                <li>• SPA(Single Page App)</li>
                <li>• 대시보드 및 관리자 패널</li>
                <li>• 이커머스 플랫폼</li>
                <li>• 소셜 네트워킹 앱</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">📱 모바일 앱</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• iOS/Android 앱</li>
                <li>• 하이브리드 앱</li>
                <li>• PWA(Progressive Web App)</li>
                <li>• 게임 및 엔터테인먼트</li>
                <li>• 생산성 도구</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🖥️ 데스크톱 앱</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 크로스 플랫폼 앱</li>
                <li>• 비즈니스 소프트웨어</li>
                <li>• 창작 도구</li>
                <li>• 데이터 분석 도구</li>
                <li>• 시스템 유틸리티</li>
              </ul>
            </div>
          </div>
        </section>

        {/* AI 기능 상세 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🤖 AI 기능 상세</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔍 이미지 분석</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• UI 요소 자동 인식</li>
                <li>• 레이아웃 구조 분석</li>
                <li>• 색상 및 스타일 추출</li>
                <li>• 컴포넌트 관계 파악</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">⚙️ 코드 생성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• HTML/CSS/JavaScript 자동 생성</li>
                <li>• React/Vue 컴포넌트 생성</li>
                <li>• API 엔드포인트 구현</li>
                <li>• 데이터베이스 스키마 생성</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎯 기능 구현</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 사용자 인증 시스템</li>
                <li>• 데이터 CRUD 작업</li>
                <li>• 실시간 통신</li>
                <li>• 파일 업로드/다운로드</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🔧 최적화</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 성능 최적화</li>
                <li>• 반응형 디자인</li>
                <li>• 접근성 개선</li>
                <li>• SEO 최적화</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 워크플로우 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ 워크플로우</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">1. 입력 및 분석</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 목업, 스케치, 또는 텍스트 설명 업로드</li>
                <li>• AI가 입력 내용을 분석하고 구조 파악</li>
                <li>• 기능 요구사항 및 사용자 플로우 추출</li>
                <li>• 기술 스택 및 아키텍처 결정</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-pink-600">2. 코드 생성</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 프론트엔드 컴포넌트 자동 생성</li>
                <li>• 백엔드 API 및 데이터베이스 구현</li>
                <li>• 사용자 인터페이스 및 스타일링</li>
                <li>• 기본 기능 및 인터랙션 구현</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">3. 테스트 및 최적화</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 자동화된 테스트 코드 생성</li>
                <li>• 성능 및 보안 검사</li>
                <li>• 반응형 디자인 최적화</li>
                <li>• 사용자 경험 개선</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">4. 배포 및 공유</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 클라우드 플랫폼에 자동 배포</li>
                <li>• 공유 가능한 링크 생성</li>
                <li>• 소스 코드 다운로드 제공</li>
                <li>• 문서 및 가이드 자동 생성</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 프롬프트 팁 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 효과적인 프롬프트 작성 팁</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">1. 명확한 목적 정의</h3>
                <p className="text-gray-600">
                  &ldquo;웹사이트 만들어줘&rdquo;보다는 &ldquo;전자상거래 플랫폼을 만들어줘. 사용자 등록, 상품 검색, 장바구니, 결제 기능이 필요하고, 반응형 디자인으로 모바일에서도 잘 작동해야 해&rdquo;와 같이 구체적으로 설명하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-pink-600">2. 타겟 사용자 명시</h3>
                <p className="text-gray-600">
                  &ldquo;20-30대 젊은 사용자를 대상으로 한 소셜 미디어 앱&rdquo;, &ldquo;기업 관리자를 위한 데이터 분석 대시보드&rdquo;와 같이 타겟 사용자를 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">3. 핵심 기능 우선순위</h3>
                <p className="text-gray-600">
                  &ldquo;사용자 인증, 실시간 채팅, 파일 공유가 핵심 기능이고, 나머지는 기본적인 CRUD 기능만 있으면 돼&rdquo;와 같이 기능의 우선순위를 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">4. 기술 요구사항</h3>
                <p className="text-gray-600">
                  &ldquo;React와 Node.js를 사용하고, MongoDB를 데이터베이스로 사용해줘&rdquo;, &ldquo;PWA로 만들어서 모바일에서 앱처럼 사용할 수 있게 해줘&rdquo;와 같이 기술 스택을 명시하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            v0 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            v0를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=v0"
              className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              v0 프롬프트 보기
            </Link>
            <Link
              href="/ai-tools"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-200 font-semibold text-lg"
            >
              다른 AI 툴 보기
            </Link>
          </div>
        </section>

        {/* 관련 링크 */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔗 관련 링크</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/ai-tools/cursor"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-blue-600 mb-2">Cursor</h3>
              <p className="text-gray-600 text-sm">AI 기반 코딩 에디터</p>
            </Link>
            <Link
              href="/ai-tools/github-copilot"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
            >
              <h3 className="font-semibold text-green-600 mb-2">GitHub Copilot</h3>
              <p className="text-gray-600 text-sm">AI 코드 어시스턴트</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
