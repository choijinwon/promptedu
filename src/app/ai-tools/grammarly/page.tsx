import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Grammarly - AI 글쓰기 도우미 | 문법 검사, 스타일 개선, 톤 조정 | PromptEdu',
  description: 'Grammarly는 AI와 NLP를 사용하여 글쓰기를 향상시키는 편집 도구로, 문법 검사, 스타일 개선, 톤 조정을 통해 더 나은 글을 작성할 수 있도록 도와줍니다. Grammarly의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Grammarly',
    'AI 글쓰기 도우미',
    '문법 검사',
    '스타일 개선',
    '톤 조정',
    'NLP',
    'Grammarly AI',
    'Grammarly 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Grammarly - AI 글쓰기 도우미 | 문법 검사와 스타일 개선',
    description: 'Grammarly는 AI와 NLP를 사용하여 글쓰기를 향상시키는 편집 도구로, 문법 검사, 스타일 개선, 톤 조정을 통해 더 나은 글을 작성할 수 있도록 도와줍니다.',
    url: 'https://promptedu.io/ai-tools/grammarly',
  },
};

export default function GrammarlyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
            <span className="text-3xl">✍️</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Grammarly
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            AI 글쓰기 도우미
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료/유료
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              문법 검사
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              스타일 개선
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🔍 실시간 문법 검사</h3>
              <p className="text-gray-600">
                글을 작성하는 동안 실시간으로 문법 오류, 맞춤법, 문장 구조를 검사하고 즉시 수정 제안을 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎨 스타일 및 톤 개선</h3>
              <p className="text-gray-600">
                글의 스타일, 톤, 가독성을 분석하여 더 명확하고 효과적인 표현으로 개선 방안을 제시합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📱 크로스 플랫폼 지원</h3>
              <p className="text-gray-600">
                웹 브라우저, 데스크톱 앱, 모바일 앱, Microsoft Office 등 다양한 플랫폼에서 일관된 경험을 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">🧠 AI 기반 학습</h3>
              <p className="text-gray-600">
                사용자의 글쓰기 패턴을 학습하여 개인화된 제안을 제공하고, 지속적으로 개선된 피드백을 제공합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">📧 이메일 및 비즈니스 커뮤니케이션</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 전문적인 이메일 작성</li>
                <li>• 비즈니스 제안서 및 보고서</li>
                <li>• 고객 커뮤니케이션</li>
                <li>• 회의록 및 문서 작성</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">🎓 학술 및 교육</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 논문 및 연구 보고서</li>
                <li>• 에세이 및 과제 작성</li>
                <li>• 학술 논문 검토</li>
                <li>• 교육 자료 개발</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">📝 콘텐츠 제작</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 블로그 포스트 및 기사</li>
                <li>• 소셜미디어 콘텐츠</li>
                <li>• 마케팅 자료</li>
                <li>• 웹사이트 콘텐츠</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 언어 및 플랫폼 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🌍 지원 언어 및 플랫폼</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🌐 지원 언어</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 영어 (미국식, 영국식)</li>
                <li>• 캐나다 영어</li>
                <li>• 호주 영어</li>
                <li>• 추가 언어 지원 예정</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">💻 지원 플랫폼</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 웹 브라우저 확장 프로그램</li>
                <li>• Windows/Mac 데스크톱 앱</li>
                <li>• iOS/Android 모바일 앱</li>
                <li>• Microsoft Office 통합</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔧 통합 서비스</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Gmail, Outlook</li>
                <li>• Google Docs, Microsoft Word</li>
                <li>• LinkedIn, Twitter</li>
                <li>• Slack, Discord</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">📊 분석 도구</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 글쓰기 통계</li>
                <li>• 가독성 점수</li>
                <li>• 톤 분석</li>
                <li>• 개선 추이</li>
              </ul>
            </div>
          </div>
        </section>

        {/* AI 기능 상세 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🤖 AI 기능 상세</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🔍 문법 및 맞춤법</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 실시간 오류 감지</li>
                <li>• 문장 구조 분석</li>
                <li>• 단어 선택 제안</li>
                <li>• 문맥 기반 수정</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎨 스타일 및 톤</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 톤 조정 (공식/비공식)</li>
                <li>• 가독성 개선</li>
                <li>• 문장 다양성</li>
                <li>• 일관성 유지</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📝 고급 기능</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 플래거리즘 검사</li>
                <li>• 인용 스타일</li>
                <li>• 전문 용어 제안</li>
                <li>• 문맥별 맞춤 제안</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">🎯 개인화</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 개인 사전 설정</li>
                <li>• 글쓰기 목표 설정</li>
                <li>• 학습 패턴 분석</li>
                <li>• 맞춤형 피드백</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 요금제 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💰 요금제 비교</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-green-600">Free</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 기본 문법 검사</li>
                <li>• 맞춤법 검사</li>
                <li>• 문장 구조 제안</li>
                <li>• 웹 브라우저 확장</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Premium</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 고급 문법 검사</li>
                <li>• 스타일 및 톤 제안</li>
                <li>• 가독성 점수</li>
                <li>• 문장 다양성</li>
                <li>• 플래거리즘 검사</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-4 text-purple-600">Business</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• 팀 관리 기능</li>
                <li>• 브랜드 톤 가이드</li>
                <li>• 고급 분석</li>
                <li>• SSO 통합</li>
                <li>• 우선 지원</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 글쓰기 팁 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 효과적인 글쓰기 팁</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">1. 명확하고 간결하게</h3>
                <p className="text-gray-600">
                  &ldquo;복잡한 문장보다는 간단하고 명확한 문장을 사용하세요. 불필요한 단어를 제거하고 핵심 메시지에 집중하세요.&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">2. 적절한 톤 선택</h3>
                <p className="text-gray-600">
                  &ldquo;대상 독자와 상황에 맞는 톤을 선택하세요. 비즈니스 문서는 공식적이고, 소셜미디어는 친근하게 작성하세요.&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">3. 문장 구조 다양화</h3>
                <p className="text-gray-600">
                  &ldquo;짧은 문장과 긴 문장을 적절히 조합하여 리듬감을 만들어보세요. 단조로운 문장 구조는 독자의 흥미를 떨어뜨립니다.&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-indigo-600">4. 정기적인 검토</h3>
                <p className="text-gray-600">
                  &ldquo;글을 완성한 후 잠시 시간을 두고 다시 읽어보세요. 새로운 관점에서 오류나 개선점을 발견할 수 있습니다.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Grammarly 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Grammarly를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=grammarly"
              className="px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Grammarly 프롬프트 보기
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
              href="/ai-tools/notebooklm"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-blue-600 mb-2">NotebookLM</h3>
              <p className="text-gray-600 text-sm">Google의 맞춤형 AI 어시스턴트</p>
            </Link>
            <Link
              href="/ai-tools/slidesgo"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
            >
              <h3 className="font-semibold text-purple-600 mb-2">Slidesgo AI</h3>
              <p className="text-gray-600 text-sm">AI 기반 프레젠테이션 생성</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
