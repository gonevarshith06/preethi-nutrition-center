"use client";

import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/context/GlobalContext";
import { ProductCard } from "@/components/shared/ProductCard";

export default function ProductsPage() {
  const { products } = useGlobalContext();

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
            Wellness <span className="text-pink-600">Products</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore our curated range of premium health supplements and nutrition products.
          </motion.p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-pink-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Available</h3>
            <p className="text-gray-500">Check back later for our new product range.</p>
          </div>
        )}

      </div>
    </div>
  );
}
