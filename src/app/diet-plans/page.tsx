"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  CheckCircle2, 
  ChevronDown, 
  Star, 
  FileText, 
  LineChart, 
  MessageCircle, 
  CalendarCheck,
  ChevronRight,
  Phone,
  X
} from "lucide-react";

// Data
const programs = [
  {
    id: "weight-loss",
    title: "Weight Loss Program",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
    description: "Sustainable fat loss and muscle toning through customized calorie-deficit meal plans.",
    suitableFor: "Individuals looking to lose weight naturally without starvation.",
  },
  {
    id: "weight-gain",
    title: "Weight Gain Program",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
    description: "Healthy muscle gain with calorie surplus meal plans focusing on high-protein foods.",
    suitableFor: "Underweight individuals or those looking to build lean muscle.",
  },
  {
    id: "pcos",
    title: "PCOS Nutrition",
    image: "https://images.unsplash.com/photo-1498837167922-41c53b445cf0?q=80&w=2070&auto=format&fit=crop",
    description: "Hormone balancing nutrition, low GI foods, and lifestyle modifications.",
    suitableFor: "Women dealing with PCOS, irregular periods, and hormonal imbalances.",
  },
  {
    id: "diabetes",
    title: "Diabetes Management",
    image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2006&auto=format&fit=crop",
    description: "Blood sugar stabilizing meals and carb counting techniques for steady energy.",
    suitableFor: "Type 2 diabetics or pre-diabetics needing lifestyle correction.",
  },
  {
    id: "thyroid",
    title: "Thyroid Nutrition",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop",
    description: "Nutrient-rich diets tailored for optimal metabolism and thyroid support.",
    suitableFor: "Individuals with Hypothyroidism or Hyperthyroidism.",
  },
  {
    id: "pregnancy",
    title: "Pregnancy Nutrition",
    image: "https://images.unsplash.com/photo-1555243896-c709bfa0b564?q=80&w=2070&auto=format&fit=crop",
    description: "Trimester-specific meal plans focusing on essential nutrients for mother and baby.",
    suitableFor: "Expecting mothers and those in postpartum recovery.",
  },
  {
    id: "child-nutrition",
    title: "Child Nutrition",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000&auto=format&fit=crop",
    description: "Nutrient-dense, fun recipes to build immunity and support physical growth.",
    suitableFor: "Picky eaters or children needing focused growth support.",
  },
  {
    id: "senior-citizen",
    title: "Senior Citizen Nutrition",
    image: "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?q=80&w=2070&auto=format&fit=crop",
    description: "Easy-to-digest meal plans supporting bone health and longevity.",
    suitableFor: "Elderly individuals managing chronic diseases and joint health.",
  },
];

const faqs = [
  { q: "How often will I get a new diet plan?", a: "Diet plans are updated every 7-10 days based on your progress, feedback, and weekly measurements." },
  { q: "Do I have to eat bland food or salads all day?", a: "Absolutely not! We believe in sustainable eating. Your plans will include tasty, culturally appropriate home-cooked meals." },
  { q: "Can I manage my diet if I travel frequently?", a: "Yes, we provide specialized travel and restaurant guides so you can stay on track no matter where you are." },
  { q: "Is the WhatsApp support available 24/7?", a: "WhatsApp support is available from Monday to Saturday, 9 AM to 7 PM for prompt query resolution." },
];

const sharedBenefits = [
  "Personalized consultation",
  "Weekly follow-ups",
  "Nutrition guidance",
  "Lifestyle recommendations"
];

