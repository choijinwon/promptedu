import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cursor - AI 코딩 에디터 | 실시간 디버깅, AI 어시스턴트, 코드 자동완성 | PromptEdu',
  description: 'Cursor는 AI 기반 코딩 에디터로, 실시간 디버깅과 AI 어시스턴트 기능을 제공하여 개발 효율성을 극대화합니다. Cursor의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Cursor',
    'AI 코딩 에디터',
    '코드 자동완성',
    '실시간 디버깅',
    'AI 어시스턴트',
    'Cursor AI',
    'Cursor 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Cursor - AI 코딩 에디터 | 실시간 디버깅과 AI 어시스턴트',
    description: 'Cursor는 AI 기반 코딩 에디터로, 실시간 디버깅과 AI 어시스턴트 기능을 제공하여 개발 효율성을 극대화합니다.',
    url: 'https://promptedu.io/ai-tools/cursor',
  },
};

export default function CursorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6">
            <span className="text-3xl">💻</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Cursor
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            AI 기반 코딩 에디터
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              코딩
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              AI 어시스턴트
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🤖 AI 어시스턴트</h3>
              <p className="text-gray-600">
                실시간으로 코드를 분석하고 제안하며, 복잡한 로직을 설명하고 최적화 방안을 제시합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">🔍 실시간 디버깅</h3>
              <p className="text-gray-600">
                코드 실행 중 발생하는 오류를 실시간으로 감지하고 해결 방안을 제시하여 디버깅 시간을 단축합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">⚡ 코드 자동완성</h3>
              <p className="text-gray-600">
                컨텍스트를 이해하여 정확한 코드 자동완성을 제공하고, 함수와 변수명을 예측하여 타이핑을 줄입니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎯 스마트 리팩토링</h3>
              <p className="text-gray-600">
                코드 품질을 개선하고 중복을 제거하며, 더 효율적이고 읽기 쉬운 코드로 리팩토링을 제안합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">💻 개발 생산성 향상</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 반복적인 코드 패턴 자동 생성</li>
                <li>• 복잡한 알고리즘 구현 지원</li>
                <li>• API 통합 및 데이터 처리</li>
                <li>• 테스트 코드 자동 생성</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-indigo-600">🐛 디버깅 및 문제 해결</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 오류 원인 분석 및 해결책 제시</li>
                <li>• 성능 최적화 제안</li>
                <li>• 보안 취약점 감지</li>
                <li>• 코드 리뷰 및 개선점 제안</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">📚 학습 및 교육</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 새로운 프로그래밍 언어 학습</li>
                <li>• 프레임워크 및 라이브러리 이해</li>
                <li>• 코딩 베스트 프랙티스 학습</li>
                <li>• 코드 구조 및 설계 패턴 이해</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 언어 및 프레임워크 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔧 지원 언어 및 프레임워크</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🌐 웹 개발</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• JavaScript/TypeScript</li>
                <li>• React, Vue, Angular</li>
                <li>• Node.js, Express</li>
                <li>• HTML, CSS, SCSS</li>
                <li>• Next.js, Nuxt.js</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🐍 백엔드 개발</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Python, Django, Flask</li>
                <li>• Java, Spring Boot</li>
                <li>• C#, .NET</li>
                <li>• Go, Rust</li>
                <li>• PHP, Laravel</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📱 모바일 개발</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• React Native</li>
                <li>• Flutter, Dart</li>
                <li>• Swift, iOS</li>
                <li>• Kotlin, Android</li>
                <li>• Xamarin</li>
              </ul>
            </div>
          </div>
        </section>

        {/* AI 기능 상세 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🤖 AI 기능 상세</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">💬 채팅 기반 코딩</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자연어로 코드 요청</li>
                <li>• 복잡한 로직 설명</li>
                <li>• 코드 최적화 제안</li>
                <li>• 버그 수정 도움</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">🔍 코드 분석</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 코드 복잡도 분석</li>
                <li>• 성능 병목 지점 식별</li>
                <li>• 보안 취약점 검사</li>
                <li>• 코드 품질 평가</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">📝 문서 생성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 함수 및 클래스 문서화</li>
                <li>• README 파일 생성</li>
                <li>• API 문서 자동 생성</li>
                <li>• 주석 및 설명 추가</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🧪 테스트 생성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 단위 테스트 자동 생성</li>
                <li>• 통합 테스트 코드</li>
                <li>• 테스트 케이스 설계</li>
                <li>• 모킹 및 스터빙</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 개발 워크플로우 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ 개발 워크플로우</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">1. 프로젝트 설정</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 프로젝트 구조 분석 및 제안</li>
                <li>• 필요한 의존성 패키지 추천</li>
                <li>• 개발 환경 설정 가이드</li>
                <li>• 코드 스타일 및 린팅 설정</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-indigo-600">2. 코드 작성</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• AI 어시스턴트와 실시간 협업</li>
                <li>• 컨텍스트 기반 코드 자동완성</li>
                <li>• 함수 및 클래스 템플릿 생성</li>
                <li>• 복잡한 로직 구현 지원</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">3. 디버깅 및 최적화</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 실시간 오류 감지 및 해결</li>
                <li>• 성능 최적화 제안</li>
                <li>• 코드 리팩토링 권장사항</li>
                <li>• 보안 및 품질 검사</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">4. 테스트 및 배포</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 테스트 코드 자동 생성</li>
                <li>• CI/CD 파이프라인 설정</li>
                <li>• 배포 스크립트 생성</li>
                <li>• 모니터링 및 로깅 설정</li>
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
                <h3 className="text-lg font-semibold mb-2 text-blue-600">1. 구체적인 요청</h3>
                <p className="text-gray-600">
                  &ldquo;함수 만들어줘&rdquo;보다는 &ldquo;사용자 인증을 처리하는 async 함수를 만들어줘. JWT 토큰을 사용하고 에러 핸들링도 포함해줘&rdquo;와 같이 구체적으로 요청하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-indigo-600">2. 컨텍스트 제공</h3>
                <p className="text-gray-600">
                  &ldquo;React 컴포넌트에서 사용할 상태 관리 로직을 만들어줘. TypeScript를 사용하고, 사용자 정보와 테마 설정을 관리해야 해&rdquo;와 같이 사용 맥락을 설명하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">3. 성능 요구사항 명시</h3>
                <p className="text-gray-600">
                  &ldquo;대용량 데이터를 효율적으로 처리하는 알고리즘을 만들어줘. 시간 복잡도는 O(n log n) 이하여야 하고, 메모리 사용량도 최적화해줘&rdquo;와 같이 성능 요구사항을 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">4. 테스트 요청</h3>
                <p className="text-gray-600">
                  &ldquo;이 함수에 대한 단위 테스트를 Jest로 작성해줘. 엣지 케이스와 에러 상황도 포함해서&rdquo;와 같이 테스트 요구사항도 함께 요청하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Cursor 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Cursor를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=cursor"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Cursor 프롬프트 보기
            </Link>
            <Link
              href="/ai-tools"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold text-lg"
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
              href="/ai-tools/github-copilot"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
            >
              <h3 className="font-semibold text-green-600 mb-2">GitHub Copilot</h3>
              <p className="text-gray-600 text-sm">Microsoft의 AI 코드 어시스턴트</p>
            </Link>
            <Link
              href="/ai-tools/v0"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
            >
              <h3 className="font-semibold text-purple-600 mb-2">v0</h3>
              <p className="text-gray-600 text-sm">목업을 통한 프로토타입 생성</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
