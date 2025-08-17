import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Grok - 실시간 웹 검색 AI | 최신 정보 검색, 대화형 인터페이스, 실시간 대응 | PromptEdu',
  description: 'Grok은 실시간 웹 검색 기능과 대화형 인터페이스를 갖춘 실시간 대응형 AI로, 최신 정보를 즉시 검색하고 제공합니다. Grok의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Grok',
    '실시간 웹 검색',
    '대화형 AI',
    '최신 정보 검색',
    '실시간 대응',
    'Grok AI',
    'Grok 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Grok - 실시간 웹 검색 AI | 최신 정보 검색과 대화형 인터페이스',
    description: 'Grok은 실시간 웹 검색 기능과 대화형 인터페이스를 갖춘 실시간 대응형 AI로, 최신 정보를 즉시 검색하고 제공합니다.',
    url: 'https://promptedu.io/ai-tools/grok',
  },
};

export default function GrokPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
            {/* 뒤로 가기 버튼 */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link
          href="/ai-tools"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">AI 툴 목록으로</span>
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6">
            <span className="text-3xl">🔍</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Grok
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            실시간 웹 검색 AI
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              유료
            </span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              실시간 검색
            </span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              대화형 인터페이스
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-red-600">🔍 실시간 웹 검색</h3>
              <p className="text-gray-600">
                인터넷에 연결되어 최신 정보를 실시간으로 검색하고 제공합니다. 기존 AI 모델의 학습 데이터 한계를 넘어 현재 시점의 정보에 접근할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">💬 대화형 인터페이스</h3>
              <p className="text-gray-600">
                자연스러운 대화를 통해 정보를 검색하고 질문할 수 있습니다. 복잡한 검색 쿼리도 자연어로 표현하여 쉽게 원하는 정보를 찾을 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-yellow-600">⚡ 실시간 대응</h3>
              <p className="text-gray-600">
                최신 뉴스, 시장 동향, 실시간 데이터 등 현재 발생하고 있는 정보에 즉시 대응하여 정확하고 시의적절한 답변을 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🎯 정확한 정보 제공</h3>
              <p className="text-gray-600">
                검색 결과를 분석하고 종합하여 신뢰할 수 있는 정보를 제공합니다. 출처를 명시하고 정보의 신뢰성을 평가하여 사용자에게 도움이 됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-red-600">📰 뉴스 및 시사</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 최신 뉴스 및 이슈 검색</li>
                <li>• 정치, 경제, 사회 동향 파악</li>
                <li>• 특정 사건의 배경 및 전후 맥락</li>
                <li>• 다양한 관점의 뉴스 분석</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-orange-600">📊 시장 및 투자</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 주식 시장 실시간 정보</li>
                <li>• 암호화폐 가격 및 동향</li>
                <li>• 경제 지표 및 분석</li>
                <li>• 투자 관련 뉴스 및 전망</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-yellow-600">🔬 연구 및 학습</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 최신 연구 논문 검색</li>
                <li>• 학술 자료 및 참고문헌</li>
                <li>• 특정 분야의 최신 동향</li>
                <li>• 전문 용어 및 개념 설명</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 기능 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔧 지원 기능</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-red-600">🌐 웹 검색 기능</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 실시간 웹 크롤링</li>
                <li>• 다중 소스 검색</li>
                <li>• 검색 결과 분석</li>
                <li>• 정보 신뢰도 평가</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">💬 대화 기능</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자연어 질문 응답</li>
                <li>• 맥락 이해 대화</li>
                <li>• 후속 질문 지원</li>
                <li>• 대화 히스토리 관리</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-yellow-600">📊 정보 분석</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 데이터 시각화</li>
                <li>• 트렌드 분석</li>
                <li>• 비교 분석</li>
                <li>• 예측 모델링</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔗 소스 관리</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 출처 명시</li>
                <li>• 링크 제공</li>
                <li>• 인용 형식 지원</li>
                <li>• 북마크 기능</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 언어 및 플랫폼 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🌍 지원 언어 및 플랫폼</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-red-600">🌐 지원 언어</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 영어 (주요 지원)</li>
                <li>• 한국어</li>
                <li>• 일본어</li>
                <li>• 중국어</li>
                <li>• 기타 주요 언어</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">💻 지원 플랫폼</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 웹 브라우저</li>
                <li>• iOS 앱</li>
                <li>• Android 앱</li>
                <li>• API 서비스</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-yellow-600">🔗 통합 서비스</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Slack, Discord</li>
                <li>• Microsoft Teams</li>
                <li>• 웹사이트 임베드</li>
                <li>• 브라우저 확장</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📊 데이터 소스</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 뉴스 웹사이트</li>
                <li>• 학술 데이터베이스</li>
                <li>• 정부 공식 사이트</li>
                <li>• 소셜미디어</li>
              </ul>
            </div>
          </div>
        </section>

        {/* AI 기능 상세 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🤖 AI 기능 상세</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-red-600">🔍 검색 최적화</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 쿼리 이해 및 확장</li>
                <li>• 관련 검색어 제안</li>
                <li>• 검색 결과 순위 조정</li>
                <li>• 개인화된 검색</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">📝 정보 종합</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 다중 소스 정보 통합</li>
                <li>• 중복 정보 제거</li>
                <li>• 일관성 검증</li>
                <li>• 요약 및 정리</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-yellow-600">🎯 정확성 검증</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 팩트 체킹</li>
                <li>• 출처 신뢰도 평가</li>
                <li>• 정보 최신성 확인</li>
                <li>• 편향성 감지</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔄 실시간 업데이트</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자동 정보 갱신</li>
                <li>• 알림 기능</li>
                <li>• 변경사항 추적</li>
                <li>• 히스토리 관리</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 워크플로우 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔄 사용 워크플로우</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-red-600">💬 질문 입력</h3>
                  <p className="text-gray-600">
                    자연어로 원하는 정보나 질문을 입력합니다. 복잡한 질문도 자연스럽게 표현할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-orange-600">🔍 실시간 검색</h3>
                  <p className="text-gray-600">
                    AI가 질문을 분석하여 관련된 웹사이트를 실시간으로 검색하고 최신 정보를 수집합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-yellow-600">📊 정보 분석</h3>
                  <p className="text-gray-600">
                    수집된 정보를 분석하고 종합하여 정확하고 신뢰할 수 있는 답변을 생성합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-600">💡 답변 제공</h3>
                  <p className="text-gray-600">
                    출처와 함께 상세한 답변을 제공하고, 필요시 추가 질문이나 관련 정보를 제안합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 프롬프트 팁 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 효과적인 프롬프트 팁</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-red-600">1. 구체적인 질문하기</h3>
                                 <p className="text-gray-600">
                   &ldquo;최신 정보를 원한다면 구체적으로 언제, 어디서, 무엇에 대한 정보인지 명시하세요. 예: &apos;2024년 1월 기준 한국의 AI 정책 동향과 주요 변화사항&apos;&rdquo;
                 </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-orange-600">2. 출처 요청하기</h3>
                                 <p className="text-gray-600">
                   &ldquo;정보의 신뢰성을 확인하려면 출처를 함께 요청하세요. 예: &apos;최신 암호화폐 시장 동향을 알려주고, 신뢰할 수 있는 출처도 함께 제시해줘&apos;&rdquo;
                 </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-yellow-600">3. 비교 분석 요청</h3>
                                 <p className="text-gray-600">
                   &ldquo;여러 관점을 비교하려면 명시적으로 요청하세요. 예: &apos;ChatGPT와 Claude의 최신 기능을 비교하고, 각각의 장단점을 분석해줘&apos;&rdquo;
                 </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">4. 실시간 정보 확인</h3>
                                 <p className="text-gray-600">
                   &ldquo;최신 정보가 필요한 경우 실시간 검색을 요청하세요. 예: &apos;현재 주식 시장 상황과 최신 뉴스에 영향을 미치는 요소들을 실시간으로 검색해서 알려줘&apos;&rdquo;
                 </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Grok 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Grok을 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=grok"
              className="px-8 py-4 bg-white text-red-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Grok 프롬프트 보기
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
              href="/ai-tools/airepoto"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
            >
              <h3 className="font-semibold text-green-600 mb-2">Airepoto</h3>
              <p className="text-gray-600 text-sm">실시간 음성 인식 회의록 작성</p>
            </Link>
            <Link
              href="/ai-tools/scite"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-blue-600 mb-2">Scite.ai</h3>
              <p className="text-gray-600 text-sm">AI 학술 연구 도구</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
