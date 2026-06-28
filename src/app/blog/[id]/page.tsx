"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const { blogs } = useGlobalContext();
  
  // Need to unwrap the params safely, or just access it if Next.js 14-. In Next.js 15, params is a promise in server components, but in client components we can use useParams hook which returns the params object directly.
  const id = params?.id as string;
  
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h2>
        <button onClick={() => router.push('/blog')} className="text-pink-600 hover:underline">
          &larr; Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => router.push('/blog')} 
          className="flex items-center text-gray-500 hover:text-pink-600 mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Blog
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-2 text-sm text-pink-500 font-medium mb-4">
            <Calendar size={16} />
            <span>{blog.createdAt || new Date().toLocaleDateString()}</span>
          </div>
          
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {blog.title}
          </h1>

          {blog.image && (
            <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-10 shadow-lg">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div 
            className="prose prose-lg prose-pink max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </motion.div>
        
      </div>
    </div>
  );
}
