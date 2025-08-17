import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NotebookLM - Google 맞춤형 AI 어시스턴트 | 문서 분석, 연구 도우미, 개인화된 AI | PromptEdu',
  description: 'NotebookLM은 Google의 맞춤형 AI 어시스턴트로, 업로드한 문서를 분석하고 유용한 정보를 제공합니다. 연구, 학습, 문서 분석에 최적화된 AI 도구의 특징, 사용법, 최적화된 프롬프트를 PromptEdu에서 만나보세요.',
  keywords: [
    'NotebookLM',
    'Google AI',
    '맞춤형 AI 어시스턴트',
    '문서 분석',
    '연구 도우미',
    '개인화된 AI',
    'NotebookLM AI',
    'NotebookLM 프롬프트',
    'AI 도구',
    '생성형 AI'
  ],
  openGraph: {
    title: 'NotebookLM - Google 맞춤형 AI 어시스턴트 | 문서 분석과 연구 도우미',
    description: 'NotebookLM은 Google의 맞춤형 AI 어시스턴트로, 업로드한 문서를 분석하고 유용한 정보를 제공합니다.',
    url: 'https://promptedu.io/ai-tools/notebooklm',
  },
};

export default function NotebookLMPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            NotebookLM
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Google의 맞춤형 AI 어시스턴트
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              무료
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              문서 분석
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              연구 도우미
            </span>
          </div>
        </div>

        {/* 주요 특징 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚀 주요 특징</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📄 문서 업로드 및 분석</h3>
              <p className="text-gray-600">
                PDF, Word, PowerPoint 등 다양한 형식의 문서를 업로드하여 AI가 내용을 분석하고 이해할 수 있도록 합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">🤖 맞춤형 AI 어시스턴트</h3>
              <p className="text-gray-600">
                업로드한 문서를 기반으로 개인화된 AI 어시스턴트를 생성하여 해당 문서에 특화된 질문과 답변을 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔍 정확한 정보 제공</h3>
              <p className="text-gray-600">
                업로드된 문서의 내용을 기반으로 정확하고 신뢰할 수 있는 정보를 제공하며, 출처를 명확히 표시합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">📝 노트 작성 및 정리</h3>
              <p className="text-gray-600">
                AI와의 대화를 통해 노트를 작성하고, 중요한 정보를 정리하여 효율적인 학습과 연구를 지원합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 사용 사례 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">💡 주요 사용 사례</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">🎓 학술 연구 및 학습</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 논문 및 연구 자료 분석</li>
                <li>• 복잡한 개념 설명 요청</li>
                <li>• 연구 질문 생성 및 검토</li>
                <li>• 학술 자료 요약 및 정리</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">💼 비즈니스 및 업무</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 보고서 및 제안서 분석</li>
                <li>• 회의 자료 검토 및 요약</li>
                <li>• 업무 매뉴얼 이해 및 적용</li>
                <li>• 프로젝트 문서 관리</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">📚 개인 학습 및 자기계발</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 책 및 학습 자료 분석</li>
                <li>• 개인 노트 정리 및 요약</li>
                <li>• 학습 목표 설정 및 추적</li>
                <li>• 지식 베이스 구축</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 지원 파일 형식 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📁 지원 파일 형식</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">📄 문서 형식</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• PDF 파일</li>
                <li>• Microsoft Word (.docx)</li>
                <li>• Microsoft PowerPoint (.pptx)</li>
                <li>• 텍스트 파일 (.txt)</li>
                <li>• Google Docs</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">📊 데이터 형식</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• CSV 파일</li>
                <li>• Excel 파일 (.xlsx)</li>
                <li>• JSON 파일</li>
                <li>• 웹페이지 URL</li>
                <li>• 이미지 파일 (OCR 지원)</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">🔧 업로드 제한</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 파일 크기: 최대 50MB</li>
                <li>• 노트북당 최대 20개 파일</li>
                <li>• 총 텍스트 길이: 최대 200만 토큰</li>
                <li>• 지원 언어: 영어, 한국어 등</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">🔄 실시간 동기화</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Google Drive 연동</li>
                <li>• 실시간 문서 업데이트</li>
                <li>• 버전 관리</li>
                <li>• 협업 기능</li>
              </ul>
            </div>
          </div>
        </section>

        {/* AI 기능 상세 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🤖 AI 기능 상세</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">🔍 문서 이해 및 분석</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 문서 구조 파악</li>
                <li>• 핵심 개념 추출</li>
                <li>• 키워드 및 주제 분석</li>
                <li>• 문서 간 연결성 분석</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-600">💬 대화형 인터페이스</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자연어 질문 응답</li>
                <li>• 맥락 이해 대화</li>
                <li>• 후속 질문 지원</li>
                <li>• 대화 히스토리 관리</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">📝 노트 생성 및 정리</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 자동 노트 생성</li>
                <li>• 요약 및 정리</li>
                <li>• 구조화된 정보 제공</li>
                <li>• 검색 가능한 노트</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">🎯 개인화 및 학습</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• 사용 패턴 학습</li>
                <li>• 맞춤형 제안</li>
                <li>• 학습 진도 추적</li>
                <li>• 개인 지식 그래프</li>
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
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600">📁 문서 업로드</h3>
                  <p className="text-gray-600">
                    분석하고 싶은 문서를 NotebookLM에 업로드합니다. PDF, Word, PowerPoint 등 다양한 형식을 지원합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-600">🤖 AI 분석</h3>
                  <p className="text-gray-600">
                    AI가 업로드된 문서를 분석하여 내용을 이해하고, 핵심 개념과 정보를 추출합니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-600">💬 질문 및 대화</h3>
                  <p className="text-gray-600">
                    문서 내용에 대해 질문하고, AI와 대화를 통해 더 깊은 이해를 얻습니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-indigo-600">📝 노트 생성</h3>
                  <p className="text-gray-600">
                    대화를 통해 얻은 정보를 바탕으로 노트를 생성하고, 중요한 내용을 정리합니다.
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
                <h3 className="text-lg font-semibold mb-2 text-blue-600">1. 구체적인 질문하기</h3>
                <p className="text-gray-600">
                  &ldquo;이 문서의 주요 개념을 요약해줘&rdquo;보다는 &ldquo;이 문서에서 다루는 3가지 핵심 이론과 각각의 적용 사례를 설명해줘&rdquo;와 같이 구체적으로 질문하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">2. 맥락을 고려한 질문</h3>
                <p className="text-gray-600">
                  &ldquo;이 내용이 실제 업무에 어떻게 적용될 수 있을까?&rdquo;와 같이 문서의 내용을 실제 상황에 연결하는 질문을 해보세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-600">3. 비교 및 분석 요청</h3>
                <p className="text-gray-600">
                  &ldquo;이 문서의 접근 방식과 다른 방법론들을 비교해보고 장단점을 분석해줘&rdquo;와 같이 비교 분석을 요청하세요.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-indigo-600">4. 실용적인 활용 방안</h3>
                <p className="text-gray-600">
                  &ldquo;이 내용을 바탕으로 프로젝트 계획을 세워보고, 각 단계별로 필요한 리소스를 정리해줘&rdquo;와 같이 실용적인 활용 방안을 요청하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            NotebookLM 최적화 프롬프트 모음
          </h2>
          <p className="text-xl mb-8 opacity-90">
            NotebookLM을 더욱 효과적으로 활용할 수 있는 프롬프트들을 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace?category=notebooklm"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              NotebookLM 프롬프트 보기
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
              href="/ai-tools/grammarly"
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
            >
              <h3 className="font-semibold text-green-600 mb-2">Grammarly</h3>
              <p className="text-gray-600 text-sm">AI 글쓰기 도우미</p>
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
