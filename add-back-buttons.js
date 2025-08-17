const fs = require('fs');
const path = require('path');

const aiToolsDir = 'src/app/ai-tools';
const backButtonTemplate = `      {/* 뒤로 가기 버튼 */}
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
      
      <div className="max-w-4xl mx-auto px-4 pb-16">`;

// 이미 수정된 파일들 (ChatGPT, Claude, Gemini는 이미 수정됨)
const alreadyModified = ['chatgpt', 'claude', 'gemini'];

// AI 툴 목록
const aiTools = [
  'perplexity', 'midjourney', 'dalle', 'stable-diffusion', 'runway', 'suno', 
  'elevenlabs', 'heygen', 'cursor', 'github-copilot', 'kiro', 'grammarly', 
  'notebooklm', 'slidesgo', 'airepoto', 'grok', 'scite', 'scholarcy'
];

function addBackButton(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 이미 뒤로 가기 버튼이 있는지 확인
    if (content.includes('뒤로 가기 버튼')) {
      console.log(`✅ ${path.basename(filePath)}: 이미 뒤로 가기 버튼이 있습니다.`);
      return;
    }
    
    // export default function 다음 줄에 뒤로 가기 버튼 추가
    const functionMatch = content.match(/export default function \w+Page\(\) \{\s+return \(/);
    if (!functionMatch) {
      console.log(`❌ ${path.basename(filePath)}: 함수 정의를 찾을 수 없습니다.`);
      return;
    }
    
    // 첫 번째 div 태그를 찾아서 뒤로 가기 버튼 추가
    const divMatch = content.match(/(<div className="min-h-screen[^>]*>)\s*(<div className="max-w-4xl mx-auto px-4 py-16">)/);
    if (!divMatch) {
      console.log(`❌ ${path.basename(filePath)}: div 구조를 찾을 수 없습니다.`);
      return;
    }
    
    const newContent = content.replace(
      divMatch[0],
      `${divMatch[1]}
      ${backButtonTemplate}`
    );
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ ${path.basename(filePath)}: 뒤로 가기 버튼이 추가되었습니다.`);
    
  } catch (error) {
    console.log(`❌ ${path.basename(filePath)}: ${error.message}`);
  }
}

// 메인 실행
console.log('🔧 AI 툴 페이지에 뒤로 가기 버튼 추가 시작...\n');

aiTools.forEach(tool => {
  const filePath = path.join(aiToolsDir, tool, 'page.tsx');
  if (fs.existsSync(filePath)) {
    addBackButton(filePath);
  } else {
    console.log(`❌ ${tool}: 파일이 존재하지 않습니다.`);
  }
});

console.log('\n🎉 뒤로 가기 버튼 추가 완료!');
