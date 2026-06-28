"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { hashPassword, validatePasswordStrength } from "@/utils/security";
import { Shield } from "lucide-react";

export default function AdminSettings() {
  const { currentUser, setUsers, users } = useGlobalContext();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
    const adminUser = users.find(u => u.id === currentUser?.id);
    
    if (!adminUser) return;
    
    if (adminUser.password !== hashedCurrent && adminUser.password !== currentPassword) {
      setError("Incorrect current password.");
      return;
    }

    // Update to new password
    const hashedNew = await hashPassword(newPassword);
    
    setUsers(users.map(u => 
      u.id === currentUser?.id ? { ...u, password: hashedNew } : u
    ));

    setSuccessMsg("Administrator password has been successfully updated.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
        <p className="text-gray-500">Manage your administrator account security.</p>
      </div>

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
            <Button type="submit">
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
