"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "로그인 실패");
      // JWT 저장 (localStorage)
      localStorage.setItem("prompt_hub_token", data.token);
      // 성공시 메인 페이지로 이동
      router.push("/");
    } catch (err: any) {
      setError(err.message || "로그인 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-200 dark:border-gray-700"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">로그인</h1>
        {error && <div className="text-red-500 dark:text-red-400 text-sm text-center">{error}</div>}
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

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          계정이 없으신가요?{" "}
          <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
            회원가입하기
          </Link>
        </div>
        
        {/* 테스트 계정 정보 */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">테스트 계정</h3>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <div><strong className="text-gray-800 dark:text-gray-200">a@test.com</strong> / password123</div>
            <div><strong className="text-gray-800 dark:text-gray-200">b@test.com</strong> / password123</div>
            <div><strong className="text-gray-800 dark:text-gray-200">c@test.com</strong> / password123</div>
          </div>
        </div>
      </form>
    </div>
  );
} 