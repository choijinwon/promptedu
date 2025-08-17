import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kiro - AI IDE for prototype to production | Spec-driven development | PromptEdu',
  description: 'Kiro는 프로토타입부터 프로덕션까지를 위한 AI IDE로, spec-driven development를 통해 AI 코딩에 구조를 부여합니다. Kiro의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Kiro',
    'AI IDE',
    'spec-driven development',
    '프로토타입 to 프로덕션',
    'AI 코딩',
    'Kiro AI',
    'Kiro 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Kiro - AI IDE for prototype to production | Spec-driven development',
    description: 'Kiro는 프로토타입부터 프로덕션까지를 위한 AI IDE로, spec-driven development를 통해 AI 코딩에 구조를 부여합니다.',
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
            Kiro
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            The AI IDE for prototype to production
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              AI IDE
            </span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
              Spec-driven
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📋 Spec-driven Development</h3>
              <p className="text-gray-600">
                프롬프트를 명확한 요구사항, 시스템 설계, 개별 작업으로 변환하여 AI 코딩에 구조를 부여합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">🤖 Agent Hooks</h3>
              <p className="text-gray-600">
                &ldquo;파일 저장&rdquo;과 같은 이벤트에 트리거되는 AI 에이전트에게 작업을 위임하여 자동화를 구현합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎯 프로토타입 to 프로덕션</h3>
              <p className="text-gray-600">
                프로토타입부터 프로덕션까지 전체 개발 라이프사이클을 지원하는 통합 AI IDE 환경을 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🔧 VS Code 호환</h3>
              <p className="text-gray-600">
                Open VSX 플러그인, 테마, VS Code 설정을 지원하여 친숙하면서도 AI 최적화된 개발 환경을 제공합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">💼 엔터프라이즈 개발</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 대규모 프로젝트의 구조화된 개발</li>
                <li>• 팀 협업 및 코드 리뷰 자동화</li>
                <li>• 엔터프라이즈급 보안 및 프라이버시</li>
                <li>• 복잡한 시스템 아키텍처 설계</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-pink-600">🚀 빠른 프로토타이핑</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 아이디어에서 작동하는 프로토타입까지</li>
                <li>• 멀티모달 입력(이미지, 텍스트) 지원</li>
                <li>• 자동화된 테스트 및 문서화</li>
                <li>• 실시간 코드 변경 및 검토</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">🤖 AI 에이전트 개발</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 자동화된 작업 실행</li>
                <li>• 이벤트 기반 트리거 시스템</li>
                <li>• 백그라운드 작업 처리</li>
                <li>• 지능형 워크플로우 최적화</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 핵심 기능 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔧 핵심 기능</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📋 Spec-driven Development</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 프롬프트를 명확한 요구사항으로 변환</li>
                <li>• 시스템 설계 및 아키텍처 생성</li>
                <li>• 개별 작업으로 분해 및 관리</li>
                <li>• 견고한 테스트로 검증</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">🤖 Agent Hooks</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 이벤트 기반 자동화</li>
                <li>• 백그라운드 작업 실행</li>
                <li>• 문서화 및 테스트 자동 생성</li>
                <li>• 코드 성능 최적화</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎨 멀티모달 입력</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• UI 디자인 이미지 인식</li>
                <li>• 아키텍처 화이트보딩 사진</li>
                <li>• 자연어 텍스트 설명</li>
                <li>• 컨텍스트 기반 구현 가이드</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🔗 MCP 통합</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 문서, 데이터베이스, API 연결</li>
                <li>• 외부 도구 및 서비스 통합</li>
                <li>• 네이티브 MCP 지원</li>
                <li>• 확장 가능한 생태계</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 모델 및 기술 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🤖 지원 모델 및 기술</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🧠 AI 모델</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Claude Sonnet 3.7</li>
                <li>• Claude Sonnet 4</li>
                <li>• 추가 모델 지원 예정</li>
                <li>• 최신 AI 기술 적용</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">🔧 개발 환경</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• VS Code 호환</li>
                <li>• Open VSX 플러그인</li>
                <li>• 테마 및 설정 지원</li>
                <li>• AI 최적화된 환경</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🛡️ 보안 및 프라이버시</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 엔터프라이즈급 보안</li>
                <li>• 데이터 프라이버시 보호</li>
                <li>• 안전한 코드 배포</li>
                <li>• 규정 준수 지원</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 고급 기능 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 고급 기능</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎮 Autopilot 모드</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 대규모 작업 자율 실행</li>
                <li>• 단계별 지시 없이 자동화</li>
                <li>• 스크립트 및 명령어 실행</li>
                <li>• 완전한 제어권 유지</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">⚙️ Steering 파일</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 프로젝트별 에이전트 설정</li>
                <li>• 코딩 표준 및 워크플로우</li>
                <li>• 컨텍스트 및 도구 설정</li>
                <li>• 간단한 명령어로 구성</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📊 코드 변경 추적</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 실시간 코드 변경 감지</li>
                <li>• 단계별 변경 사항 검토</li>
                <li>• 원클릭 편집 및 승인</li>
                <li>• 변경 이력 관리</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🔍 스마트 컨텍스트</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 대규모 코드베이스 이해</li>
                <li>• 복잡한 기능 구현 지원</li>
                <li>• 반복 최소화</li>
                <li>• 의도 기반 프롬프트 이해</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 개발 워크플로우 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">⚙️ 개발 워크플로우</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">1. Spec 작성 및 협업</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 프롬프트를 명확한 요구사항으로 변환</li>
                <li>• Kiro와 함께 spec 및 아키텍처 협업</li>
                <li>• 시스템 설계 및 구조화된 설계 생성</li>
                <li>• 개별 작업으로 분해 및 검증</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-pink-600">2. 에이전트 구현</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Kiro 에이전트가 spec을 구현</li>
                <li>• 사용자 제어권 유지</li>
                <li>• 자동화된 작업 실행</li>
                <li>• 백그라운드에서 지속적인 개발</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">3. 코드 검토 및 최적화</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 실시간 코드 변경 추적</li>
                <li>• 단계별 변경 사항 검토</li>
                <li>• 성능 및 품질 최적화</li>
                <li>• 자동화된 테스트 및 문서화</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">4. 배포 및 모니터링</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 안전한 코드 배포</li>
                <li>• 엔터프라이즈급 보안 적용</li>
                <li>• 성능 모니터링 및 최적화</li>
                <li>• 지속적인 개선 및 업데이트</li>
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
                <h3 className="text-lg font-semibold mb-2 text-purple-600">1. 명확한 요구사항 정의</h3>
                <p className="text-gray-600">
                  &ldquo;앱 만들어줘&rdquo;보다는 &ldquo;사용자 인증, 파일 업로드, 실시간 채팅 기능을 가진 협업 플랫폼을 만들어줘. React와 Node.js를 사용하고, MongoDB를 데이터베이스로 사용해줘&rdquo;와 같이 구체적으로 설명하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-pink-600">2. 시스템 아키텍처 명시</h3>
                <p className="text-gray-600">
                  &ldquo;마이크로서비스 아키텍처로 설계하고, RESTful API를 사용해줘&rdquo;, &ldquo;JWT 토큰 기반 인증과 Redis 캐싱을 적용해줘&rdquo;와 같이 아키텍처 요구사항을 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">3. 비즈니스 로직 상세화</h3>
                <p className="text-gray-600">
                  &ldquo;사용자가 파일을 업로드하면 자동으로 OCR 처리를 하고, 결과를 데이터베이스에 저장한 후 이메일로 알림을 보내줘&rdquo;와 같이 비즈니스 로직을 상세히 설명하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">4. 품질 및 보안 요구사항</h3>
                <p className="text-gray-600">
                  &ldquo;단위 테스트와 통합 테스트를 포함하고, SQL 인젝션 방지와 XSS 보호를 적용해줘&rdquo;와 같이 품질 및 보안 요구사항을 명시하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Kiro 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Kiro를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=kiro"
              className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Kiro 프롬프트 보기
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
