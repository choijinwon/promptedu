import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI 툴 - 2025년 최신 AI 도구 총정리 | 텍스트, 이미지, 비디오, 개발 AI 추천 | PromptEdu',
  description: '2025년 최신 AI 툴 총정리입니다. 텍스트 생성 AI, 이미지 생성 AI, 비디오/오디오 AI, 개발/코딩 AI, 업무 효율화 AI, 검색/연구 AI 등 용도별 TOP 추천 리스트를 제공합니다. ChatGPT, Claude, Gemini, Midjourney, DALL-E 등 최고의 AI 도구들을 만나보세요.',
  keywords: [
    'AI 툴',
    '2025년 AI 도구',
    '생성형 AI',
    '텍스트 생성 AI',
    '이미지 생성 AI',
    '비디오 AI',
    '개발 AI',
    '업무 효율화 AI',
    'ChatGPT',
    'Claude',
    'Gemini',
    'Midjourney',
    'DALL-E',
    'Cursor',
    'GitHub Copilot',
    'AI 추천',
    'AI 도구 비교',
    '무료 AI 툴'
  ],
  openGraph: {
    title: 'AI 툴 - 2025년 최신 AI 도구 총정리 | 용도별 TOP 추천 리스트',
    description: '2025년 최신 AI 툴 총정리입니다. 텍스트, 이미지, 비디오, 개발 AI 등 용도별 추천 리스트를 제공합니다.',
    url: 'https://promptedu.io/ai-tools',
  },
};

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          2025년 최신 AI 툴 총정리
        </h1>
        
        <p className="text-xl text-center text-gray-600 mb-12 leading-relaxed">
          용도별 TOP 추천 리스트로 최고의 AI 도구들을 만나보세요<br />
          텍스트 생성, 이미지 생성, 비디오/오디오, 개발/코딩, 업무 효율화, 검색/연구 AI까지
        </p>

        {/* 텍스트 생성 AI */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
            📝 텍스트 생성 AI
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-blue-700">ChatGPT</h3>
              <p className="text-gray-600 mb-4 text-sm">
                대화형 AI로 다양한 질문 답변, 음성 상호작용, 기본 데이터 분석에 최적
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료/유료</span>
                <Link href="/marketplace?category=chatgpt" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/chatgpt" 
                className="block w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-purple-700">Claude</h3>
              <p className="text-gray-600 mb-4 text-sm">
                긴 문서 요약 및 분석에 최적화, 논리적인 글쓰기 능력으로 보고서, 공식 문서, 연구자료 작성에 적합
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료/유료</span>
                <Link href="/marketplace?category=claude" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/claude" 
                className="block w-full text-center bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-orange-700">Gemini</h3>
              <p className="text-gray-600 mb-4 text-sm">
                데이터 분석, 제안서 작성, 자료 통합 등에서 실질적인 업무 효율화를 가능하게 하며, 최신 정보를 실시간으로 활용
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료/유료</span>
                <Link href="/marketplace?category=gemini" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/gemini" 
                className="block w-full text-center bg-orange-50 hover:bg-orange-100 text-orange-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-red-700">Perplexity</h3>
              <p className="text-gray-600 mb-4 text-sm">
                구글 검색 대체, 정확한 결과와 검증 가능한 출처 제공
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료/유료</span>
                <Link href="/marketplace?category=perplexity" className="text-red-600 hover:text-red-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/perplexity" 
                className="block w-full text-center bg-red-50 hover:bg-red-100 text-red-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>
          </div>
        </section>

        {/* 이미지 생성 AI */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-600">
            🎨 이미지 생성 AI
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-purple-700">Midjourney</h3>
              <p className="text-gray-600 mb-4 text-sm">
                예술적이고 독창적인 이미지 생성에 강점
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">유료</span>
                <Link href="/marketplace?category=midjourney" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/midjourney" 
                className="block w-full text-center bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-blue-700">DALL-E</h3>
              <p className="text-gray-600 mb-4 text-sm">
                텍스트 설명을 기반으로 이미지를 생성
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">유료</span>
                <Link href="/marketplace?category=dalle" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/dalle" 
                className="block w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-green-700">Stable Diffusion</h3>
              <p className="text-gray-600 mb-4 text-sm">
                무료 오픈소스 이미지 생성 AI
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료</span>
                <Link href="/marketplace?category=stable-diffusion" className="text-green-600 hover:text-green-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/stable-diffusion" 
                className="block w-full text-center bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>
          </div>
        </section>

        {/* 비디오/오디오 AI */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-red-600">
            🎬 비디오/오디오 AI
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-red-700">Runway</h3>
              <p className="text-gray-600 mb-4 text-sm">
                텍스트/이미지 입력을 기반으로 고품질 영상 생성 및 다양한 특수 효과 지원
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">유료</span>
                <Link href="/marketplace?category=runway" className="text-red-600 hover:text-red-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/runway" 
                className="block w-full text-center bg-red-50 hover:bg-red-100 text-red-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-blue-700">Suno</h3>
              <p className="text-gray-600 mb-4 text-sm">
                음악 생성 AI
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료/유료</span>
                <Link href="/marketplace?category=suno" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/suno" 
                className="block w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-purple-700">ElevenLabs</h3>
              <p className="text-gray-600 mb-4 text-sm">
                고품질 음성 합성 AI
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">유료</span>
                <Link href="/marketplace?category=elevenlabs" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/elevenlabs" 
                className="block w-full text-center bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-green-700">HeyGen</h3>
              <p className="text-gray-600 mb-4 text-sm">
                가상인물 영상 제작, 다국어 음성 변환에 활용
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">유료</span>
                <Link href="/marketplace?category=heygen" className="text-green-600 hover:text-green-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/heygen" 
                className="block w-full text-center bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>
          </div>
        </section>

        {/* 개발/코딩 AI */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-600">
            💻 개발/코딩 AI
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-green-700">Cursor</h3>
              <p className="text-gray-600 mb-4 text-sm">
                테크 지식이 부족한 사람도 코딩할 수 있게 해주는 도구, 최근 급부상한 AI 코딩 에디터로 실시간 디버깅 및 AI 어시스턴트 기능이 뛰어남
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료/유료</span>
                <Link href="/marketplace?category=cursor" className="text-green-600 hover:text-green-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/cursor" 
                className="block w-full text-center bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-blue-700">GitHub Copilot</h3>
              <p className="text-gray-600 mb-4 text-sm">
                OpenAI Codex를 기반으로 한 AI 도구로, 코드 작성 시 자동 완성을 제공
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">유료</span>
                <Link href="/marketplace?category=copilot" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/github-copilot" 
                className="block w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-purple-700">v0</h3>
              <p className="text-gray-600 mb-4 text-sm">
                목업을 넣으면 거의 완벽한 프로토타입을 생성
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료/유료</span>
                <Link href="/marketplace?category=v0" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/v0" 
                className="block w-full text-center bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>
          </div>
        </section>

        {/* 업무 효율화 AI */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">
            📊 업무 효율화 AI
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-orange-700">Grammarly</h3>
              <p className="text-gray-600 mb-4 text-sm">
                AI와 NLP를 사용하여 글쓰기 향상을 도와주는 편집 도구
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료/유료</span>
                <Link href="/marketplace?category=grammarly" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/grammarly" 
                className="block w-full text-center bg-orange-50 hover:bg-orange-100 text-orange-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-blue-700">NotebookLM</h3>
              <p className="text-gray-600 mb-4 text-sm">
                업로드한 데이터에 대한 유용한 정보와 AI 음성 개요를 제공하는 맞춤형 AI 어시스턴트
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료</span>
                <Link href="/marketplace?category=notebooklm" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/notebooklm" 
                className="block w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-purple-700">Slidesgo AI</h3>
              <p className="text-gray-600 mb-4 text-sm">
                프롬프트만 입력하면 발표자료를 자동으로 생성해주는 슬라이드 생성 AI
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료/유료</span>
                <Link href="/marketplace?category=slidesgo" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/slidesgo" 
                className="block w-full text-center bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-green-700">Airepoto</h3>
              <p className="text-gray-6 mb-4 text-sm">
                실시간 음성 인식 기반 회의록 작성, 참여자별 발언 내용 자동 정리, 핵심 내용 중심의 AI 요약
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">유료</span>
                <Link href="/marketplace?category=airepoto" className="text-green-600 hover:text-green-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/airepoto" 
                className="block w-full text-center bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>
          </div>
        </section>

        {/* 검색/연구 AI */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-teal-600">
            🔍 검색/연구 AI
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-teal-700">Grok</h3>
              <p className="text-gray-600 mb-4 text-sm">
                실시간 웹 검색 기능과 대화형 인터페이스를 갖춘 실시간 대응형 AI
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">유료</span>
                <Link href="/marketplace?category=grok" className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/grok" 
                className="block w-full text-center bg-teal-50 hover:bg-teal-100 text-teal-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-blue-700">Scite.ai</h3>
              <p className="text-gray-600 mb-4 text-sm">
                학술적 요구에 맞는 신뢰할 만한 AI 학술 연구 도구
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료/유료</span>
                <Link href="/marketplace?category=scite" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/scite" 
                className="block w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-purple-700">Scholarcy</h3>
              <p className="text-gray-600 mb-4 text-sm">
                논문, 보고서, 기사 등을 요약해주는 온라인 연구 도구
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">무료/유료</span>
                <Link href="/marketplace?category=scholarcy" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  프롬프트 보기 →
                </Link>
              </div>
              <Link 
                href="/ai-tools/scholarcy" 
                className="block w-full text-center bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                상세 소개 보기
              </Link>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            최고의 AI 툴과 함께하는 프롬프트
          </h2>
          <p className="text-xl mb-8 opacity-90">
            각 AI 툴에 최적화된 프롬프트를 PromptEdu에서 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg"
            >
              AI 툴 프롬프트 둘러보기
            </Link>
            <Link
              href="/ai-prompt"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold text-lg"
            >
              AI 프롬프트 가이드
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
