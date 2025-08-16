"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already-verified'>('loading');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [testEmail, setTestEmail] = useState('');
  const [testUsername, setTestUsername] = useState('');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [resendEmail, setResendEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendResult, setResendResult] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setStatus('error');
      setMessage('인증 토큰이 없습니다.');
      return;
    }
    verifyEmail(tokenParam);
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`);
      const data = await response.json();
      
      if (response.ok) {
        if (data.alreadyVerified) {
          setStatus('already-verified');
          setMessage('이미 인증이 완료된 계정입니다.');
        } else {
          setStatus('success');
          setMessage(data.message);
          setUser(data.user);
          
          // JWT 토큰 저장
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        }
      } else {
        setStatus('error');
        setMessage(data.error || '인증에 실패했습니다.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('인증 중 오류가 발생했습니다.');
    }
  };

  const handleResendEmail = async () => {
    if (!resendEmail) {
      alert('이메일 주소를 입력해주세요.');
      return;
    }

    setIsResending(true);
    setResendResult(null);

    try {
      const response = await fetch('/api/auth/resend-email', {
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
        alert('인증 이메일이 재발송되었습니다. 이메일을 확인해주세요.');
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

  const handleTestEmail = async () => {
    if (!testEmail || !testUsername) {
      alert('이메일과 사용자명을 입력해주세요.');
      return;
    }

    setIsSendingTest(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testEmail,
          username: testUsername,
          password: 'testpassword123',
          name: '테스트 사용자'
        }),
      });

      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({ error: '테스트 중 오류가 발생했습니다.' });
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleDirectTest = async () => {
    setIsSendingTest(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          username: 'testuser',
          password: 'testpassword123',
          name: '직접 테스트'
        }),
      });

      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({ error: '테스트 중 오류가 발생했습니다.' });
    } finally {
      setIsSendingTest(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">이메일 인증 중...</h1>
            <p className="text-gray-600 dark:text-gray-400">잠시만 기다려주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">인증 완료!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
            {user && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>사용자:</strong> {user.name} ({user.email})
                </p>
              </div>
            )}
            <div className="space-y-3">
              <Link href="/" className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                홈으로 이동
              </Link>
              <Link href="/login" className="block w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                로그인하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'already-verified') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">이미 인증됨</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
            <div className="space-y-3">
              <Link href="/login" className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                로그인하기
              </Link>
              <Link href="/" className="block w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                홈으로 이동
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl space-y-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">인증 실패</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        </div>

        {/* 이메일 재발송 섹션 */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📧 이메일 재발송</h2>
          
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                재발송할 이메일 주소
              </label>
              <input
                type="email"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
                placeholder="your-email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              onClick={handleResendEmail}
              disabled={isResending || !resendEmail}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isResending ? '재발송 중...' : '📧 인증 이메일 재발송'}
            </button>
          </div>

          {/* 재발송 결과 */}
          {resendResult && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">재발송 결과:</h3>
              <pre className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(resendResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* 이메일 발송 테스트 섹션 */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🧪 이메일 발송 테스트</h2>
          
          {/* 직접 테스트 버튼 */}
          <div className="mb-4">
            <button
              onClick={handleDirectTest}
              disabled={isSendingTest}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isSendingTest ? '테스트 중...' : '🚀 직접 테스트 (test@example.com)'}
            </button>
          </div>

          {/* 커스텀 테스트 */}
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                테스트 이메일
              </label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                테스트 사용자명
              </label>
              <input
                type="text"
                value={testUsername}
                onChange={(e) => setTestUsername(e.target.value)}
                placeholder="testuser"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              onClick={handleTestEmail}
              disabled={isSendingTest || !testEmail || !testUsername}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSendingTest ? '테스트 중...' : '📧 커스텀 이메일 테스트'}
            </button>
          </div>

          {/* 테스트 결과 */}
          {testResult && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">테스트 결과:</h3>
              <pre className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* 액션 버튼들 */}
        <div className="border-t pt-6">
          <div className="space-y-3">
            <Link href="/register" className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center">
              새 계정 만들기
            </Link>
            <Link href="/login" className="block w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-center">
              로그인하기
            </Link>
            <Link href="/" className="block w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-center">
              홈으로 이동
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
