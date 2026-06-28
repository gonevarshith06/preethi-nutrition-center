"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Trophy } from "lucide-react";

interface SuccessStoryCardProps {
  id: string;
  title: string;
  beforeWeight: string;
  afterWeight: string;
  description: string;
  imageSrc: string;
  program: string;
}

export const SuccessStoryCard = ({ 
  id, 
  title, 
  beforeWeight, 
  afterWeight, 
  description, 
  imageSrc,
  program
}: SuccessStoryCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden p-0 border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white group">
      <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden bg-gray-100">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex gap-2">
            <div className="bg-red-500/90 text-white px-3 py-1 rounded-lg backdrop-blur-sm shadow-md flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider">Before</span>
              <span className="font-bold">{beforeWeight}</span>
            </div>
            <div className="bg-green-500/90 text-white px-3 py-1 rounded-lg backdrop-blur-sm shadow-md flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider">After</span>
              <span className="font-bold">{afterWeight}</span>
            </div>
          </div>
          <div className="bg-pink-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
            {program}
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
          "{description}"
        </p>
        <Link href={`/success-stories/${id}`}>
          <Button variant="outline" className="w-full group-hover:bg-pink-50 group-hover:text-pink-600 group-hover:border-pink-300 transition-colors">
            Read Full Story <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};
