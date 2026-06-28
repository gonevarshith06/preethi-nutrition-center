"use client";

import React from "react";
import { Post } from "@/context/GlobalContext";
import { Card } from "@/components/ui/Card";
import { Calendar } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="overflow-hidden p-0 flex flex-col group h-full hover:shadow-xl transition-all duration-300">
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-pink-50">
            Nutrition Update
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center space-x-2 text-xs text-pink-500 font-medium mb-3">
          <Calendar size={14} />
          <span>{post.createdAt || new Date().toLocaleDateString()}</span>
        </div>
        <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
          {post.description}
        </p>
        <button className="text-pink-600 font-semibold text-sm hover:text-pink-700 flex items-center mt-auto">
          Read More <span className="ml-1">→</span>
        </button>
      </div>
    </Card>
  );
};
