"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiPost } from "@/lib/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [showResendForm, setShowResendForm] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendResult, setResendResult] = useState<any>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    // 비밀번호 길이 확인
    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      setLoading(false);
      return;
    }

    try {
      const res = await apiPost("/api/auth/register", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        name: formData.name,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "회원가입 실패");
      
      // 회원가입 성공
      setSuccess(true);
      setRegisteredEmail(formData.email);
      
      // 개발 환경에서만 토큰 저장 (실제로는 이메일 인증 후에 저장)
      if (process.env.NODE_ENV === 'development' && data.debug?.verificationLink) {
        console.log('🔗 Development verification link:', data.debug.verificationLink);
      }
      
    } catch (err: any) {
      setError(err.message || "회원가입 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!registeredEmail) {
      alert('이메일 주소가 없습니다.');
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
          email: registeredEmail
        }),
      });

      const data = await response.json();
      setResendResult(data);
      
      if (response.ok) {
        alert('재인증 이메일이 발송되었습니다. 이메일을 확인해주세요.');
        setShowResendForm(false);
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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">회원가입 완료!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>{registeredEmail}</strong>로 인증 이메일을 발송했습니다.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">다음 단계:</h3>
              <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 text-left">
                <li>1. 이메일함을 확인해주세요</li>
                <li>2. &quot;이메일 인증하기&quot; 버튼을 클릭하세요</li>
                <li>3. 인증 완료 후 로그인하실 수 있습니다</li>
              </ol>
            </div>

            {/* 이메일 재인증 섹션 */}
            {!showResendForm ? (
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  이메일을 받지 못하셨나요?
                </p>
                <button
                  onClick={() => setShowResendForm(true)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📧 재인증 이메일 받기
                </button>
              </div>
            ) : (
              <div className="mb-6 border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📧 이메일 재인증</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      재인증할 이메일 주소
                    </label>
                    <input
                      type="email"
                      value={registeredEmail}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleResendVerification}
                      disabled={isResending}
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

            <div className="space-y-3">
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                로그인으로 이동
              </button>
              <button
                onClick={() => {
                  setSuccess(false);
                  setFormData({
                    email: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                    name: "",
                  });
                }}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                다른 계정으로 가입
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              <p>이메일이 오지 않았나요?</p>
              <p>스팸함을 확인하거나 잠시 후 다시 시도해주세요.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">회원가입</h1>
        {error && <div className="text-red-500 dark:text-red-400 text-sm text-center">{error}</div>}
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">이메일</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={formData.email}
            onChange={handleChange}
            required
            autoFocus
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">사용자명</label>
          <input
            type="text"
            name="username"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="사용자명을 입력하세요"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            영문, 숫자, 언더스코어(_)만 사용 가능
          </p>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">이름</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">비밀번호</label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="비밀번호를 입력하세요"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            최소 6자 이상
          </p>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
          disabled={loading}
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            로그인하기
          </Link>
        </div>
      </form>
    </div>
  );
} 