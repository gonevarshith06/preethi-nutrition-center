"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";

export default function ShareProducts() {
  const { products, setProducts } = useGlobalContext();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Math.random().toString(36).substring(7),
      name,
      price,
      description,
      image,
    };
    setProducts([newProduct, ...products]);
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
  };

  const deleteProduct = (id: string) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Form */}
      <div className="lg:col-span-1">
        <Card className="border-none shadow-sm sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Product Name" 
              required 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
            <Input 
              label="Price (₹)" 
              type="number"
              required 
              value={price} 
              onChange={e => setPrice(e.target.value)} 
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
            <Button type="submit" className="w-full">Publish Product</Button>
          </form>
        </Card>
      </div>

      {/* List */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-500">Add or remove products from the store.</p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map(product => (
              <Card key={product.id} className="border-none shadow-sm p-4 relative group">
                <button 
                  onClick={() => deleteProduct(product.id)} 
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-3">
                  {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover" />}
                </div>
                <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="text-pink-600 font-bold mb-2">₹{product.price}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products added yet.</p>
        )}
      </div>
      
    </div>
  );
}
