"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Package, 
  PenTool, 
  Users, 
  LogOut,
  Menu,
  X,
  Settings
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useGlobalContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!currentUser || currentUser.role !== "admin") {
      router.push("/");
    }
  }, [currentUser, router]);

  if (!mounted || !currentUser || currentUser.role !== "admin") return null;

  const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Appointments", href: "/admin/appointments", icon: Calendar },
    { name: "Manage Posts", href: "/admin/posts", icon: FileText },
    { name: "Share Products", href: "/admin/products", icon: Package },
    { name: "Manage Blogs", href: "/admin/blogs", icon: PenTool },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-20 flex items-center px-6 border-b border-gray-100 justify-between">
          <Link href="/admin" className="font-playfair text-xl font-bold text-pink-600">
            Admin<span className="text-gray-800">Panel</span>
          </Link>
          <button className="lg:hidden text-gray-500" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                  isActive 
                    ? "bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md" 
                    : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                }`}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            );
          })}
          
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-red-600 hover:bg-red-50 w-full text-left mt-8"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar (Mobile) */}
        <div className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
            <Menu size={24} />
          </button>
          <span className="ml-4 font-playfair font-bold text-lg text-gray-900">Admin</span>
        </div>
        
        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
