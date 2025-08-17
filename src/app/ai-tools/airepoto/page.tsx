import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Airepoto - 실시간 음성 인식 회의록 작성 | AI 회의 요약, 참여자별 발언 정리 | PromptEdu',
  description: 'Airepoto는 실시간 음성 인식 기반 회의록 작성 도구로, 참여자별 발언 내용을 자동으로 정리하고 핵심 내용 중심의 AI 요약을 제공합니다. 회의 효율성을 극대화하는 AI 도구의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'Airepoto',
    '실시간 음성 인식',
    '회의록 작성',
    'AI 회의 요약',
    '참여자별 발언 정리',
    'Airepoto AI',
    'Airepoto 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'Airepoto - 실시간 음성 인식 회의록 작성 | AI 회의 요약',
    description: 'Airepoto는 실시간 음성 인식 기반 회의록 작성 도구로, 참여자별 발언 내용을 자동으로 정리하고 핵심 내용 중심의 AI 요약을 제공합니다.',
    url: 'https://promptedu.io/ai-tools/airepoto',
  },
};

export default function AirepotoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
            <span className="text-3xl">🎤</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Airepoto
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            실시간 음성 인식 회의록 작성
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              음성 인식
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              회의록 작성
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎤 실시간 음성 인식</h3>
              <p className="text-gray-600">
                고정밀 음성 인식 기술을 통해 회의 참여자들의 발언을 실시간으로 텍스트로 변환하여 정확한 회의록을 작성합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">👥 참여자별 발언 정리</h3>
              <p className="text-gray-600">
                각 참여자의 발언을 개별적으로 식별하고 정리하여 누가 무엇을 말했는지 명확하게 구분된 회의록을 생성합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🧠 AI 기반 요약</h3>
              <p className="text-gray-600">
                회의 내용을 AI가 분석하여 핵심 내용 중심의 요약을 제공하고, 중요한 결정사항과 액션 아이템을 자동으로 추출합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">📱 크로스 플랫폼 지원</h3>
              <p className="text-gray-600">
                웹 브라우저, 모바일 앱, 데스크톱 앱 등 다양한 플랫폼에서 사용할 수 있어 언제 어디서나 회의록을 작성할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">💼 기업 회의 및 미팅</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 경영진 회의 및 이사회</li>
                <li>• 부서별 정기 미팅</li>
                <li>• 프로젝트 진행 상황 회의</li>
                <li>• 고객 미팅 및 제안서 발표</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">🎓 교육 및 학술</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 강의 및 세미나</li>
                <li>• 학술 컨퍼런스</li>
                <li>• 연구팀 미팅</li>
                <li>• 학생 그룹 프로젝트</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">📋 인터뷰 및 조사</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 취업 면접</li>
                <li>• 시장 조사 인터뷰</li>
                <li>• 사용자 리서치</li>
                <li>• 전문가 인터뷰</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 기능 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🔧 지원 기능</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎤 음성 인식 기능</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 다국어 음성 인식</li>
                <li>• 화자 분리 및 식별</li>
                <li>• 노이즈 제거</li>
                <li>• 실시간 전사</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📝 회의록 작성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자동 회의록 생성</li>
                <li>• 참여자별 발언 정리</li>
                <li>• 시간별 타임스탬프</li>
                <li>• 편집 및 수정 기능</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🤖 AI 분석 및 요약</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 핵심 내용 추출</li>
                <li>• 결정사항 자동 정리</li>
                <li>• 액션 아이템 생성</li>
                <li>• 키워드 및 주제 분석</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">💾 내보내기 및 공유</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• PDF 형식 내보내기</li>
                <li>• Word 문서 변환</li>
                <li>• 팀원과 공유</li>
                <li>• 클라우드 동기화</li>
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
                <li>• 한국어 (고정밀 인식)</li>
                <li>• 영어 (미국식, 영국식)</li>
                <li>• 일본어</li>
                <li>• 중국어 (간체, 번체)</li>
                <li>• 추가 언어 지원 예정</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">💻 지원 플랫폼</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 웹 브라우저 (Chrome, Safari, Firefox)</li>
                <li>• iOS 앱 (iPhone, iPad)</li>
                <li>• Android 앱</li>
                <li>• Windows/Mac 데스크톱 앱</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔗 통합 서비스</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Zoom, Teams, Google Meet</li>
                <li>• Slack, Microsoft Teams</li>
                <li>• Google Drive, Dropbox</li>
                <li>• Notion, Confluence</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">📊 분석 도구</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 회의 통계 및 분석</li>
                <li>• 참여도 측정</li>
                <li>• 발언 시간 분석</li>
                <li>• 주제별 분류</li>
              </ul>
            </div>
          </div>
        </section>

        {/* AI 기능 상세 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🤖 AI 기능 상세</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🎯 핵심 내용 추출</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 중요 결정사항 식별</li>
                <li>• 핵심 논의 주제 추출</li>
                <li>• 키워드 및 용어 분석</li>
                <li>• 우선순위별 정리</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📋 액션 아이템 생성</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 할 일 자동 추출</li>
                <li>• 담당자 지정</li>
                <li>• 마감일 설정</li>
                <li>• 진행 상황 추적</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📊 회의 분석</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 참여도 분석</li>
                <li>• 발언 패턴 분석</li>
                <li>• 회의 효율성 측정</li>
                <li>• 개선점 제안</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">🔄 자동화 워크플로우</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 회의록 자동 생성</li>
                <li>• 팀원 자동 공유</li>
                <li>• 캘린더 연동</li>
                <li>• 후속 미팅 스케줄링</li>
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
                  <h3 className="text-lg font-semibold mb-2 text-green-600">🎤 회의 시작 및 녹음</h3>
                  <p className="text-gray-600">
                    Airepoto를 실행하고 회의를 시작합니다. 실시간으로 음성이 텍스트로 변환되기 시작합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600">👥 참여자별 발언 정리</h3>
                  <p className="text-gray-600">
                    각 참여자의 발언이 개별적으로 식별되고 정리되어 실시간으로 회의록이 작성됩니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-600">🤖 AI 분석 및 요약</h3>
                  <p className="text-gray-600">
                    회의가 끝나면 AI가 전체 내용을 분석하여 핵심 내용, 결정사항, 액션 아이템을 자동으로 추출합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-indigo-600">📤 공유 및 후속 작업</h3>
                  <p className="text-gray-600">
                    완성된 회의록을 팀원들과 공유하고, 액션 아이템을 추적하여 후속 작업을 진행합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 프롬프트 팁 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 효과적인 사용 팁</h2>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">1. 최적의 음성 환경 조성</h3>
                <p className="text-gray-600">
                  &ldquo;조용한 환경에서 사용하고, 마이크와의 거리를 적절히 유지하세요. 여러 명이 참여하는 경우 각자의 발언이 명확하게 구분되도록 주의하세요.&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">2. 참여자 정보 미리 설정</h3>
                <p className="text-gray-600">
                  &ldquo;회의 시작 전에 참여자들의 이름과 역할을 미리 입력해두면 더 정확한 화자 분리가 가능하고, 회의록 작성 시 참여자별로 명확하게 구분됩니다.&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">3. 회의 구조화</h3>
                <p className="text-gray-600">
                  &ldquo;회의 시작 시 안건을 명확히 하고, 각 주제별로 구분하여 논의하세요. 이렇게 하면 AI가 더 체계적으로 내용을 정리하고 요약할 수 있습니다.&rdquo;
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-indigo-600">4. 정기적인 검토 및 피드백</h3>
                <p className="text-gray-600">
                  &ldquo;생성된 회의록을 정기적으로 검토하고, AI에게 피드백을 제공하세요. 이를 통해 더 정확하고 유용한 회의록을 생성할 수 있습니다.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Airepoto 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Airepoto를 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=airepoto"
              className="px-8 py-4 bg-white text-green-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              Airepoto 프롬프트 보기
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
              href="/ai-tools/slidesgo"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
            >
              <h3 className="font-semibold text-purple-600 mb-2">Slidesgo AI</h3>
              <p className="text-gray-600 text-sm">AI 기반 프레젠테이션 생성</p>
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
