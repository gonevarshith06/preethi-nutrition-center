"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/context/GlobalContext";
import { Card } from "@/components/ui/Card";
import { Calendar } from "lucide-react";

export default function BlogPage() {
  const { blogs } = useGlobalContext();

  return (
    <div className="pt-24 pb-20 min-h-screen bg-pink-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Nutrition & Wellness <span className="text-pink-600">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Read the latest articles on health, diet, and fitness from our experts.
          </motion.p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={`/blog/${blog.id}`} className="block h-full group">
                  <Card className="h-full flex flex-col p-0 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-pink-400 bg-pink-50 font-bold">
                          Blog
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center space-x-2 text-xs text-pink-500 font-medium mb-3">
                        <Calendar size={14} />
                        <span>{blog.createdAt || new Date().toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 flex-1 mb-4">
                        {blog.excerpt || (blog.content.includes('<') ? 'Read this article to learn more...' : blog.content)}
                      </p>
                      <span className="text-pink-600 font-semibold text-sm flex items-center mt-auto">
                        Read Full Article <span className="ml-1">→</span>
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-pink-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Available</h3>
            <p className="text-gray-500">Check back later for new nutrition insights.</p>
          </div>
        )}

      </div>
    </div>
  );
}
