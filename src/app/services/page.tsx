"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Scale, Apple, Activity, Baby, Stethoscope, Video } from "lucide-react";

const services = [
  { id: "weight-loss", icon: Scale, title: "Weight Loss", desc: "Sustainable weight loss plans without starving. Focus on fat loss while maintaining muscle mass.", duration: "3-6 months" },
  { id: "weight-gain", icon: Apple, title: "Weight Gain", desc: "Healthy muscle and weight gain programs using nutrient-dense foods.", duration: "3-6 months" },
  { id: "diabetes", icon: Activity, title: "Diabetes Management", desc: "Control blood sugar levels naturally through diet modifications.", duration: "Ongoing" },
  { id: "pcos", icon: Activity, title: "PCOS/Thyroid", desc: "Manage hormonal imbalances and reverse symptoms with specialized nutrition.", duration: "6-12 months" },
  { id: "pregnancy", icon: Baby, title: "Pregnancy Nutrition", desc: "Optimal nutrition for both mother and baby throughout all trimesters.", duration: "9 months" },
  { id: "online", icon: Video, title: "Online Consultation", desc: "Get expert advice from the comfort of your home, anywhere in the world.", duration: "Flexible" },
];

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20 bg-pink-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our <span className="text-pink-600">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive nutrition and wellness programs tailored to your specific health conditions and goals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
                  <service.icon size={28} />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 flex-1">{service.desc}</p>
                <div className="flex items-center text-sm font-medium text-gray-500 mb-6 bg-gray-50 py-2 px-3 rounded-lg w-max">
                  Duration: {service.duration}
                </div>
                <Link href="/#book-appointment" className="mt-auto">
                  <Button variant="outline" className="w-full group-hover:bg-pink-500 group-hover:text-white group-hover:border-pink-500">
                    Book Consultation
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
