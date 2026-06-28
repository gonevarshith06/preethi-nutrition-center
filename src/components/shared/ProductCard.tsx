"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/context/GlobalContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden p-0 flex flex-col group h-full hover:shadow-xl transition-all duration-300">
      <div className="relative w-full h-48 sm:h-56 bg-gray-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-pink-600 shadow-sm">
          ${product.price}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
          {product.description}
        </p>
        <div className="flex space-x-2 mt-auto">
          <Button className="flex-1" size="sm">
            Enquire Now
          </Button>
          <Button variant="outline" className="flex-1" size="sm">
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
};
