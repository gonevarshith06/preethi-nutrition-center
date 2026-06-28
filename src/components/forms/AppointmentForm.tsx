"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useGlobalContext } from "@/context/GlobalContext";

export const AppointmentForm = () => {
  const { appointments, setAppointments, currentUser } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: currentUser?.fullName || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
    date: "",
    time: "",
    healthGoal: "",
    reason: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment = {
      id: Math.random().toString(36).substring(7),
      ...formData,
      status: "Pending" as const,
    };
    setAppointments([...appointments, newAppointment]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
    // Reset if not logged in
    if (!currentUser) {
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        healthGoal: "",
        reason: "",
      });
    } else {
      setFormData({
        ...formData,
        date: "",
        time: "",
        healthGoal: "",
        reason: "",
      });
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-3xl text-center shadow-sm">
        <h3 className="text-xl font-bold mb-2">Appointment Request Sent!</h3>
        <p>Our team will contact you shortly to confirm your slot.</p>
        <Button
          variant="outline"
          className="mt-6 border-green-600 text-green-700 hover:bg-green-100"
          onClick={() => setSuccess(false)}
        >
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number"
        />
      </div>
      <Input
        label="Email Address"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={handleChange}
        placeholder="john@example.com"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Appointment Date"
          name="date"
          type="date"
          required
          value={formData.date}
          onChange={handleChange}
        />
        <Input
          label="Appointment Time"
          name="time"
          type="time"
          required
          value={formData.time}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-medium text-gray-700">Health Goal</label>
        <select
          name="healthGoal"
          required
          value={formData.healthGoal}
          onChange={handleChange}
          className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="" disabled>Select a goal</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Weight Gain">Weight Gain</option>
          <option value="Diabetes Management">Diabetes Management</option>
          <option value="PCOS">PCOS Management</option>
          <option value="Pregnancy Nutrition">Pregnancy Nutrition</option>
          <option value="General Fitness">General Fitness / Zumba</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-medium text-gray-700">Reason for Visit</label>
        <textarea
          name="reason"
          required
          value={formData.reason}
          onChange={handleChange}
          rows={3}
          placeholder="Briefly describe your current health situation or concerns..."
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
        />
      </div>
      <Button type="submit" className="w-full h-14 text-lg mt-4">
        Book Appointment
      </Button>
    </form>
  );
};
