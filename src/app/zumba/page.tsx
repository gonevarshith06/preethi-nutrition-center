"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Clock, MapPin, Play, Star } from "lucide-react";
import Link from "next/link";

export default function ZumbaPage() {
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
            Join Our <span className="text-pink-600">Zumba Fitness</span> Program
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Dance your way to fitness! Burn calories, relieve stress, and have fun with our energetic Zumba classes.
          </motion.p>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl bg-pink-100 flex items-center justify-center group"
          >
            {/* Placeholder for Video/Image */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
            <button className="relative z-20 w-20 h-20 bg-white rounded-full flex items-center justify-center text-pink-600 shadow-lg hover:scale-110 transition-transform">
              <Play fill="currentColor" size={32} className="ml-2" />
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Meet Your Trainer</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center text-xl font-bold text-pink-700">T</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Coach XYZ</h3>
                  <p className="text-pink-600">Certified Zumba Instructor</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Class Timings</h4>
                  <p className="text-gray-600">Morning: 6:00 AM - 7:00 AM<br/>Evening: 6:00 PM - 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Location</h4>
                  <p className="text-gray-600">Preethi Nutrition Center, Karimnagar</p>
                </div>
              </div>
            </div>

            <Link href="/#book-appointment" className="inline-block mt-4">
              <Button size="lg">Register Now</Button>
            </Link>
          </motion.div>
        </div>

        {/* Gallery Preview */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl font-bold text-center text-gray-900 mb-10">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square bg-pink-50 rounded-2xl flex items-center justify-center text-pink-200 overflow-hidden group">
                 <div className="w-full h-full bg-pink-100/50 group-hover:scale-110 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
