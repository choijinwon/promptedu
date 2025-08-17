import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ChatGPT - OpenAI의 대화형 AI | 특징, 사용법, 프롬프트 가이드 | PromptEdu',
  description: 'ChatGPT는 OpenAI가 개발한 대화형 AI로 다양한 질문 답변, 음성 상호작용, 기본 데이터 분석에 최적화되어 있습니다. ChatGPT의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'ChatGPT',
    'OpenAI',
    '대화형 AI',
    'AI 챗봇',
    'GPT-4',
    'GPT-3.5',
    'AI 대화',
    '음성 상호작용',
    '데이터 분석',
    'ChatGPT 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'ChatGPT - OpenAI의 대화형 AI | 특징과 사용법',
    description: 'ChatGPT는 OpenAI가 개발한 대화형 AI로 다양한 질문 답변, 음성 상호작용, 기본 데이터 분석에 최적화되어 있습니다.',
    url: 'https://promptedu.io/ai-tools/chatgpt',
  },
};

export default function ChatGPTPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            ChatGPT
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            OpenAI의 혁신적인 대화형 AI
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료/유료
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              텍스트 생성
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              대화형 AI
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">💬 자연스러운 대화</h3>
              <p className="text-gray-600">
                인간과 같은 자연스러운 대화를 통해 복잡한 질문에 답변하고, 맥락을 이해하여 연속적인 대화가 가능합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎤 음성 상호작용</h3>
              <p className="text-gray-600">
                음성 입력과 출력을 지원하여 더욱 직관적이고 편리한 상호작용이 가능합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📊 데이터 분석</h3>
              <p className="text-gray-600">
                기본적인 데이터 분석과 시각화를 지원하여 업무 효율성을 크게 향상시킵니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🌐 다국어 지원</h3>
              <p className="text-gray-600">
                다양한 언어를 지원하여 전 세계 사용자들이 자국어로 AI와 소통할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">📚 학습 및 교육</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 복잡한 개념의 쉬운 설명</li>
                <li>• 개인 맞춤형 학습 가이드</li>
                <li>• 문제 해결 과정 안내</li>
                <li>• 언어 학습 및 번역</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">💼 업무 효율화</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 이메일 및 문서 작성</li>
                <li>• 회의록 및 보고서 작성</li>
                <li>• 아이디어 브레인스토밍</li>
                <li>• 코드 작성 및 디버깅</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">🎨 창작 활동</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 스토리 및 시나리오 작성</li>
                <li>• 마케팅 카피 및 광고 문구</li>
                <li>• 소셜미디어 콘텐츠</li>
                <li>• 창작 영감 및 아이디어</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 버전 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 버전 비교</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-600">GPT-3.5 (무료)</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 기본적인 대화 및 질문 답변</li>
                <li>• 일반적인 텍스트 생성</li>
                <li>• 간단한 분석 및 요약</li>
                <li>• 제한된 컨텍스트 길이</li>
                <li>• 기본적인 코딩 지원</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-600">GPT-4 (유료)</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 더 정확하고 창의적인 답변</li>
                <li>• 복잡한 문제 해결 능력</li>
                <li>• 긴 컨텍스트 처리</li>
                <li>• 고급 코딩 및 디버깅</li>
                <li>• 이미지 분석 (GPT-4V)</li>
                <li>• 더 나은 추론 능력</li>
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
                <h3 className="text-lg font-semibold mb-2 text-blue-600">1. 구체적이고 명확하게</h3>
                                 <p className="text-gray-600">
                   &ldquo;간단히 설명해줘&rdquo;보다는 &ldquo;초등학생이 이해할 수 있도록 간단히 설명해줘&rdquo;와 같이 구체적인 요청을 하세요.
                 </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">2. 역할 부여하기</h3>
                                 <p className="text-gray-600">
                   &ldquo;전문 마케터로서&rdquo;, &ldquo;경험 많은 프로그래머로서&rdquo;와 같이 특정 역할을 부여하면 더 전문적인 답변을 받을 수 있습니다.
                 </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">3. 단계별 요청</h3>
                <p className="text-gray-600">
                  복잡한 작업은 단계별로 나누어 요청하면 더 정확하고 체계적인 답변을 받을 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-orange-600">4. 예시 포함하기</h3>
                <p className="text-gray-600">
                  원하는 결과의 예시를 포함하면 AI가 더 정확하게 이해하고 원하는 형태의 답변을 제공할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ChatGPT 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            ChatGPT를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=chatgpt"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              ChatGPT 프롬프트 보기
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
              href="/ai-tools/claude"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
            >
              <h3 className="font-semibold text-purple-600 mb-2">Claude</h3>
              <p className="text-gray-600 text-sm">긴 문서 요약 및 분석에 최적화된 AI</p>
            </Link>
            <Link
              href="/ai-tools/gemini"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-orange-500"
            >
              <h3 className="font-semibold text-orange-600 mb-2">Gemini</h3>
              <p className="text-gray-600 text-sm">데이터 분석과 업무 효율화에 특화된 AI</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
