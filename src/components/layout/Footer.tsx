"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const Footer = () => {
  const pathname = usePathname();

  // Hide Footer in Admin dashboard
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-white border-t border-pink-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="font-playfair text-2xl font-bold text-pink-600">
                Preethi<span className="text-gray-800">Nutrition</span>
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Preethi Nutrition Center is dedicated to helping individuals achieve
              healthier lifestyles through personalized nutrition guidance, wellness
              coaching, customized diet plans, and fitness programs.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16.113 11.643a4 4 0 1 1-2.92-2.92"/><path d="M17.5 6.5h.01"/></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-500 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-gray-900 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "Home",
                "About",
                "Services",
                "Diet Plans",
                "Zumba",
                "Products",
                "Success Stories",
                "Blog",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href={
                      link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`
                    }
                    className="text-gray-600 hover:text-pink-600 transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-gray-900 mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-pink-500 mt-1 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-600 text-sm">
                  S.V.P.C Complex, Beside More Supermarket Line, Jyothinagar, Karimnagar,
                  Telangana
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-pink-500 mr-3 flex-shrink-0" size={18} />
                <div className="flex flex-col">
                  <span className="text-gray-600 text-sm">9293604899</span>
                  <span className="text-gray-600 text-sm">8374086335</span>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="text-pink-500 mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-600 text-sm break-all">
                  preethiherbalife@gmail.com
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                Working Hours
              </h4>
              <p className="text-gray-600 text-sm">
                Mon - Sat: 9:00 AM - 7:00 PM <br />
                Sun: By Appointment Only
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-gray-900 mb-6">
              Newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for health tips, healthy recipes, and the
              latest center updates.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-50 border-gray-200"
                required
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 Preethi Nutrition Center. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-pink-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-pink-600 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
