import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Perplexity - AI 기반 검색 엔진 | 특징, 사용법, 프롬프트 가이드 | PromptEdu',
  description: 'Perplexity는 AI 기반 검색 엔진으로 구글 검색을 대체할 수 있는 정확한 결과와 검증 가능한 출처를 제공합니다. Perplexity의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Perplexity',
    'AI 검색',
    '검색 엔진',
    '정보 검색',
    '출처 검증',
    '실시간 정보',
    'Perplexity Pro',
    'Perplexity 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Perplexity - AI 기반 검색 엔진 | 특징과 사용법',
    description: 'Perplexity는 AI 기반 검색 엔진으로 구글 검색을 대체할 수 있는 정확한 결과와 검증 가능한 출처를 제공합니다.',
    url: 'https://promptedu.io/ai-tools/perplexity',
  },
};

export default function PerplexityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-purple-500 rounded-full mb-6">
            <span className="text-3xl">🔍</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            Perplexity
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            AI 기반 검색 엔진의 혁신
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료/유료
            </span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              AI 검색
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              출처 검증
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-red-600">🔍 AI 기반 검색</h3>
              <p className="text-gray-600">
                전통적인 키워드 검색을 넘어서 자연어 질문에 대한 지능적인 답변을 제공하며, 맥락을 이해한 검색 결과를 보여줍니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📚 출처 검증</h3>
              <p className="text-gray-600">
                모든 답변에 대한 출처를 명시하여 정보의 신뢰성을 보장하고, 사용자가 직접 원본을 확인할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">⚡ 실시간 정보</h3>
              <p className="text-gray-600">
                최신 뉴스, 시장 동향, 실시간 데이터를 반영하여 항상 최신의 정확한 정보를 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎯 맞춤형 답변</h3>
              <p className="text-gray-600">
                사용자의 질문 의도와 맥락을 파악하여 개인화된 답변을 제공하며, 대화형 인터페이스로 자연스러운 상호작용이 가능합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-red-600">📰 뉴스 및 정보 검색</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 최신 뉴스 및 이벤트 검색</li>
                <li>• 특정 주제에 대한 종합 정보</li>
                <li>• 시장 동향 및 분석</li>
                <li>• 기술 트렌드 및 업데이트</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">🎓 학술 연구</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 논문 및 연구 자료 검색</li>
                <li>• 학술적 사실 확인</li>
                <li>• 연구 동향 파악</li>
                <li>• 참고 문헌 찾기</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">💼 비즈니스 정보</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 기업 정보 및 재무 데이터</li>
                <li>• 경쟁사 분석</li>
                <li>• 시장 조사 및 분석</li>
                <li>• 비즈니스 트렌드</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 버전 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 버전 비교</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-600">Perplexity (무료)</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 기본 AI 검색 기능</li>
                <li>• 출처 검증</li>
                <li>• 실시간 정보 접근</li>
                <li>• 웹 검색 기반 답변</li>
                <li>• 기본적인 대화 기능</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-4 text-purple-600">Perplexity Pro (유료)</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 고급 AI 모델 사용</li>
                <li>• 무제한 검색</li>
                <li>• 파일 업로드 및 분석</li>
                <li>• 고급 대화 기능</li>
                <li>• 우선 지원</li>
                <li>• API 접근</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Google vs Perplexity 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">⚖️ Google vs Perplexity 비교</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Google 검색</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 키워드 기반 검색</li>
                <li>• 링크 목록 제공</li>
                <li>• 광고 포함</li>
                <li>• 개별 사이트 방문 필요</li>
                <li>• 정보 종합은 사용자 책임</li>
                <li>• 검색 결과 필터링 필요</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-600">Perplexity</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 자연어 질문 가능</li>
                <li>• 종합된 답변 제공</li>
                <li>• 출처 명시</li>
                <li>• 대화형 인터페이스</li>
                <li>• 맥락 이해</li>
                <li>• 실시간 정보 반영</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 검색 팁 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 효과적인 검색 팁</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-red-600">1. 구체적인 질문하기</h3>
                <p className="text-gray-600">
                  &ldquo;AI&rdquo;보다는 &ldquo;2024년 AI 기술 트렌드와 주요 발전 동향&rdquo;과 같이 구체적인 질문을 하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">2. 시간 범위 지정</h3>
                <p className="text-gray-600">
                  &ldquo;최근 6개월&rdquo;, &ldquo;2024년 이후&rdquo;와 같이 시간 범위를 명시하면 더 정확한 정보를 얻을 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">3. 비교 요청</h3>
                <p className="text-gray-600">
                  &ldquo;A와 B의 차이점&rdquo;, &ldquo;장단점 비교&rdquo;와 같이 비교 분석을 요청하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">4. 출처 확인</h3>
                <p className="text-gray-600">
                  제공된 출처 링크를 클릭하여 원본 정보를 직접 확인하고 신뢰성을 검증하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 검색 모드 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 검색 모드</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-red-600">🔍 All</h3>
              <p className="text-gray-600 mb-4">전체 웹에서 종합적인 검색</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 일반적인 질문</li>
                <li>• 종합적인 정보</li>
                <li>• 다양한 관점</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📰 News</h3>
              <p className="text-gray-600 mb-4">최신 뉴스 및 이벤트 검색</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 최신 뉴스</li>
                <li>• 실시간 이벤트</li>
                <li>• 시장 동향</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎓 Academic</h3>
              <p className="text-gray-600 mb-4">학술적 자료 및 연구 검색</p>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 논문 검색</li>
                <li>• 연구 자료</li>
                <li>• 학술적 사실</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-red-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Perplexity 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Perplexity를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=perplexity"
              className="px-8 py-4 bg-white text-red-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Perplexity 프롬프트 보기
            </Link>
            <Link
              href="/ai-tools"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-red-600 transition-all duration-200 font-semibold text-lg"
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
              <p className="text-gray-600 text-sm">다중모달 AI로 업무 효율화에 특화</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
