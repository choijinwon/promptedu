"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 클라이언트 사이드 검증
    if (!username.trim()) {
      setError("아이디를 입력해주세요.");
      return;
    }
    
    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    console.log('Submitting login form:', { username, password: password ? '[HIDDEN]' : 'undefined' });
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username,
          password 
        }),
      });
      
      const data = await res.json();
      console.log('Login response:', { status: res.status, data });
      
      if (!res.ok) {
        throw new Error(data.error || "로그인 실패");
      }

      // JWT 저장
      localStorage.setItem("prompt_hub_token", data.token);
      localStorage.setItem("prompt_hub_user_role", data.user.role);
      
      console.log('Login successful, redirecting to dashboard...');
      
      // 관리자 대시보드로 이동
      router.push("/admin/dashboard");
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || "로그인 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            관리자 로그인
          </h1>
          <p className="text-gray-600">
            관리자 아이디와 비밀번호를 입력하세요
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              관리자 아이디
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 text-sm block"
          >
            메인 페이지로 돌아가기
          </Link>
          <Link 
            href="/admin/debug" 
            className="text-gray-500 hover:text-gray-700 text-xs block"
          >
            디버그 정보 보기
          </Link>
        </div>
        
        {/* 테스트 계정 정보 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">테스트 계정</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <div><strong>아이디:</strong> admin</div>
            <div><strong>비밀번호:</strong> password123</div>
          </div>
        </div>
      </div>
    </div>
  );
} 