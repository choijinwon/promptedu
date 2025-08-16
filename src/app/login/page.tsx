"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiPost } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResendForm, setShowResendForm] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendResult, setResendResult] = useState<any>(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNeedsVerification(false);
    
    console.log('Attempting login with:', { email, password: password ? '[HIDDEN]' : 'MISSING' });
    
    try {
      const res = await apiPost("/api/auth/login", { email, password });
      
      console.log('Login response status:', res.status);
      console.log('Login response headers:', Object.fromEntries(res.headers.entries()));
      
      // 응답이 JSON인지 확인
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('❌ Response is not JSON:', contentType);
        const text = await res.text();
        console.error('❌ Response text:', text.substring(0, 200));
        throw new Error('서버에서 잘못된 응답을 받았습니다. API 엔드포인트를 확인해주세요.');
      }
      
      const data = await res.json();
      console.log('Login response data:', data);
      
      if (!res.ok) {
        // 이메일 인증이 필요한 경우
        if (data.error && data.error.includes('이메일 인증')) {
          setNeedsVerification(true);
          setResendEmail(email);
        }
        throw new Error(data.error || `로그인 실패 (${res.status})`);
      }
      
      if (!data.token) {
        throw new Error("토큰이 없습니다. 서버 오류가 발생했습니다.");
      }
      
      // JWT 저장 (localStorage)
      localStorage.setItem("token", data.token);
      console.log('Token saved to localStorage');
      
      // 성공시 메인 페이지로 이동
      router.push("/");
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || "로그인 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!resendEmail) {
      alert('이메일 주소를 입력해주세요.');
      return;
    }

    setIsResending(true);
    setResendResult(null);

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: resendEmail
        }),
      });

      const data = await response.json();
      setResendResult(data);
      
      if (response.ok) {
        alert('재인증 이메일이 발송되었습니다. 이메일을 확인해주세요.');
        setShowResendForm(false);
        setNeedsVerification(false);
      } else {
        alert(data.error || '이메일 재발송에 실패했습니다.');
      }
    } catch (error) {
      setResendResult({ error: '재발송 중 오류가 발생했습니다.' });
      alert('이메일 재발송 중 오류가 발생했습니다.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">로그인</h1>
        
        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm text-center">
            {error}
            {needsVerification && (
              <div className="mt-2">
                <p className="text-blue-600 dark:text-blue-400">
                  이메일 인증이 필요합니다. 재인증 이메일을 받으시겠습니까?
                </p>
                <button
                  onClick={() => setShowResendForm(true)}
                  className="mt-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  📧 재인증 이메일 받기
                </button>
              </div>
            )}
          </div>
        )}

        {/* 이메일 재인증 폼 */}
        {showResendForm && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📧 이메일 재인증</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  재인증할 이메일 주소
                </label>
                <input
                  type="email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleResendVerification}
                  disabled={isResending || !resendEmail}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isResending ? '재발송 중...' : '📧 재인증 이메일 발송'}
                </button>
                <button
                  onClick={() => setShowResendForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
            
            {/* 재발송 결과 */}
            {resendResult && (
              <div className="mt-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">재발송 결과:</h4>
                <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap overflow-auto">
                  {JSON.stringify(resendResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">이메일</label>
            <input
              type="email"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">비밀번호</label>
            <input
              type="password"
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          계정이 없으신가요?{" "}
          <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
            회원가입하기
          </Link>
        </div>

        {/* 빠른 로그인 버튼 (개발용) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                setEmail('test_local@example.com');
                setPassword('password123');
              }}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 text-sm"
            >
              🚀 빠른 로그인 (test_local@example.com)
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('a@test.com');
                setPassword('password123');
              }}
              className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 text-sm"
            >
              🚀 빠른 로그인 (a@test.com)
            </button>
          </div>
        )}
        
        {/* 테스트 계정 정보 */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">테스트 계정</h3>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <div><strong className="text-gray-800 dark:text-gray-200">a@test.com</strong> / password123</div>
            <div><strong className="text-gray-800 dark:text-gray-200">b@test.com</strong> / password123</div>
            <div><strong className="text-gray-800 dark:text-gray-200">c@test.com</strong> / password123</div>
          </div>
        </div>
      </div>
    </div>
  );
} 