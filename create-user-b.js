const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// .env 파일 로드
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env 파일이 없습니다.');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};

  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        let value = valueParts.join('=');
        // 따옴표 제거
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        env[key.trim()] = value.trim();
      }
    }
  });

  return env;
}

const env = loadEnv();

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ 환경 변수가 설정되지 않았습니다.');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅' : '❌');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createUserB() {
  console.log('🔄 b@test.com 사용자 생성 시작...');
  
  try {
    // 사용자 데이터
    const userData = {
      id: 'b2c3d4e5-f6g7-8901-hijk-lmnopqrstuvw', // 새로운 UUID
      email: 'b@test.com',
      username: 'btest',
      password: 'password123', // 실제 비밀번호
      name: '테스트 사용자 B',
      role: 'USER',
      is_verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('📝 사용자 데이터:', {
      id: userData.id,
      email: userData.email,
      username: userData.username,
      name: userData.name,
      role: userData.role
    });

    // 사용자 생성
    const { data, error } = await supabase
      .from('users')
      .insert([userData]);

    if (error) {
      console.log('❌ 사용자 생성 실패:', error.message);
      console.log('❌ 에러 코드:', error.code);
      console.log('❌ 에러 상세:', error.details);
      return;
    }

    console.log('✅ 사용자 생성 성공!');
    console.log('📊 생성된 사용자:', data);

    // 생성된 사용자 확인
    const { data: checkData, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'b@test.com');

    if (checkError) {
      console.log('❌ 사용자 확인 실패:', checkError.message);
    } else {
      console.log('✅ 사용자 확인 성공:', checkData);
    }

  } catch (error) {
    console.log('💥 예외 발생:', error.message);
  }
}

createUserB();
