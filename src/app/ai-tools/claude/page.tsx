import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Claude - Anthropic의 논리적 AI | 특징, 사용법, 프롬프트 가이드 | PromptEdu',
  description: 'Claude는 Anthropic이 개발한 논리적 사고와 글쓰기에 특화된 AI로, 긴 문서 요약, 분석, 보고서 작성에 최적화되어 있습니다. Claude의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Claude',
    'Anthropic',
    '논리적 AI',
    '문서 요약',
    '분석 AI',
    '글쓰기 AI',
    'Claude 3',
    'Claude 3.5 Sonnet',
    'Claude 3.5 Haiku',
    'Claude 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Claude - Anthropic의 논리적 AI | 특징과 사용법',
    description: 'Claude는 Anthropic이 개발한 논리적 사고와 글쓰기에 특화된 AI로, 긴 문서 요약, 분석, 보고서 작성에 최적화되어 있습니다.',
    url: 'https://promptedu.io/ai-tools/claude',
  },
};

export default function ClaudePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mb-6">
            <span className="text-3xl">🧠</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
            Claude
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Anthropic의 논리적 사고 AI
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료/유료
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              논리적 분석
            </span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              문서 요약
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📚 긴 문서 처리</h3>
              <p className="text-gray-600">
                최대 200K 토큰까지 처리할 수 있어 긴 문서, 논문, 보고서를 한 번에 분석하고 요약할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🧮 논리적 사고</h3>
              <p className="text-gray-600">
                복잡한 문제를 논리적으로 분석하고 단계별로 해결하는 능력이 뛰어나며, 수학적 추론에도 강점을 보입니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">✍️ 글쓰기 전문성</h3>
              <p className="text-gray-600">
                학술적이고 전문적인 글쓰기에 특화되어 있어 연구 논문, 비즈니스 보고서 작성에 최적입니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🔒 안전성 중시</h3>
              <p className="text-gray-600">
                Constitutional AI를 기반으로 하여 유해한 내용을 피하고 안전하고 신뢰할 수 있는 답변을 제공합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">📖 학술 연구</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 긴 논문 및 연구 자료 요약</li>
                <li>• 복잡한 개념의 논리적 분석</li>
                <li>• 연구 방법론 검토 및 개선</li>
                <li>• 학술 논문 작성 및 편집</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-orange-600">💼 비즈니스 분석</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 시장 분석 보고서 작성</li>
                <li>• 복잡한 데이터 해석</li>
                <li>• 전략적 의사결정 지원</li>
                <li>• 비즈니스 제안서 작성</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">📝 전문 문서</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 법률 문서 분석 및 요약</li>
                <li>• 의료 보고서 작성</li>
                <li>• 기술 문서 번역 및 검토</li>
                <li>• 정책 문서 분석</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 버전 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 버전 비교</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-600">Claude 3.5 Haiku</h3>
              <p className="text-sm text-gray-500 mb-4">가장 빠른 버전</p>
              <ul className="text-gray-600 space-y-2">
                <li>• 빠른 응답 속도</li>
                <li>• 기본적인 분석 및 요약</li>
                <li>• 실시간 대화에 최적</li>
                <li>• 비용 효율적</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-4 text-purple-600">Claude 3.5 Sonnet</h3>
              <p className="text-sm text-gray-500 mb-4">균형잡힌 성능</p>
              <ul className="text-gray-600 space-y-2">
                <li>• 우수한 분석 능력</li>
                <li>• 긴 문서 처리 (200K 토큰)</li>
                <li>• 복잡한 추론 작업</li>
                <li>• 전문적 글쓰기</li>
                <li>• 코드 작성 및 분석</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold mb-4 text-orange-600">Claude 3.5 Opus</h3>
              <p className="text-sm text-gray-500 mb-4">최고 성능</p>
              <ul className="text-gray-600 space-y-2">
                <li>• 최고 수준의 분석 능력</li>
                <li>• 복잡한 문제 해결</li>
                <li>• 창의적 사고 및 혁신</li>
                <li>• 전문 분야 지식</li>
                <li>• 고급 코딩 및 디버깅</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ChatGPT vs Claude 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">⚖️ ChatGPT vs Claude 비교</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-600">ChatGPT</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 대화형 상호작용에 특화</li>
                <li>• 창의적 콘텐츠 생성</li>
                <li>• 다양한 플러그인 지원</li>
                <li>• 음성 상호작용</li>
                <li>• 이미지 분석 (GPT-4V)</li>
                <li>• 더 직관적인 인터페이스</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-4 text-purple-600">Claude</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 논리적 분석에 특화</li>
                <li>• 긴 문서 처리 능력</li>
                <li>• 학술적 글쓰기</li>
                <li>• 안전성 중시</li>
                <li>• 복잡한 추론 작업</li>
                <li>• 전문 분야 지식</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 프롬프트 팁 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 Claude 최적화 프롬프트 팁</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">1. 분석 요청하기</h3>
                <p className="text-gray-600">
                  &ldquo;이 문서를 단계별로 분석해주세요&rdquo; 또는 &ldquo;논리적 관점에서 검토해주세요&rdquo;와 같이 분석을 요청하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-orange-600">2. 전문가 역할 부여</h3>
                <p className="text-gray-600">
                  &ldquo;경험 많은 연구원으로서&rdquo;, &ldquo;전문 분석가로서&rdquo;와 같이 전문적인 역할을 부여하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">3. 구조화된 요청</h3>
                <p className="text-gray-600">
                  &ldquo;주요 포인트, 장단점, 결론으로 나누어 분석해주세요&rdquo;와 같이 구조화된 답변을 요청하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">4. 검증 요청</h3>
                <p className="text-gray-600">
                  &ldquo;이 분석의 한계점은 무엇인가요?&rdquo; 또는 &ldquo;추가로 고려해야 할 요소는?&rdquo;와 같이 검증을 요청하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-purple-600 to-orange-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Claude 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Claude를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=claude"
              className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Claude 프롬프트 보기
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
              href="/ai-tools/chatgpt"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-blue-600 mb-2">ChatGPT</h3>
              <p className="text-gray-600 text-sm">대화형 AI로 다양한 질문 답변에 특화</p>
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
