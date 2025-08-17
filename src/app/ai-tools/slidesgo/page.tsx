import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Slidesgo AI - AI 기반 프레젠테이션 생성 | 프롬프트만으로 슬라이드 제작, 템플릿 자동 생성 | PromptEdu',
  description: 'Slidesgo AI는 프롬프트만 입력하면 발표자료를 자동으로 생성해주는 슬라이드 생성 AI입니다. 전문적인 프레젠테이션 템플릿과 디자인을 AI가 자동으로 제작하여 업무 효율성을 극대화합니다. Slidesgo AI의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Slidesgo AI',
    'AI 프레젠테이션',
    '슬라이드 생성',
    '프롬프트 기반 제작',
    '템플릿 자동 생성',
    'Slidesgo AI 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Slidesgo AI - AI 기반 프레젠테이션 생성 | 프롬프트만으로 슬라이드 제작',
    description: 'Slidesgo AI는 프롬프트만 입력하면 발표자료를 자동으로 생성해주는 슬라이드 생성 AI입니다.',
    url: 'https://promptedu.io/ai-tools/slidesgo',
  },
};

export default function SlidesgoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <span className="text-3xl">📊</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Slidesgo AI
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            AI 기반 프레젠테이션 생성
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              프레젠테이션
            </span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
              템플릿 생성
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">💬 프롬프트 기반 생성</h3>
              <p className="text-gray-600">
                간단한 프롬프트만 입력하면 AI가 자동으로 전문적인 프레젠테이션을 생성합니다. 복잡한 디자인 작업 없이도 완성도 높은 슬라이드를 만들 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">🎨 전문적인 디자인</h3>
              <p className="text-gray-600">
                업계 표준 디자인 원칙을 적용하여 시각적으로 매력적이고 전문적인 프레젠테이션을 자동으로 제작합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">⚡ 빠른 제작</h3>
              <p className="text-gray-600">
                기존에 수 시간이 걸리던 프레젠테이션 제작을 몇 분 안에 완료할 수 있어 업무 효율성을 극대화합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🔄 실시간 편집</h3>
              <p className="text-gray-600">
                생성된 프레젠테이션을 실시간으로 편집하고 수정할 수 있어, 완벽한 결과물을 만들 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">💼 비즈니스 프레젠테이션</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 회사 소개 및 제품 발표</li>
                <li>• 매출 보고서 및 성과 분석</li>
                <li>• 마케팅 전략 및 캠페인</li>
                <li>• 투자 유치 및 비즈니스 제안</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-pink-600">🎓 교육 및 학습</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 강의 자료 및 교육 콘텐츠</li>
                <li>• 연구 결과 발표</li>
                <li>• 학술 세미나 및 컨퍼런스</li>
                <li>• 학생 프로젝트 발표</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-indigo-600">📈 데이터 시각화</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 통계 및 분석 결과</li>
                <li>• 차트 및 그래프 포함 프레젠테이션</li>
                <li>• 시장 조사 결과</li>
                <li>• 성과 지표 및 KPI</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 기능 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔧 지원 기능</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📝 콘텐츠 생성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자동 텍스트 생성</li>
                <li>• 구조화된 내용 구성</li>
                <li>• 키워드 기반 내용 확장</li>
                <li>• 다국어 지원</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">🎨 디자인 요소</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 전문적인 템플릿</li>
                <li>• 색상 팔레트 자동 선택</li>
                <li>• 폰트 및 타이포그래피</li>
                <li>• 레이아웃 최적화</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">📊 시각적 요소</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 차트 및 그래프 생성</li>
                <li>• 아이콘 및 일러스트레이션</li>
                <li>• 이미지 자동 배치</li>
                <li>• 애니메이션 효과</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">💾 내보내기 옵션</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• PowerPoint (.pptx)</li>
                <li>• PDF 형식</li>
                <li>• Google Slides</li>
                <li>• 이미지 형식</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 프롬프트 예시 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💬 효과적인 프롬프트 예시</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">💼 비즈니스 프레젠테이션</h3>
              <div className="space-y-3">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">프롬프트 예시:</p>
                  <p className="text-gray-700 mt-1">&ldquo;스타트업을 위한 투자 유치 프레젠테이션을 만들어줘. AI 기술 기반의 B2B SaaS 제품이고, 시장 규모는 10억 달러입니다. 10-15장의 슬라이드로 구성하고, 차트와 그래프를 포함해주세요.&rdquo;</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-sm text-pink-800 font-medium">프롬프트 예시:</p>
                  <p className="text-gray-700 mt-1">&ldquo;분기별 매출 성과 보고서를 만들어줘. Q1-Q4까지의 매출 데이터와 전년 대비 성장률을 포함하고, 전문적이고 깔끔한 디자인으로 제작해주세요.&rdquo;</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-pink-600">🎓 교육 자료</h3>
              <div className="space-y-3">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">프롬프트 예시:</p>
                  <p className="text-gray-700 mt-1">&ldquo;대학생을 위한 디지털 마케팅 기초 강의 자료를 만들어줘. 20장의 슬라이드로 구성하고, 실제 사례와 예시를 포함해서 이해하기 쉽게 설명해주세요.&rdquo;</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-sm text-pink-800 font-medium">프롬프트 예시:</p>
                  <p className="text-gray-700 mt-1">&ldquo;기업 임직원 대상 AI 활용 교육 자료를 만들어줘. ChatGPT, Claude 등 주요 AI 도구들의 특징과 업무 활용 방안을 포함하고, 실습 예제도 추가해주세요.&rdquo;</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">📊 데이터 시각화</h3>
              <div className="space-y-3">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800 font-medium">프롬프트 예시:</p>
                  <p className="text-gray-700 mt-1">&ldquo;전자상거래 시장 트렌드 분석 프레젠테이션을 만들어줘. 2020-2024년 매출 데이터, 주요 플레이어 분석, 향후 전망을 차트와 그래프로 시각화해주세요.&rdquo;</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="text-sm text-pink-800 font-medium">프롬프트 예시:</p>
                  <p className="text-gray-700 mt-1">&ldquo;고객 만족도 조사 결과를 프레젠테이션으로 만들어줘. 설문조사 데이터를 바탕으로 파이 차트, 바 차트를 사용해서 결과를 시각화하고, 개선 방안도 제시해주세요.&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 워크플로우 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔄 사용 워크플로우</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-600">💬 프롬프트 입력</h3>
                  <p className="text-gray-600">
                    원하는 프레젠테이션의 주제, 목적, 대상, 슬라이드 수 등을 포함한 상세한 프롬프트를 입력합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-pink-600">🤖 AI 생성</h3>
                  <p className="text-gray-600">
                    AI가 프롬프트를 분석하여 적절한 템플릿을 선택하고, 내용을 구성하여 전문적인 프레젠테이션을 생성합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-indigo-600">✏️ 편집 및 수정</h3>
                  <p className="text-gray-600">
                    생성된 프레젠테이션을 검토하고, 필요에 따라 텍스트, 이미지, 레이아웃을 수정합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600">💾 내보내기</h3>
                  <p className="text-gray-600">
                    완성된 프레젠테이션을 PowerPoint, PDF, Google Slides 등 원하는 형식으로 내보냅니다.
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
                <h3 className="text-lg font-semibold mb-2 text-purple-600">1. 구체적인 정보 제공</h3>
                <p className="text-gray-600">
                  &ldquo;주제, 대상, 목적, 슬라이드 수, 포함할 내용 등을 구체적으로 명시하세요. 예: &apos;신입사원 교육용 AI 기초 강의 자료, 15장, 실제 사례 포함&apos;&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-pink-600">2. 시각적 요소 요청</h3>
                <p className="text-gray-600">
                  &ldquo;차트, 그래프, 이미지, 아이콘 등 필요한 시각적 요소를 명시하세요. 예: &apos;매출 데이터를 바 차트로 시각화하고, 관련 이미지 포함&apos;&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-indigo-600">3. 디자인 스타일 지정</h3>
                <p className="text-gray-600">
                  &ldquo;원하는 디자인 스타일이나 색상 테마를 지정하세요. 예: &apos;미니멀하고 전문적인 디자인, 파란색 계열 색상&apos;&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">4. 구조 및 흐름 명시</h3>
                <p className="text-gray-600">
                  &ldquo;프레젠테이션의 구조와 흐름을 명시하세요. 예: &apos;도입-문제 제시-해결방안-결론 순서로 구성하고, 각 섹션별로 3-4장씩 배분&apos;&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Slidesgo AI 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Slidesgo AI를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=slidesgo"
              className="px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Slidesgo AI 프롬프트 보기
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
              href="/ai-tools/notebooklm"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-blue-600 mb-2">NotebookLM</h3>
              <p className="text-gray-600 text-sm">Google의 맞춤형 AI 어시스턴트</p>
            </Link>
            <Link
              href="/ai-tools/airepoto"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
            >
              <h3 className="font-semibold text-green-600 mb-2">Airepoto</h3>
              <p className="text-gray-600 text-sm">실시간 음성 인식 회의록 작성</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
