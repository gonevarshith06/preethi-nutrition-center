"use client";

import React from "react";
import { motion } from "framer-motion";
import { SuccessStoryCard } from "@/components/shared/SuccessStoryCard";

const stories = [
  { 
    id: "weight-gain-journey", 
    name: "Anonymous Client", 
    program: "Weight Gain Program", 
    beforeWeight: "47.2 Kg", 
    afterWeight: "53.1 Kg", 
    description: "With a personalized nutrition plan, regular follow-ups, and healthy lifestyle changes, our client successfully achieved healthy weight gain and improved overall wellness.",
    imageSrc: "https://res.cloudinary.com/dgveemazo/image/upload/f_auto,q_auto/WhatsApp_Image_2026-06-29_at_2.17.41_AM_qxmtdm",
  },
  { 
    id: "weight-loss-journey", 
    name: "Sarah M.", 
    program: "Weight Loss", 
    beforeWeight: "85 Kg", 
    afterWeight: "70 Kg", 
    description: "The customized diet plan from Preethi Nutrition Center changed my life. I never felt starved, and the results were consistent week after week.",
    imageSrc: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
  }
];

export default function SuccessStoriesPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Client <span className="text-pink-600">Transformations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Real results from real people. Read how our personalized programs have helped our clients achieve their health goals.
          </motion.p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <SuccessStoryCard
                id={story.id}
                title={story.name}
                beforeWeight={story.beforeWeight}
                afterWeight={story.afterWeight}
                description={story.description}
                imageSrc={story.imageSrc}
                program={story.program}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 font-medium uppercase tracking-widest border-t border-gray-200 pt-8 inline-block">
            Disclaimer: Results are not typical and may vary from person to person.
          </p>
        </div>

      </div>
    </div>
  );
}
