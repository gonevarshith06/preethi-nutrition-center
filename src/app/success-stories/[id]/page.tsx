"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Target, TrendingUp, CalendarCheck, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// This would normally be fetched from the backend.
// Mocking the specific data for the "weight-gain" story as requested.
const storyData = {
  id: "weight-gain-journey",
  title: "Real Client Transformation – Healthy Weight Gain Journey",
  clientName: "Anonymous Client",
  beforeWeight: "47.2 Kg",
  afterWeight: "53.1 Kg",
  weightDifference: "+5.9 Kg",
  program: "Weight Gain Program",
  duration: "4 Months",
  imageSrc: "https://res.cloudinary.com/dgveemazo/image/upload/f_auto,q_auto/WhatsApp_Image_2026-06-29_at_2.17.41_AM_qxmtdm", // Using Cloudinary URL
  description: "With a personalized nutrition plan, regular follow-ups, and healthy lifestyle changes, our client successfully achieved healthy weight gain and improved overall wellness.",
  journey: "Our client approached us feeling constantly fatigued and struggling to gain weight despite eating regular meals. Being underweight was affecting her confidence and daily energy levels. She had tried multiple generic weight gain diets from the internet, but nothing seemed to work sustainably without causing digestive distress.",
  strategy: [
    "Caloric Surplus: We calculated a precise caloric surplus, focusing on nutrient-dense foods rather than empty calories to ensure muscle gain and healthy fat distribution.",
    "Protein Distribution: Increased high-quality protein intake across all meals to support muscle synthesis.",
    "Gut Health: Introduced gut-friendly foods and probiotics to improve nutrient absorption, which is often a hidden issue in underweight individuals.",
    "Strength Training: Recommended basic resistance exercises to complement the diet plan, ensuring the gained weight contributed to a toned physique."
  ],
  challenges: "The primary challenge was a small appetite and fast metabolism. We overcame this by introducing calorie-dense, easy-to-consume smoothies and frequent, smaller meals rather than three large heavy meals which caused bloating.",
};

export default function SuccessStoryDetail() {
  const params = useParams();
  const router = useRouter();
  
  // Since we are mocking, we will just display the storyData.
  // In a real app, we would fetch data based on params.id.
  const story = storyData;

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-gray-500 hover:text-pink-600 mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={18} className="mr-2" /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 font-bold text-sm tracking-wider uppercase mb-4 shadow-sm border border-pink-200">
              {story.program}
            </span>
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {story.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
              "{story.description}"
            </p>
          </div>

          {/* Transformation Image & Stats */}
          <Card className="p-0 overflow-hidden border-none shadow-2xl mb-12 bg-white">
            <div className="relative w-full h-[400px] sm:h-[600px] bg-gray-100">
              <img 
                src={story.imageSrc} 
                alt="Before and After Transformation" 
                className="w-full h-full object-contain bg-black/5" 
                // We use object-contain so the full before/after image is visible.
              />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100 border-t border-gray-100 bg-white">
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Before</span>
                <span className="text-2xl font-bold text-gray-900">{story.beforeWeight}</span>
              </div>
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">After</span>
                <span className="text-2xl font-bold text-pink-600">{story.afterWeight}</span>
              </div>
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Result</span>
                <span className="text-2xl font-bold text-green-600 flex items-center gap-1">
                  <TrendingUp size={24} /> {story.weightDifference}
                </span>
              </div>
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Duration</span>
                <span className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                  <CalendarCheck size={24} className="text-pink-500" /> {story.duration}
                </span>
              </div>
            </div>
          </Card>

          {/* Detailed Content */}
          <div className="space-y-12 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
            
            <section>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Target className="text-pink-500" /> The Journey
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {story.journey}
              </p>
            </section>

            <section>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-pink-500" /> Our Nutrition Strategy
              </h2>
              <div className="space-y-4">
                {story.strategy.map((point, idx) => {
                  const [title, desc] = point.split(": ");
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-pink-50/50 rounded-2xl border border-pink-100/50">
                      <div className="w-8 h-8 rounded-full bg-pink-200 text-pink-700 font-bold flex items-center justify-center shrink-0 mt-1">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
                        <p className="text-gray-700 mt-1">{desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4 text-red-500">
                Challenges Faced
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed bg-red-50 p-6 rounded-2xl border border-red-100">
                {story.challenges}
              </p>
            </section>

          </div>

          {/* CTA & Disclaimer */}
          <div className="mt-16 text-center space-y-8">
            <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-10 rounded-3xl text-white shadow-xl">
              <h3 className="font-playfair text-3xl font-bold mb-4">Ready for your own transformation?</h3>
              <p className="mb-8 text-pink-100 text-lg">Let our experts design a customized plan for your unique body and goals.</p>
              <Link href="/#book-appointment">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 hover:text-pink-700 shadow-lg px-8 text-lg font-bold">
                  Book Your Consultation
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-gray-400 font-medium uppercase tracking-widest border-t border-gray-200 pt-8">
              Disclaimer: Results are not typical and may vary from person to person.
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
