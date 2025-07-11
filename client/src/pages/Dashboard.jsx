import React from "react";
import { Book, Layers, PlusCircle, Clock, Component, List } from "lucide-react";
import { Link } from "react-router-dom"

const stats = [
  {
    name: "Total Subjects",
    value: 1240,
    icon: Book,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "Total Systems",
    value: 18,
    icon: Layers,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Total Sub-Systems",
    value: 7,
    icon: Component,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Total Topics",
    value: 320,
    icon: List,
    color: "bg-pink-100 text-pink-600",
  },
];

const recentActivity = [
  {
    type: "Question",
    title: "What is the function of the liver?",
    time: "2 mins ago",
  },
  {
    type: "Subject",
    title: "Added 'Cardiology'",
    time: "10 mins ago",
  },
  {
    type: "System",
    title: "Updated 'Nervous System'",
    time: "30 mins ago",
  },
  {
    type: "User",
    title: "New user registered",
    time: "1 hour ago",
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 h-[calc(100%-72px)] overflow-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="flex items-center p-5 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <div className={`p-3 rounded-full ${stat.color} mr-4`}>
              <stat.icon size={28} />
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/add-subject" className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-400 transition">
            <PlusCircle size={18} /> Add Subject
          </Link>
          <Link to="/add-system" className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-400 transition">
            <PlusCircle size={18} /> Add System
          </Link>
          <Link to="/add-subsystem" className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-400 transition">
            <PlusCircle size={18} /> Add Sub-System
          </Link>
          <Link to="/add-topic" className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-400 transition">
            <PlusCircle size={18} /> Add Topic
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow p-5">
          <ul>
            {recentActivity.map((item, idx) => (
              <li key={idx} className="flex items-center py-2 border-b last:border-b-0">
                <span className="mr-3">
                  <Clock size={18} className="text-gray-400" />
                </span>
                <div>
                  <span className="font-medium text-gray-800">{item.title}</span>
                  <span className="ml-2 text-xs text-gray-400">({item.type})</span>
                  <div className="text-xs text-gray-500">{item.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}