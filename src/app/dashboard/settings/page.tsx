"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { hashPassword, validatePasswordStrength } from "@/utils/security";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UserSettings() {
  const { currentUser, setUsers, users, logout } = useGlobalContext();
  const router = useRouter();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    const strength = validatePasswordStrength(newPassword);
    if (!strength.isValid) {
      setError(strength.message);
      return;
    }

    // Verify current password
    const hashedCurrent = await hashPassword(currentPassword);
    const user = users.find(u => u.id === currentUser.id);
    
    if (!user) return;
    
    // Fallback to plaintext comparison only if it's an old legacy account without hashing
    if (user.password !== hashedCurrent && user.password !== currentPassword && user.password) {
      setError("Incorrect current password.");
      return;
    }

    // Update to new password
    const hashedNew = await hashPassword(newPassword);
    
    setUsers(users.map(u => 
      u.id === currentUser.id ? { ...u, password: hashedNew } : u
    ));

    setSuccessMsg("Your password has been updated. Please log in again with your new password.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    // Auto-logout after 3 seconds
    setTimeout(() => {
      logout();
      router.push("/");
    }, 3000);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors mb-6 font-medium">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your profile and security preferences.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-none shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <Shield className="text-pink-500" />
              <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            
            {successMsg && (
              <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl text-sm font-medium">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
              <Input 
                label="Current Password"
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
              
              <div className="space-y-4 pt-4 border-t border-gray-50">
                <Input 
                  label="New Password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                
                <Input 
                  label="Confirm New Password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.
                </p>
              </div>

              <div className="pt-2">
                <Button type="submit" disabled={!!successMsg}>
                  Update Password
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
