"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
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
            Get in <span className="text-pink-600">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            We are here to answer any questions you may have about our programs, pricing, or consultations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <Card className="p-8 border-none shadow-lg bg-pink-50/50">
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-600 shadow-sm shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Visit Us</h4>
                    <p className="text-gray-600">S.V.P.C Complex, Beside More Supermarket Line, Jyothinagar, Karimnagar, Telangana</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-600 shadow-sm shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
                    <p className="text-gray-600">9293604899<br/>8374086335</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-600 shadow-sm shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-600">preethiherbalife@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pink-600 shadow-sm shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Working Hours</h4>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM<br/>Sun: By Appointment Only</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="mt-8 pt-8 border-t border-pink-100">
                <a href="https://wa.me/919293604899" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-6 rounded-full font-bold transition-colors w-full">
                  Chat on WhatsApp
                </a>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8 border-none shadow-lg">
              <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="John" required />
                  <Input label="Last Name" placeholder="Doe" required />
                </div>
                <Input label="Email Address" type="email" placeholder="john@example.com" required />
                <Input label="Phone Number" type="tel" placeholder="Your number" required />
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  />
                </div>
                <Button type="submit" className="w-full mt-4">Send Message</Button>
              </form>
            </Card>
          </motion.div>

        </div>

        {/* Map */}
        <div className="mt-20 rounded-3xl overflow-hidden shadow-lg h-96 bg-gray-100 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15234.333333333332!2d79.13333333333333!3d18.43333333333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a33500000000001%3A0xabcdefabcdef!2sKarimnagar%2C%20Telangana!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            className="absolute inset-0"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
