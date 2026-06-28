"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";

export default function ManageBlogs() {
  const { blogs, setBlogs } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog = {
      id: Math.random().toString(36).substring(7),
      title,
      excerpt,
      content,
      image,
      createdAt: new Date().toLocaleDateString(),
    };
    setBlogs([newBlog, ...blogs]);
    setTitle("");
    setExcerpt("");
    setContent("");
    setImage("");
  };

  const deleteBlog = (id: string) => {
    if (window.confirm("Delete this blog?")) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Form */}
      <div className="lg:col-span-1">
        <Card className="border-none shadow-sm sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Publish Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Blog Title" 
              required 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
            <Input 
              label="Short Description (Excerpt)" 
              required 
              value={excerpt} 
              onChange={e => setExcerpt(e.target.value)} 
            />
            <Input 
              label="Featured Image URL" 
              placeholder="https://..."
              value={image} 
              onChange={e => setImage(e.target.value)} 
            />
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-medium text-gray-700">Blog Content (HTML supported)</label>
              <textarea
                required
                rows={8}
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none resize-none"
              />
            </div>
            <Button type="submit" className="w-full">Publish Blog</Button>
          </form>
        </Card>
      </div>

      {/* List */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Blogs</h1>
          <p className="text-gray-500">Write articles for your website visitors.</p>
        </div>

        {blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map(blog => (
              <Card key={blog.id} className="border-none shadow-sm flex flex-col sm:flex-row gap-4 p-4">
                <div className="w-full sm:w-32 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 line-clamp-1">{blog.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{blog.createdAt}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{blog.content}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => deleteBlog(blog.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No blogs published yet.</p>
        )}
      </div>
      
    </div>
  );
}
