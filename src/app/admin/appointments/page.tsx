"use client";

import React, { useState } from "react";
import { useGlobalContext, Appointment } from "@/context/GlobalContext";
import { Card } from "@/components/ui/Card";
import { Search, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ManageAppointments() {
  const { appointments, setAppointments } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAppointments = appointments.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateStatus = (id: string, status: Appointment["status"]) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const deleteAppointment = (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter(app => app.id !== id));
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Appointments</h1>
          <p className="text-gray-500">View and update client appointment requests.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Client</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date & Time</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Reason</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(app => (
                  <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.email}</p>
                      <p className="text-xs text-gray-400">{app.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <p>{app.date}</p>
                      <p className="text-gray-500">{app.time}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                      <span title={app.reason}>{app.healthGoal}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value as Appointment["status"])}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border-none focus:ring-2 cursor-pointer ${
                          app.status === 'Approved' ? 'bg-green-100 text-green-700 focus:ring-green-500' :
                          app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 focus:ring-yellow-500' :
                          app.status === 'Completed' ? 'bg-blue-100 text-blue-700 focus:ring-blue-500' :
                          'bg-red-100 text-red-700 focus:ring-red-500'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => deleteAppointment(app.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
