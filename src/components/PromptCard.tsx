"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StarIcon, HeartIcon, EyeIcon, UserIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  price: number;
  rating: number;
  downloads: number;
  category: string;
  tags: string[];
  image?: string;
}

export default function PromptCard({
  id,
  title,
  description,
  author,
  price,
  rating,
  downloads,
  category,
  tags,
  image,
}: PromptCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl">🤖</div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          {isLiked ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <StarIconSolid className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-600">{rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
            >
              #{tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-gray-500 text-xs">+{tags.length - 3}</span>
          )}
        </div>

        {/* Author and Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <UserIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <EyeIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{downloads}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            {price === 0 ? "무료" : `₩${price.toLocaleString()}`}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {price === 0 ? "다운로드" : "구매하기"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
} 