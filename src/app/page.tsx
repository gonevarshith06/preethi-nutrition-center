"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Star, Activity, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { useGlobalContext } from "@/context/GlobalContext";
import { ProductCard } from "@/components/shared/ProductCard";
import { PostCard } from "@/components/shared/PostCard";
import { SuccessStoryCard } from "@/components/shared/SuccessStoryCard";

export default function Home() {
  const { products, posts, blogs } = useGlobalContext();

  const featuredProducts = products.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const recentBlogs = blogs.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-white -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-pink-100/40 blur-3xl rounded-l-full -z-10 transform translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-pink-600 font-semibold text-sm mb-6 border border-pink-200">
                #1 Nutrition Center in Karimnagar
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight"
            >
              Transform Your Health With <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">Expert Nutrition Guidance</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              Personalized diet plans, wellness coaching, and fitness programs designed to help you achieve your health goals sustainably.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Button size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('book-appointment')?.scrollIntoView({ behavior: 'smooth' })}>
                Book Appointment
              </Button>
              <Link href="/services" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  Explore Programs <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide science-backed nutrition plans tailored to your unique body and lifestyle.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Activity, title: "Personalized Plans", desc: "Custom diets based on your medical history, goals, and preferences." },
              { icon: Heart, title: "Expert Coaching", desc: "Continuous support and motivation from certified nutritionists." },
              { icon: Shield, title: "Sustainable Results", desc: "Focus on long-term health rather than quick, temporary fixes." }
            ].map((feature, idx) => (
              <Card key={idx} className="text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-6 text-pink-600">
                  <feature.icon size={32} />
                </div>
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area with Right Sidebar */}
      <section className="py-20 bg-pink-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column (Main Content) */}
            <div className="lg:w-2/3 space-y-20">
              
              {/* Book Appointment */}
              <div id="book-appointment" className="scroll-mt-24">
                <div className="mb-8">
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Consultation</h2>
                  <p className="text-gray-600">Take the first step towards a healthier you. Fill out the form below and we'll get in touch.</p>
                </div>
                <Card className="shadow-lg border-pink-100">
                  <AppointmentForm />
                </Card>
              </div>

              {/* Latest Posts */}
              {latestPosts.length > 0 && (
                <div>
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-2">Latest Updates</h2>
                      <p className="text-gray-600">Health tips, news, and insights from our center.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {latestPosts.map(post => <PostCard key={post.id} post={post} />)}
                  </div>
                </div>
              )}

              {/* Products Preview */}
              {featuredProducts.length > 0 && (
                <div>
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Products</h2>
                      <p className="text-gray-600">Premium supplements and nutrition products.</p>
                    </div>
                    <Link href="/products" className="text-pink-600 font-medium hover:text-pink-700 hidden sm:block">
                      View All Products &rarr;
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
                  </div>
                  <div className="mt-6 text-center sm:hidden">
                    <Link href="/products">
                      <Button variant="outline" className="w-full">View All Products</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar (Blog Widget) */}
            <div className="lg:w-1/3">
              <div className="sticky top-28">
                <Card className="border-pink-100 shadow-md">
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                    Nutrition Blog
                  </h3>
                  
                  {recentBlogs.length > 0 ? (
                    <div className="space-y-6">
                      {recentBlogs.map(blog => (
                        <Link href={`/blog/${blog.id}`} key={blog.id} className="block group">
                          <div className="flex gap-4 items-start">
                            <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                              {blog.image ? (
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              ) : (
                                <div className="w-full h-full bg-pink-100 flex items-center justify-center text-xs text-pink-400">Blog</div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm group-hover:text-pink-600 transition-colors line-clamp-2 mb-1">
                                {blog.title}
                              </h4>
                              <p className="text-xs text-gray-500 line-clamp-2">
                                {blog.excerpt 
                                  ? blog.excerpt 
                                  : (blog.content.includes('<') ? 'Read this article to learn more...' : blog.content.substring(0, 60) + '...')}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                      
                      <Link href="/blog" className="block pt-4 border-t border-gray-100 text-center text-sm font-semibold text-pink-600 hover:text-pink-700">
                        Read All Articles
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No blog posts published yet.
                    </div>
                  )}
                </Card>
                
                {/* Additional Widget */}
                <Card className="mt-6 bg-gradient-to-br from-pink-500 to-rose-400 text-white border-none">
                  <h3 className="font-playfair text-xl font-bold mb-3">Join Zumba Classes</h3>
                  <p className="text-white/90 text-sm mb-6">Get fit while having fun! Check out our new Zumba schedules.</p>
                  <Link href="/zumba">
                    <Button variant="secondary" className="w-full bg-white text-pink-600 hover:bg-gray-50">
                      Learn More
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Success Stories</h2>
              <p className="text-gray-600">Hear from our clients who have transformed their lives.</p>
            </div>
            <Link href="/success-stories" className="hidden md:inline-flex items-center text-pink-600 font-bold hover:text-pink-700">
              View All Stories <ArrowRight size={20} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SuccessStoryCard
              id="weight-gain-journey"
              title="Real Client Transformation – Healthy Weight Gain Journey"
              beforeWeight="47.2 Kg"
              afterWeight="53.1 Kg"
              description="With a personalized nutrition plan, regular follow-ups, and healthy lifestyle changes, our client successfully achieved healthy weight gain and improved overall wellness."
              imageSrc="https://res.cloudinary.com/dgveemazo/image/upload/f_auto,q_auto/WhatsApp_Image_2026-06-29_at_2.17.41_AM_qxmtdm"
              program="Weight Gain Program"
            />
            <SuccessStoryCard
              id="weight-loss-journey"
              title="Incredible 15Kg Weight Loss"
              beforeWeight="85.0 Kg"
              afterWeight="70.0 Kg"
              description="The customized diet plan from Preethi Nutrition Center helped me lose 15 kgs in just 4 months. The support and guidance I received was phenomenal."
              imageSrc="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
              program="Weight Loss Program"
            />
            {/* Added a third card to fill the 3-column grid nicely */}
            <SuccessStoryCard
              id="pcos-management"
              title="PCOS Symptoms Reversed"
              beforeWeight="72.0 Kg"
              afterWeight="64.0 Kg"
              description="I struggled with PCOS for years. The structured diet plan helped regulate my cycles and I lost the stubborn weight I had been trying to shed."
              imageSrc="https://images.unsplash.com/photo-1498837167922-41c53b445cf0?q=80&w=2070&auto=format&fit=crop"
              program="PCOS Management"
            />
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/success-stories">
              <Button variant="outline" className="w-full">View All Stories</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pink-900/20 mix-blend-multiply" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Contact us today to schedule your initial consultation and discover how we can help you achieve optimal health.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900">
              Call Now: 9293604899
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
