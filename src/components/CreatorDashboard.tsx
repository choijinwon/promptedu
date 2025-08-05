"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  EyeIcon,
  StarIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface CreatorStats {
  totalPrompts: number;
  totalSales: number;
  totalViews: number;
  averageRating: number;
  monthlyRevenue: number;
}

interface CreatorPrompt {
  id: string;
  title: string;
  price: number;
  sales: number;
  views: number;
  rating: number;
  status: "active" | "draft" | "pending";
  createdAt: string;
}

const sampleStats: CreatorStats = {
  totalPrompts: 12,
  totalSales: 156,
  totalViews: 2840,
  averageRating: 4.7,
  monthlyRevenue: 1250000,
};

const samplePrompts: CreatorPrompt[] = [
  {
    id: "1",
    title: "고품질 블로그 글 작성 프롬프트",
    price: 15000,
    sales: 45,
    views: 320,
    rating: 4.8,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "이메일 마케팅 자동화 프롬프트",
    price: 25000,
    sales: 32,
    views: 280,
    rating: 4.9,
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "코드 리뷰 및 최적화 프롬프트",
    price: 20000,
    sales: 28,
    views: 190,
    rating: 4.7,
    status: "active",
    createdAt: "2024-01-05",
  },
  {
    id: "4",
    title: "새로운 프롬프트 (초안)",
    price: 18000,
    sales: 0,
    views: 0,
    rating: 0,
    status: "draft",
    createdAt: "2024-01-20",
  },
];

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "활성";
      case "draft":
        return "초안";
      case "pending":
        return "검토중";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">크리에이터 대시보드</h1>
        <p className="text-gray-600">프롬프트를 관리하고 성과를 확인하세요</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <PlusIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">총 프롬프트</p>
              <p className="text-2xl font-bold text-gray-900">{sampleStats.totalPrompts}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">총 판매</p>
              <p className="text-2xl font-bold text-gray-900">{sampleStats.totalSales}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <EyeIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">총 조회수</p>
              <p className="text-2xl font-bold text-gray-900">{sampleStats.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <StarIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">평균 평점</p>
              <p className="text-2xl font-bold text-gray-900">{sampleStats.averageRating}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">월 수익</p>
              <p className="text-2xl font-bold text-gray-900">₩{(sampleStats.monthlyRevenue / 10000).toFixed(0)}만</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "overview", name: "개요" },
              { id: "prompts", name: "프롬프트 관리" },
              { id: "analytics", name: "분석" },
              { id: "earnings", name: "수익" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">최근 활동</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">새로운 프롬프트가 등록되었습니다</p>
                    <p className="text-sm text-gray-600">2시간 전</p>
                  </div>
                  <span className="text-green-600 text-sm">+₩15,000</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">프롬프트 판매 완료</p>
                    <p className="text-sm text-gray-600">5시간 전</p>
                  </div>
                  <span className="text-green-600 text-sm">+₩25,000</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "prompts" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">내 프롬프트</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  새 프롬프트 등록
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        프롬프트
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        가격
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        판매
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        조회수
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        평점
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        상태
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {samplePrompts.map((prompt) => (
                      <tr key={prompt.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{prompt.title}</div>
                            <div className="text-sm text-gray-500">{prompt.createdAt}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₩{prompt.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {prompt.sales}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {prompt.views}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {prompt.rating > 0 ? prompt.rating : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(prompt.status)}`}>
                            {getStatusText(prompt.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">분석 데이터</h3>
              <p className="text-gray-600">상세한 분석 데이터가 여기에 표시됩니다.</p>
            </div>
          )}

          {activeTab === "earnings" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">수익 현황</h3>
              <p className="text-gray-600">수익 관련 상세 정보가 여기에 표시됩니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 