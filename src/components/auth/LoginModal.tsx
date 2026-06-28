"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { hashPassword, validatePasswordStrength } from "@/utils/security";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [viewMode, setViewMode] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { login, users, setUsers } = useGlobalContext();
  const router = useRouter();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setPhone("");
    setWeight("");
    setHeight("");
    setConfirmPassword("");
    setError("");
    setSuccessMsg("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const user = users.find((u) => u.email === email);

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    const hashedInput = await hashPassword(password);
    
    // Note: If user was created before hashing was introduced and has plaintext password,
    // we fallback to plain comparison just for backwards compatibility in this mock.
    if (user.password === hashedInput || user.password === password || !user.password) {
      login(user);
      onClose();
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const strength = validatePasswordStrength(password);
    if (!strength.isValid) {
      setError(strength.message);
      return;
    }

    if (users.find((u) => u.email === email)) {
      setError("User with this email already exists");
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
      id: Math.random().toString(36).substring(7),
      fullName,
      email,
      phone,
      weight,
      height,
      password: hashedPassword,
      role: "user" as const,
    };

    setUsers([...users, newUser]);
    login(newUser);
    onClose();
    router.push("/dashboard");
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const user = users.find((u) => u.email === email);
    
    if (!user) {
      setError("If that email is registered, a reset link will be sent.");
      return;
    }

    // Since this is a mock frontend, we just simulate sending an email.
    // In a real app, this would hit an API endpoint that sends a token.
    setSuccessMsg(`A password reset link has been sent to ${email}`);
    setTimeout(() => {
      setViewMode("login");
      setSuccessMsg("");
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 flex-shrink-0">
                <h2 className="font-playfair text-2xl font-bold text-gray-900">
                  {viewMode === "login" && "Welcome Back"}
                  {viewMode === "register" && "Create Account"}
                  {viewMode === "forgot" && "Reset Password"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
                    {error}
                  </div>
                )}
                
                {successMsg && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-100 text-green-700 rounded-xl text-sm">
                    {successMsg}
                  </div>
                )}

                {viewMode === "login" && (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                    <Input
                      label="Password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                        />
                        <span className="text-sm text-gray-600">Remember Me</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setViewMode("forgot");
                          resetForm();
                        }}
                        className="text-sm font-medium text-pink-600 hover:text-pink-700"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <Button type="submit" className="w-full mt-6">
                      Login
                    </Button>
                    <p className="text-center text-sm text-gray-600 mt-6">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setViewMode("register");
                          resetForm();
                        }}
                        className="font-medium text-pink-600 hover:text-pink-700"
                      >
                        Register
                      </button>
                    </p>
                  </form>
                )}

                {viewMode === "register" && (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <Input
                      label="Full Name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your phone number"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Weight (kg)"
                        type="number"
                        step="0.1"
                        required
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g. 65.5"
                      />
                      <Input
                        label="Height (cm)"
                        type="number"
                        required
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 165"
                      />
                    </div>
                    <Input
                      label="Password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                    />
                    <Input
                      label="Confirm Password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                    />
                    <p className="text-xs text-gray-500 -mt-2">
                      Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character.
                    </p>
                    <Button type="submit" className="w-full mt-6">
                      Create Account
                    </Button>
                    <p className="text-center text-sm text-gray-600 mt-6">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setViewMode("login");
                          resetForm();
                        }}
                        className="font-medium text-pink-600 hover:text-pink-700"
                      >
                        Login
                      </button>
                    </p>
                  </form>
                )}

                {viewMode === "forgot" && (
                  <form onSubmit={handleForgot} className="space-y-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Enter the email address associated with your account and we'll send you a link to reset your password.
                    </p>
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                    <Button type="submit" className="w-full mt-6">
                      Send Reset Link
                    </Button>
                    <p className="text-center text-sm text-gray-600 mt-6">
                      Remember your password?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setViewMode("login");
                          resetForm();
                        }}
                        className="font-medium text-pink-600 hover:text-pink-700"
                      >
                        Login
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
