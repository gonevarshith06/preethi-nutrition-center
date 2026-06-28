"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Calendar, User as UserIcon, Bell, ClipboardList, LogOut } from "lucide-react";

export default function UserDashboard() {
  const { currentUser, appointments, logout } = useGlobalContext();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!currentUser) {
      router.push("/");
    } else if (currentUser.role === "admin") {
      router.push("/admin");
    }
  }, [currentUser, router]);

  if (!mounted || !currentUser) return null;

  const myAppointments = appointments.filter(
    (app) => app.email === currentUser.email || app.name === currentUser.fullName
  );

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-3xl font-bold text-gray-900"
          >
            Welcome back, <span className="text-pink-600">{currentUser.fullName.split(' ')[0]}</span>!
          </motion.h1>
          <p className="text-gray-600 mt-2">Manage your appointments and nutrition journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* My Appointments */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-none shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <Calendar className="text-pink-500" />
                  <h2 className="text-xl font-bold text-gray-900">My Appointments</h2>
                </div>
                
                {myAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {myAppointments.map(app => (
                      <div key={app.id} className="p-4 bg-gray-50 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <p className="font-semibold text-gray-900">{app.healthGoal}</p>
                          <p className="text-sm text-gray-500">{app.date} at {app.time}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          app.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    You have no upcoming appointments.
                  </div>
                )}
              </Card>
            </motion.div>

            {/* My Diet Plans */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-none shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <ClipboardList className="text-pink-500" />
                  <h2 className="text-xl font-bold text-gray-900">My Diet Plans</h2>
                </div>
                <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p>No active diet plans assigned.</p>
                  <button className="text-pink-600 font-medium text-sm mt-2 hover:underline">
                    Explore Plans
                  </button>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            
            {/* Profile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-none shadow-sm bg-gradient-to-br from-pink-50 to-white text-center p-8">
                <div className="w-20 h-20 bg-pink-200 text-pink-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  {currentUser.fullName.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{currentUser.fullName}</h2>
                <p className="text-gray-500 text-sm mb-6">{currentUser.email}</p>
                <Link href="/dashboard/settings" className="w-full block py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Edit Profile
                </Link>
              </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-none shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="text-pink-500" size={20} />
                  <h2 className="font-bold text-gray-900">Notifications</h2>
                </div>
                <div className="space-y-3">
                  <div className="text-sm p-3 bg-blue-50 text-blue-800 rounded-xl border border-blue-100">
                    Welcome to Preethi Nutrition Center!
                  </div>
                  {myAppointments.some(a => a.status === 'Approved') && (
                    <div className="text-sm p-3 bg-green-50 text-green-800 rounded-xl border border-green-100">
                      Your appointment has been approved!
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}
