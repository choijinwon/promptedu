import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Scite.ai - AI 학술 연구 도구 | 논문 인용 분석 및 신뢰성 평가',
  description: 'Scite.ai는 AI를 활용한 학술 연구 도구로, 논문 인용 분석, 신뢰성 평가, 스마트 인용 기능을 제공합니다. 연구자와 학술계를 위한 최고의 AI 도구입니다.',
  keywords: [
    'Scite.ai',
    'AI 학술 연구',
    '논문 인용 분석',
    '스마트 인용',
    '학술 논문 검색',
    '연구 도구',
    '논문 신뢰성',
    '학술 데이터베이스',
    '연구 분석',
    'AI 연구 도구',
    '논문 검증',
    '학술 인용',
    '연구 효율성',
    'AI 논문 분석'
  ],
  openGraph: {
    title: 'Scite.ai - AI 학술 연구 도구 | 논문 인용 분석 및 신뢰성 평가',
    description: 'Scite.ai는 AI를 활용한 학술 연구 도구로, 논문 인용 분석, 신뢰성 평가, 스마트 인용 기능을 제공합니다.',
    type: 'website',
    url: 'https://promptedu.io/ai-tools/scite',
  },
};

export default function ScitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Scite.ai
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            AI 기반 학술 연구 도구로 논문 인용 분석과 신뢰성 평가를 제공
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">학술 연구</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">논문 분석</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">스마트 인용</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">신뢰성 평가</span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">유료</span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔬 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📊 스마트 인용</h3>
              <p className="text-gray-600">
                논문이 다른 연구에서 어떻게 인용되었는지 분석하여 지지, 반박, 언급을 구분하여 보여줍니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎯 신뢰성 평가</h3>
              <p className="text-gray-600">
                논문의 신뢰성을 AI가 자동으로 평가하여 연구의 품질과 영향력을 객관적으로 측정합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔍 고급 검색</h3>
              <p className="text-gray-600">
                자연어로 연구 질문을 입력하면 관련 논문들을 찾아주고, 인용 관계를 시각화합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">📈 연구 트렌드</h3>
              <p className="text-gray-600">
                특정 분야의 연구 트렌드와 발전 방향을 분석하여 연구 동향을 파악할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">🎓 학술 연구</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 논문 리뷰 및 메타 분석</li>
                <li>• 연구 갭 분석 및 동향 파악</li>
                <li>• 인용 네트워크 분석</li>
                <li>• 연구 영향력 평가</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">📚 문헌 조사</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 체계적 문헌 검토</li>
                <li>• 관련 연구 발견</li>
                <li>• 논문 품질 평가</li>
                <li>• 연구 방법론 비교</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">🔬 연구 검증</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 연구 결과 재현성 확인</li>
                <li>• 방법론적 한계 분석</li>
                <li>• 연구 윤리 검토</li>
                <li>• 데이터 신뢰성 평가</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 핵심 기능 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔧 핵심 기능</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📖 스마트 인용 분석</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 지지, 반박, 언급 구분</li>
                <li>• 인용 컨텍스트 분석</li>
                <li>• 인용 네트워크 시각화</li>
                <li>• 영향력 지수 계산</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎯 신뢰성 평가</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 방법론 품질 평가</li>
                <li>• 재현성 가능성 분석</li>
                <li>• 편향성 감지</li>
                <li>• 연구 윤리 검토</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔍 고급 검색</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자연어 질문 처리</li>
                <li>• 의미론적 검색</li>
                <li>• 필터링 및 정렬</li>
                <li>• 개인화된 추천</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">📊 연구 분석</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 연구 트렌드 분석</li>
                <li>• 협력 네트워크 분석</li>
                <li>• 연구 영향력 측정</li>
                <li>• 미래 연구 방향 예측</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 모델 및 기술 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🤖 지원 모델 및 기술</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🧠 AI 모델</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자연어 처리 (NLP)</li>
                <li>• 텍스트 분류 및 감정 분석</li>
                <li>• 의미론적 유사도 분석</li>
                <li>• 패턴 인식 및 예측</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">📚 데이터베이스</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 대규모 학술 논문 데이터베이스</li>
                <li>• 인용 관계 데이터</li>
                <li>• 메타데이터 및 풀텍스트</li>
                <li>• 실시간 업데이트</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔧 분석 도구</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 네트워크 분석</li>
                <li>• 통계적 분석</li>
                <li>• 시각화 도구</li>
                <li>• API 및 통합</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🛡️ 보안 및 프라이버시</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 데이터 암호화</li>
                <li>• 접근 제어</li>
                <li>• 감사 로그</li>
                <li>• GDPR 준수</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 워크플로우 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔄 연구 워크플로우</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600">🔍 연구 질문 정의</h3>
                  <p className="text-gray-600">
                    자연어로 연구 질문을 입력하거나 키워드를 사용하여 검색 범위를 정의합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-600">📊 논문 검색 및 분석</h3>
                  <p className="text-gray-600">
                    AI가 관련 논문들을 찾아주고, 인용 관계와 신뢰성을 자동으로 분석합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-600">🎯 결과 검토 및 필터링</h3>
                  <p className="text-gray-600">
                    분석 결과를 검토하고, 품질과 관련성에 따라 논문들을 필터링합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-orange-600">📈 인사이트 도출</h3>
                  <p className="text-gray-600">
                    연구 트렌드와 갭을 분석하여 새로운 연구 방향과 기회를 발견합니다.
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
                <h3 className="text-lg font-semibold mb-2 text-blue-600">1. 구체적인 연구 질문</h3>
                <p className="text-gray-600">
                  &ldquo;AI가 의료 진단에 미치는 영향에 대한 최신 연구를 찾아주고, 각 논문의 신뢰성과 인용 관계를 분석해줘&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">2. 방법론적 필터링</h3>
                <p className="text-gray-600">
                  &ldquo;랜덤화 대조 시험(RCT)을 사용한 연구들만 찾아주고, 표본 크기가 100명 이상인 논문들을 우선적으로 보여줘&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">3. 시간 범위 지정</h3>
                <p className="text-gray-600">
                  &ldquo;2020년 이후 발표된 논문들 중에서 기계학습을 활용한 금융 위험 평가 연구를 찾아주고, 인용 횟수 순으로 정렬해줘&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-orange-600">4. 연구 갭 분석</h3>
                <p className="text-gray-600">
                  &ldquo;기존 연구들의 한계점과 미해결 문제들을 분석해서 새로운 연구 기회가 있는 분야를 찾아줘&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Scite.ai 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Scite.ai를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=research"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              연구 프롬프트 보기
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
              href="/ai-tools/grok"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-red-500"
            >
              <h3 className="font-semibold text-red-600 mb-2">Grok</h3>
              <p className="text-gray-600 text-sm">실시간 웹 검색 AI</p>
            </Link>
            <Link
              href="/ai-tools/scholarcy"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
            >
              <h3 className="font-semibold text-green-600 mb-2">Scholarcy</h3>
              <p className="text-gray-600 text-sm">논문 요약 및 분석 도구</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
