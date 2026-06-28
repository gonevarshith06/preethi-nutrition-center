"use client";

import React from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Card } from "@/components/ui/Card";
import { Users, Calendar, FileText, Package, PenTool } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { users, appointments, posts, products, blogs } = useGlobalContext();

  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "Total Appointments", value: appointments.length, icon: Calendar, color: "text-pink-500", bg: "bg-pink-100" },
    { label: "Total Posts", value: posts.length, icon: FileText, color: "text-green-500", bg: "bg-green-100" },
    { label: "Total Products", value: products.length, icon: Package, color: "text-purple-500", bg: "bg-purple-100" },
    { label: "Total Blogs", value: blogs.length, icon: PenTool, color: "text-orange-500", bg: "bg-orange-100" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to the Preethi Nutrition Center admin panel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="flex items-center gap-4 p-6 border-none shadow-sm">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Appointments</h2>
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.slice(-5).reverse().map(app => (
                <div key={app.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-sm">{app.name}</p>
                    <p className="text-xs text-gray-500">{app.date} • {app.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent appointments.</p>
          )}
        </Card>

        <Card className="border-none shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Users</h2>
          {users.length > 0 ? (
            <div className="space-y-4">
              {users.slice(-5).reverse().map(user => (
                <div key={user.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-sm">{user.fullName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-1 rounded-md">{user.role}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent users.</p>
          )}
        </Card>
      </div>

    </div>
  );
}
