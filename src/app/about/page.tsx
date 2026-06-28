"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Award, Heart, Target, Users } from "lucide-react";

export default function AboutPage() {
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
            About <span className="text-pink-600">Preethi Nutrition Center</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Dedicated to helping individuals achieve healthier lifestyles through personalized nutrition guidance, wellness coaching, and fitness programs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-pink-100 flex items-center justify-center text-pink-300">
              <Heart size={64} />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-playfair text-3xl font-bold text-gray-900">Our Journey</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Founded with a passion for holistic health, Preethi Nutrition Center has grown into a trusted wellness hub in Karimnagar. We believe that true health comes from a balanced approach to diet and lifestyle.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Over the years, we have successfully transformed the lives of thousands of clients, helping them overcome challenges like obesity, diabetes, PCOS, and thyroid disorders through sustainable, natural nutrition.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <Card className="bg-pink-50 border-none p-8 hover:-translate-y-2 transition-transform duration-300">
            <Target className="text-pink-500 w-12 h-12 mb-6" />
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To empower individuals with the knowledge and tools they need to take control of their health through customized, science-backed nutrition plans and compassionate coaching.
            </p>
          </Card>
          <Card className="bg-pink-50 border-none p-8 hover:-translate-y-2 transition-transform duration-300">
            <Users className="text-pink-500 w-12 h-12 mb-6" />
            <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              To create a disease-free community where every individual enjoys a vibrant, energetic, and fulfilling life, making healthy eating a joyful lifestyle rather than a strict regimen.
            </p>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Achievements & Certifications</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">Recognized for excellence in nutritional counseling and wellness coaching.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Happy Clients", value: "5000+" },
              { label: "Years Experience", value: "10+" },
              { label: "Diet Plans", value: "1000s" },
              { label: "Certifications", value: "15+" },
            ].map((stat, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <Award className="text-pink-500 w-8 h-8 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
