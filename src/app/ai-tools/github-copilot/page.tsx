import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GitHub Copilot - AI 코드 어시스턴트 | OpenAI Codex 기반, 자동완성, 코드 제안 | PromptEdu',
  description: 'GitHub Copilot은 OpenAI Codex를 기반으로 한 AI 코드 어시스턴트로, 실시간 코드 자동완성과 제안을 통해 개발 효율성을 극대화합니다. GitHub Copilot의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'GitHub Copilot',
    'AI 코드 어시스턴트',
    'OpenAI Codex',
    '코드 자동완성',
    '코드 제안',
    'GitHub Copilot AI',
    'GitHub Copilot 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'GitHub Copilot - AI 코드 어시스턴트 | OpenAI Codex 기반',
    description: 'GitHub Copilot은 OpenAI Codex를 기반으로 한 AI 코드 어시스턴트로, 실시간 코드 자동완성과 제안을 통해 개발 효율성을 극대화합니다.',
    url: 'https://promptedu.io/ai-tools/github-copilot',
  },
};

export default function GitHubCopilotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            GitHub Copilot
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            AI 코드 어시스턴트
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              유료
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              코드 자동완성
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              OpenAI Codex
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">⚡ 실시간 자동완성</h3>
              <p className="text-gray-600">
                코드를 작성하는 동안 실시간으로 다음 줄을 예측하고 자동완성을 제안하여 타이핑 시간을 크게 단축합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🧠 컨텍스트 이해</h3>
              <p className="text-gray-600">
                전체 코드베이스와 주석을 분석하여 프로젝트의 맥락을 이해하고 적절한 코드를 제안합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎯 함수 제안</h3>
              <p className="text-gray-600">
                함수명과 주석만으로도 완전한 함수 구현을 제안하며, 다양한 프로그래밍 패턴을 학습합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">🔧 IDE 통합</h3>
              <p className="text-gray-600">
                VS Code, IntelliJ, Neovim 등 주요 IDE와 완벽하게 통합되어 자연스러운 개발 경험을 제공합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">💻 빠른 프로토타이핑</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 새로운 기능의 빠른 구현</li>
                <li>• API 엔드포인트 생성</li>
                <li>• 데이터베이스 쿼리 작성</li>
                <li>• UI 컴포넌트 개발</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">📚 학습 및 교육</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 새로운 언어나 프레임워크 학습</li>
                <li>• 코딩 베스트 프랙티스 이해</li>
                <li>• 디자인 패턴 구현</li>
                <li>• 알고리즘 및 자료구조 학습</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">🔧 유지보수 및 리팩토링</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 기존 코드 개선</li>
                <li>• 중복 코드 제거</li>
                <li>• 테스트 코드 작성</li>
                <li>• 문서화 및 주석 추가</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 언어 및 프레임워크 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔧 지원 언어 및 프레임워크</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🌐 웹 개발</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• JavaScript/TypeScript</li>
                <li>• React, Vue, Angular</li>
                <li>• Node.js, Express</li>
                <li>• Python, Django, Flask</li>
                <li>• Ruby, Rails</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📱 모바일 개발</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Swift, iOS</li>
                <li>• Kotlin, Android</li>
                <li>• React Native</li>
                <li>• Flutter, Dart</li>
                <li>• Xamarin</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🖥️ 시스템 개발</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• C++, C#</li>
                <li>• Java, Spring</li>
                <li>• Go, Rust</li>
                <li>• PHP, Laravel</li>
                <li>• Scala, Haskell</li>
              </ul>
            </div>
          </div>
        </section>

        {/* AI 기능 상세 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🤖 AI 기능 상세</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">💬 인라인 제안</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 실시간 코드 완성</li>
                <li>• 변수명 및 함수명 제안</li>
                <li>• import 문 자동 추가</li>
                <li>• 괄호 및 세미콜론 자동 완성</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📝 블록 제안</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 전체 함수 구현</li>
                <li>• 클래스 및 메서드 생성</li>
                <li>• 조건문 및 반복문 블록</li>
                <li>• 예외 처리 코드</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔍 컨텍스트 분석</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 파일 전체 구조 이해</li>
                <li>• 프로젝트 스타일 가이드 적용</li>
                <li>• 사용 중인 라이브러리 인식</li>
                <li>• 네이밍 컨벤션 학습</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">🎯 주석 기반 생성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 주석으로 기능 설명</li>
                <li>• 자연어로 코드 요청</li>
                <li>• 복잡한 로직 구현</li>
                <li>• 테스트 케이스 생성</li>
              </ul>
            </div>
          </div>
        </section>

        {/* IDE 통합 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ IDE 통합</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">📝 코드 에디터</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Visual Studio Code</li>
                <li>• Neovim, Vim</li>
                <li>• Emacs</li>
                <li>• Sublime Text</li>
                <li>• Atom</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🛠️ 통합 개발 환경</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• IntelliJ IDEA</li>
                <li>• PyCharm</li>
                <li>• WebStorm</li>
                <li>• Android Studio</li>
                <li>• Xcode</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎨 사용자 경험</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자연스러운 자동완성</li>
                <li>• Tab 키로 제안 수락</li>
                <li>• Esc 키로 제안 거부</li>
                <li>• 개인화된 학습</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">⚡ 성능 최적화</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 빠른 응답 시간</li>
                <li>• 메모리 효율적 사용</li>
                <li>• 오프라인 모드 지원</li>
                <li>• 배터리 최적화</li>
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
                <h3 className="text-lg font-semibold mb-2 text-green-600">1. 명확한 주석 작성</h3>
                <p className="text-gray-600">
                  &ldquo;사용자 인증 함수&rdquo;보다는 &ldquo;JWT 토큰을 사용하여 사용자 인증을 처리하는 함수. 성공 시 사용자 정보를 반환하고, 실패 시 에러를 throw한다&rdquo;와 같이 구체적으로 작성하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">2. 함수명과 매개변수 명시</h3>
                <p className="text-gray-600">
                  &ldquo;function authenticateUser(email, password) { /* JWT 인증 로직 */ }&rdquo;와 같이 함수명과 매개변수를 명시하면 더 정확한 구현을 받을 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">3. 에러 처리 요구사항</h3>
                <p className="text-gray-600">
                  &ldquo;try-catch 블록으로 에러를 처리하고, 사용자에게 친화적인 메시지를 표시하는 함수&rdquo;와 같이 에러 처리 방식을 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-indigo-600">4. 성능 및 보안 고려</h3>
                <p className="text-gray-600">
                  &ldquo;SQL 인젝션을 방지하고 성능을 최적화한 데이터베이스 쿼리 함수&rdquo;와 같이 성능이나 보안 요구사항을 명시하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            GitHub Copilot 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            GitHub Copilot을 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=github-copilot"
              className="px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              GitHub Copilot 프롬프트 보기
            </Link>
            <Link
              href="/ai-tools"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-green-600 transition-all duration-200 font-semibold text-lg"
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
