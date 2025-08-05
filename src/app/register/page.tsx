"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          name: formData.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "회원가입 실패");
      
      // JWT 저장
      localStorage.setItem("prompt_hub_token", data.token);
      // 성공시 글쓰기 페이지로 이동
      router.push("/write");
    } catch (err: any) {
      setError(err.message || "회원가입 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">회원가입</h1>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        
        <div>
          <label className="block mb-1 text-sm font-medium">이메일</label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">사용자명</label>
          <input
            type="text"
            name="username"
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">이름</label>
          <input
            type="text"
            name="name"
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">비밀번호</label>
          <input
            type="password"
            name="password"
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>

        <div className="text-center text-sm text-gray-600">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            로그인하기
          </Link>
        </div>
      </form>
    </div>
  );
} 