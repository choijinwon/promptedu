import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gemini - Google의 다중모달 AI | 특징, 사용법, 프롬프트 가이드 | PromptEdu',
  description: 'Gemini는 Google이 개발한 다중모달 AI로 데이터 분석, 제안서 작성, 자료 통합 등에서 실질적인 업무 효율화를 가능하게 합니다. Gemini의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Gemini',
    'Google AI',
    '다중모달 AI',
    '데이터 분석',
    '업무 효율화',
    'Gemini Pro',
    'Gemini Ultra',
    'Gemini Flash',
    'Gemini 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Gemini - Google의 다중모달 AI | 특징과 사용법',
    description: 'Gemini는 Google이 개발한 다중모달 AI로 데이터 분석, 제안서 작성, 자료 통합 등에서 실질적인 업무 효율화를 가능하게 합니다.',
    url: 'https://promptedu.io/ai-tools/gemini',
  },
};

export default function GeminiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full mb-6">
            <span className="text-3xl">🌟</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
            Gemini
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Google의 혁신적인 다중모달 AI
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료/유료
            </span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              다중모달
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              업무 효율화
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-orange-600">🖼️ 다중모달 처리</h3>
              <p className="text-gray-600">
                텍스트, 이미지, 오디오, 비디오를 동시에 처리할 수 있어 다양한 형태의 정보를 통합적으로 분석합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📊 실시간 데이터</h3>
              <p className="text-gray-600">
                Google 검색을 통한 실시간 정보 접근으로 최신 데이터를 활용한 정확한 분석과 답변을 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">💼 업무 통합</h3>
              <p className="text-gray-600">
                Google Workspace와의 완벽한 통합으로 Gmail, Docs, Sheets 등에서 직접 AI 기능을 활용할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔍 고급 추론</h3>
              <p className="text-gray-600">
                복잡한 문제를 단계별로 분석하고 논리적 추론을 통해 정확한 해결책을 제시합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-orange-600">📈 데이터 분석</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 복잡한 데이터셋 분석 및 시각화</li>
                <li>• 차트 및 그래프 해석</li>
                <li>• 통계적 인사이트 도출</li>
                <li>• 예측 모델링 지원</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">📝 문서 작성</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 비즈니스 제안서 작성</li>
                <li>• 보고서 및 분석 문서</li>
                <li>• 마케팅 자료 및 콘텐츠</li>
                <li>• 이메일 및 커뮤니케이션</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">🎨 창작 활동</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 이미지 기반 콘텐츠 생성</li>
                <li>• 멀티미디어 프레젠테이션</li>
                <li>• 시각적 자료 분석</li>
                <li>• 크리에이티브 아이디어 발굴</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 버전 비교 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📊 버전 비교</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <h3 className="text-xl font-bold mb-4 text-green-600">Gemini Flash</h3>
              <p className="text-sm text-gray-500 mb-4">가장 빠른 버전</p>
              <ul className="text-gray-600 space-y-2">
                <li>• 빠른 응답 속도</li>
                <li>• 기본적인 다중모달 처리</li>
                <li>• 실시간 대화에 최적</li>
                <li>• 비용 효율적</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
              <h3 className="text-xl font-bold mb-4 text-orange-600">Gemini Pro</h3>
              <p className="text-sm text-gray-500 mb-4">균형잡힌 성능</p>
              <ul className="text-gray-600 space-y-2">
                <li>• 우수한 다중모달 능력</li>
                <li>• 복잡한 추론 작업</li>
                <li>• Google Workspace 통합</li>
                <li>• 코드 작성 및 분석</li>
                <li>• 실시간 검색 기능</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-600">Gemini Ultra</h3>
              <p className="text-sm text-gray-500 mb-4">최고 성능</p>
              <ul className="text-gray-600 space-y-2">
                <li>• 최고 수준의 다중모달 처리</li>
                <li>• 복잡한 문제 해결</li>
                <li>• 고급 분석 및 예측</li>
                <li>• 전문 분야 지식</li>
                <li>• 고급 코딩 및 디버깅</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Google Workspace 통합 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔗 Google Workspace 통합</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-600">📧 Gmail</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 이메일 작성 및 답변</li>
                  <li>• 이메일 요약 및 분석</li>
                  <li>• 스마트 답변 제안</li>
                  <li>• 이메일 분류 및 정리</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600">📄 Google Docs</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 문서 작성 및 편집</li>
                  <li>• 내용 요약 및 분석</li>
                  <li>• 스타일 및 톤 조정</li>
                  <li>• 실시간 협업 지원</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-orange-600">📊 Google Sheets</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 데이터 분석 및 시각화</li>
                  <li>• 수식 및 함수 생성</li>
                  <li>• 차트 및 그래프 해석</li>
                  <li>• 데이터 정리 및 변환</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-purple-600">📋 Google Slides</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 프레젠테이션 작성</li>
                  <li>• 슬라이드 내용 생성</li>
                  <li>• 디자인 및 레이아웃 제안</li>
                  <li>• 발표 스크립트 작성</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 프롬프트 팁 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 Gemini 최적화 프롬프트 팁</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-orange-600">1. 다중모달 활용</h3>
                <p className="text-gray-600">
                  &ldquo;이 이미지와 텍스트를 함께 분석해주세요&rdquo; 또는 &ldquo;차트를 보고 인사이트를 도출해주세요&rdquo;와 같이 다양한 형태의 정보를 함께 활용하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">2. 실시간 정보 요청</h3>
                <p className="text-gray-600">
                  &ldquo;최신 정보를 바탕으로&rdquo; 또는 &ldquo;현재 시장 상황을 고려하여&rdquo;와 같이 실시간 데이터 활용을 명시하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">3. 업무 컨텍스트 제공</h3>
                <p className="text-gray-600">
                  &ldquo;비즈니스 관점에서&rdquo; 또는 &ldquo;실무적으로 활용할 수 있도록&rdquo;과 같이 구체적인 업무 맥락을 제공하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">4. 단계별 분석 요청</h3>
                <p className="text-gray-600">
                  &ldquo;먼저 데이터를 분석하고, 그 다음 해결책을 제시해주세요&rdquo;와 같이 단계별 작업을 요청하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-orange-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Gemini 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Gemini를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=gemini"
              className="px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Gemini 프롬프트 보기
            </Link>
            <Link
              href="/ai-tools"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-200 font-semibold text-lg"
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
              href="/ai-tools/claude"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
            >
              <h3 className="font-semibold text-purple-600 mb-2">Claude</h3>
              <p className="text-gray-600 text-sm">논리적 분석과 긴 문서 처리에 특화</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
