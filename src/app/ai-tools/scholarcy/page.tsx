import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Scholarcy - AI 논문 요약 도구 | 논문, 보고서, 기사 자동 요약',
  description: 'Scholarcy는 AI를 활용한 논문 요약 도구로, 논문, 보고서, 기사 등을 자동으로 요약하고 핵심 정보를 추출합니다. 연구자와 학생을 위한 필수 AI 도구입니다.',
  keywords: [
    'Scholarcy',
    'AI 논문 요약',
    '논문 분석',
    '자동 요약',
    '연구 도구',
    '학술 논문',
    '문서 요약',
    '핵심 정보 추출',
    '연구 효율성',
    'AI 요약 도구',
    '논문 리뷰',
    '학술 자료',
    '연구 분석',
    '문서 처리'
  ],
  openGraph: {
    title: 'Scholarcy - AI 논문 요약 도구 | 논문, 보고서, 기사 자동 요약',
    description: 'Scholarcy는 AI를 활용한 논문 요약 도구로, 논문, 보고서, 기사 등을 자동으로 요약하고 핵심 정보를 추출합니다.',
    type: 'website',
    url: 'https://promptedu.io/ai-tools/scholarcy',
  },
};

export default function ScholarcyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Scholarcy
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            AI 기반 논문 요약 도구로 논문, 보고서, 기사를 자동으로 요약하고 핵심 정보를 추출
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">논문 요약</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">문서 분석</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">핵심 정보 추출</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">연구 도구</span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">유료</span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📚 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🤖 자동 요약</h3>
              <p className="text-gray-600">
                긴 논문이나 보고서를 AI가 자동으로 분석하여 핵심 내용을 요약하고 구조화된 형태로 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎯 핵심 정보 추출</h3>
              <p className="text-gray-600">
                연구 방법, 결과, 결론, 인용 정보 등 중요한 정보를 자동으로 추출하여 빠르게 파악할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📊 구조화된 출력</h3>
              <p className="text-gray-600">
                요약 결과를 플래시카드 형태로 제공하여 핵심 개념과 정의를 쉽게 학습하고 기억할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🔗 인용 관리</h3>
              <p className="text-gray-600">
                추출된 인용 정보를 자동으로 정리하고, 참고문헌 목록을 생성하여 연구 작업을 효율화합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">🎓 학술 연구</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 논문 리뷰 및 메타 분석</li>
                <li>• 문헌 조사 및 동향 파악</li>
                <li>• 연구 방법론 비교 분석</li>
                <li>• 연구 갭 및 기회 발견</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">📖 학습 및 교육</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 복잡한 논문 이해 및 학습</li>
                <li>• 연구 방법론 교육</li>
                <li>• 학술 글쓰기 연습</li>
                <li>• 연구 프로젝트 준비</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">💼 업무 활용</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 업계 보고서 분석</li>
                <li>• 시장 조사 자료 요약</li>
                <li>• 정책 문서 검토</li>
                <li>• 경쟁사 분석</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 핵심 기능 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔧 핵심 기능</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">📝 자동 요약 생성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 핵심 내용 추출 및 요약</li>
                <li>• 구조화된 요약 카드 생성</li>
                <li>• 중요도별 정보 분류</li>
                <li>• 다국어 지원</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🎯 정보 추출</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 연구 방법 및 결과 추출</li>
                <li>• 핵심 개념 및 정의 식별</li>
                <li>• 데이터 및 통계 정보 추출</li>
                <li>• 결론 및 시사점 정리</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📊 플래시카드 생성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 핵심 개념 카드 생성</li>
                <li>• 정의 및 설명 포함</li>
                <li>• 학습 효율성 증대</li>
                <li>• 복습 및 암기 지원</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🔗 인용 관리</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자동 인용 정보 추출</li>
                <li>• 참고문헌 목록 생성</li>
                <li>• 다양한 인용 스타일 지원</li>
                <li>• 인용 데이터베이스 연동</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 모델 및 기술 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🤖 지원 모델 및 기술</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🧠 AI 모델</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자연어 처리 (NLP)</li>
                <li>• 텍스트 요약 알고리즘</li>
                <li>• 정보 추출 모델</li>
                <li>• 의미론적 분석</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📄 문서 형식</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• PDF 문서</li>
                <li>• Word 문서</li>
                <li>• 웹 페이지</li>
                <li>• 텍스트 파일</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔧 분석 도구</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 텍스트 마이닝</li>
                <li>• 키워드 추출</li>
                <li>• 주제 모델링</li>
                <li>• 감정 분석</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🛡️ 보안 및 프라이버시</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 문서 암호화</li>
                <li>• 개인정보 보호</li>
                <li>• 접근 제어</li>
                <li>• 데이터 보안</li>
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
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-600">📄 문서 업로드</h3>
                  <p className="text-gray-600">
                    분석하고 싶은 논문, 보고서, 기사 등을 Scholarcy에 업로드합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600">🤖 AI 분석</h3>
                  <p className="text-gray-600">
                    AI가 문서를 분석하여 핵심 내용을 추출하고 구조화된 요약을 생성합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-600">📊 결과 검토</h3>
                  <p className="text-gray-600">
                    생성된 요약, 플래시카드, 추출된 정보를 검토하고 필요시 수정합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-orange-600">💾 저장 및 공유</h3>
                  <p className="text-gray-600">
                    분석 결과를 저장하고, 팀원이나 동료와 공유하여 협업을 진행합니다.
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
                <h3 className="text-lg font-semibold mb-2 text-green-600">1. 구체적인 분석 요청</h3>
                <p className="text-gray-600">
                  &ldquo;이 논문의 연구 방법론과 주요 결과를 중심으로 요약해주고, 연구의 한계점도 함께 정리해줘&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">2. 특정 관점에서의 요약</h3>
                <p className="text-gray-600">
                  &ldquo;의료진의 관점에서 이 연구의 임상적 의미와 실제 적용 가능성을 중심으로 요약해줘&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">3. 비교 분석 요청</h3>
                <p className="text-gray-600">
                  &ldquo;이 논문과 유사한 연구들과 비교해서 차이점과 공통점을 분석해주고, 연구의 독창성을 평가해줘&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-orange-600">4. 미래 연구 방향 제시</h3>
                <p className="text-gray-600">
                  &ldquo;이 연구의 결과를 바탕으로 향후 연구가 필요한 분야와 구체적인 연구 방향을 제시해줘&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Scholarcy 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Scholarcy를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=research"
              className="px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              연구 프롬프트 보기
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
              href="/ai-tools/scite"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-blue-600 mb-2">Scite.ai</h3>
              <p className="text-gray-600 text-sm">AI 학술 연구 도구</p>
            </Link>
            <Link
              href="/ai-tools/grok"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-red-500"
            >
              <h3 className="font-semibold text-red-600 mb-2">Grok</h3>
              <p className="text-gray-600 text-sm">실시간 웹 검색 AI</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