export default function DietPlansPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    healthGoal: "",
    message: ""
  });

  const openEnquiryModal = (planTitle: string = "") => {
    setSelectedPlan(planTitle);
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitted(true);
      // Reset form after submission
      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        healthGoal: "",
        message: ""
      });
    }, 500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/90 to-white/70 z-10" />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg"
          >
            Personalized Diet Plans for Every Health Goal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-pink-50 font-medium drop-shadow-md max-w-2xl mx-auto"
          >
            Science-backed, customized nutrition guidance to help you transform your life sustainably and naturally.
          </motion.p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-20 -mt-10 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {programs.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="p-0 overflow-hidden flex flex-col group border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-white h-full">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={plan.image} 
                      alt={plan.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{plan.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-1 block">Suitable For</span>
                      <p className="text-sm text-gray-700">{plan.suitableFor}</p>
                    </div>
                    
                    <div className="space-y-2 mb-8 flex-1 bg-pink-50/50 p-4 rounded-xl border border-pink-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block mb-2">Key Benefits</span>
                      {sharedBenefits.map((b, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle2 className="text-pink-500 shrink-0 mr-2 mt-0.5" size={14} />
                          <span className="text-gray-700 text-xs font-medium">{b}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <Button onClick={() => openEnquiryModal(plan.title)} className="w-full shadow-md hover:shadow-lg">
                        Send Enquiry
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">What's Included in Every Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide comprehensive support to ensure you reach your goals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: "Personalized Meal Plan", desc: "Tailored to your body type, medical history, and lifestyle." },
              { icon: CalendarCheck, title: "Weekly Monitoring", desc: "Diet adjustments every week based on your body's response." },
              { icon: LineChart, title: "Progress Tracking", desc: "Detailed analysis of your weight, inch loss, and energy levels." },
              { icon: MessageCircle, title: "WhatsApp Support", desc: "Direct access to our nutritionists for daily queries and motivation." }
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-6 rounded-3xl hover:bg-pink-50 transition-colors duration-300 group">
                <div className="w-16 h-16 mx-auto bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={32} />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-24 bg-pink-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">Your journey to better health in 5 simple steps.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-pink-200 -translate-y-1/2 z-0" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
              {[
                { step: "01", title: "Book Consultation", desc: "Schedule your initial assessment call." },
                { step: "02", title: "Health Assessment", desc: "Detailed discussion of your goals and history." },
                { step: "03", title: "Customized Plan", desc: "Receive your personalized nutrition protocol." },
                { step: "04", title: "Weekly Follow-up", desc: "Track progress and adjust the diet plan." },
                { step: "05", title: "Achieve Your Goal", desc: "Hit your targets and learn sustainable habits." },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center relative group">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-pink-100 shadow-lg flex items-center justify-center font-bold text-xl text-pink-600 mb-6 group-hover:border-pink-500 group-hover:bg-pink-50 transition-all duration-300">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about our diet plans.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown 
                    className={`text-pink-500 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large CTA Banner */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Need a Customized Diet Plan?
            </h2>
            <p className="text-pink-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Every individual has different health goals and nutritional needs. Contact us today to receive a personalized diet plan prepared by our nutrition expert.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Button onClick={() => openEnquiryModal()} size="lg" className="bg-white text-pink-600 hover:bg-pink-50 hover:text-pink-700 px-10 h-16 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all w-full sm:w-auto">
                Send Enquiry
              </Button>
              <div className="flex items-center text-white text-xl font-bold">
                <Phone className="mr-3" size={24} />
                9293604899
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl relative z-10 w-full max-w-lg overflow-hidden border border-pink-100"
            >
              <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-6 text-center relative">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-4 top-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <h3 className="font-playfair text-2xl font-bold text-white mb-2">Program Enquiry</h3>
                <p className="text-pink-50 text-sm">We'll get back to you shortly to discuss your plan.</p>
              </div>

              <div className="p-8">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Thank You!</h4>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 italic leading-relaxed">
                      "Thank you for contacting Preethi Nutrition Center. Our nutrition expert will get in touch with you shortly to discuss the most suitable diet plan for your health goals."
                    </p>
                    <Button onClick={() => setIsModalOpen(false)} className="mt-8 w-full">
                      Close Window
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <Input 
                      label="Full Name" 
                      required 
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input 
                        label="Mobile Number" 
                        type="tel" 
                        required 
                        value={formData.mobile}
                        onChange={e => setFormData({...formData, mobile: e.target.value})}
                      />
                      <Input 
                        label="Email Address" 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">Select Diet Plan</label>
                      <select 
                        required
                        value={selectedPlan}
                        onChange={e => setSelectedPlan(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow"
                      >
                        <option value="" disabled>-- Select a Plan --</option>
                        {programs.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                        <option value="Not Sure">Not Sure Yet</option>
                      </select>
                    </div>

                    <Input 
                      label="Health Goal (e.g. Lose 5kg, Manage PCOS)" 
                      required 
                      value={formData.healthGoal}
                      onChange={e => setFormData({...formData, healthGoal: e.target.value})}
                    />
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">Message (Optional)</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow resize-none"
                      />
                    </div>

                    <Button type="submit" className="w-full mt-4 h-12 text-lg shadow-md hover:shadow-lg">
                      Submit Enquiry
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
