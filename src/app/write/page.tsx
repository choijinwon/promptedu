"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface FormValues {
  title: string;
  description: string;
  content: string;
  price: number;
  categoryId: string;
  tags: string;
  isPublic: boolean;
  type: 'MARKETPLACE' | 'SHARED';
}

export default function WritePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      content: "",
      price: 0,
      categoryId: "",
      tags: "",
      isPublic: true,
      type: 'MARKETPLACE',
    }
  });

  // 인증 체크
  useEffect(() => {
    const token = localStorage.getItem("prompt_hub_token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  // 카테고리 불러오기
  useEffect(() => {
    fetch("/api/categories")
      .then(res => {
        if (!res.ok) {
          throw new Error("카테고리를 불러오는데 실패했습니다.");
        }
        return res.json();
      })
      .then(data => setCategories(data.categories || []))
      .catch(err => {
        console.error("카테고리 로딩 에러:", err);
        setError("카테고리를 불러오는데 실패했습니다.");
      });
  }, []);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("prompt_hub_token");
      if (!token) {
        router.replace("/login");
        return;
      }

      // 태그 처리 개선
      const processedTags = data.tags 
        ? data.tags.split(",").map(t => t.trim()).filter(Boolean)
        : [];

      const res = await fetch("/api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          tags: processedTags,
        }),
      });
      
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "등록 실패");
      }
      
      setSuccess("프롬프트가 등록되었습니다! 관리자 승인 후 공개됩니다.");
      reset();
    } catch (err: any) {
      console.error("프롬프트 등록 에러:", err);
      setError(err.message || "등록 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-12">
      <div className="max-w-2xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            메인 페이지로 돌아가기
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-xl shadow-lg w-full space-y-6"
        >
          <h1 className="text-2xl font-bold text-center">프롬프트 등록</h1>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        <div>
          <label className="block mb-1 text-sm font-medium">카테고리</label>
          <select
            {...register("categoryId", { required: true })}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            defaultValue=""
            disabled={categories.length === 0}
          >
            <option value="" disabled>
              {categories.length === 0 ? "카테고리 로딩 중..." : "카테고리 선택"}
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <span className="text-xs text-red-500">카테고리를 선택하세요</span>}
          {categories.length === 0 && <span className="text-xs text-blue-500">카테고리를 불러오는 중입니다...</span>}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">제목</label>
          <input
            {...register("title", { required: true })}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="프롬프트 제목"
          />
          {errors.title && <span className="text-xs text-red-500">제목을 입력하세요</span>}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">설명</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="프롬프트 설명"
            rows={2}
          />
          {errors.description && <span className="text-xs text-red-500">설명을 입력하세요</span>}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">본문(프롬프트 내용)</label>
          <textarea
            {...register("content", { required: true })}
            className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="실제 프롬프트 텍스트"
            rows={4}
          />
          {errors.content && <span className="text-xs text-red-500">본문을 입력하세요</span>}
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium">가격(원)</label>
            <input
              type="number"
              {...register("price", { required: true, min: 0 })}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0 = 무료"
              min={0}
            />
            {errors.price && <span className="text-xs text-red-500">가격을 입력하세요</span>}
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium">태그(쉼표로 구분)</label>
            <input
              {...register("tags")}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="예: 블로그,SEO,마케팅"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">프롬프트 타입</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                {...register("type")}
                value="MARKETPLACE"
                className="mr-2"
                defaultChecked
              />
              <span className="text-sm">마켓플레이스</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...register("type")}
                value="SHARED"
                className="mr-2"
              />
              <span className="text-sm">공유 프롬프트 (무료)</span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            마켓플레이스: 유료/무료 판매 가능. 공유 프롬프트: 무료로만 공유됩니다.
          </p>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">공개 설정</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                {...register("isPublic")}
                value="true"
                className="mr-2"
                defaultChecked
              />
              <span className="text-sm">공개</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...register("isPublic")}
                value="false"
                className="mr-2"
              />
              <span className="text-sm">비공개</span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            공개: 다른 사용자들이 볼 수 있습니다. 비공개: 나만 볼 수 있습니다.
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "등록 중..." : "프롬프트 등록"}
        </button>
      </form>
      </div>
    </div>
  );
} 