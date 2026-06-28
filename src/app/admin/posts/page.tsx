"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Trash2, Edit } from "lucide-react";

export default function ManagePosts() {
  const { posts, setPosts } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      id: Math.random().toString(36).substring(7),
      title,
      description,
      image,
      createdAt: new Date().toLocaleDateString(),
    };
    setPosts([newPost, ...posts]);
    setTitle("");
    setDescription("");
    setImage("");
  };

  const deletePost = (id: string) => {
    if (window.confirm("Delete this post?")) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Form */}
      <div className="lg:col-span-1">
        <Card className="border-none shadow-sm sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Create Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Post Title" 
              required 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
            <Input 
              label="Image URL" 
              placeholder="https://..."
              value={image} 
              onChange={e => setImage(e.target.value)} 
            />
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none resize-none"
              />
            </div>
            <Button type="submit" className="w-full">Publish</Button>
          </form>
        </Card>
      </div>

      {/* List */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Posts</h1>
          <p className="text-gray-500">These posts appear on the home page.</p>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map(post => (
              <Card key={post.id} className="border-none shadow-sm flex flex-col sm:flex-row gap-4 p-4">
                <div className="w-full sm:w-32 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  {post.image && <img src={post.image} alt={post.title} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{post.createdAt}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{post.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => deletePost(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts published yet.</p>
        )}
      </div>
      
    </div>
  );
}
