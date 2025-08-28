import React, { useEffect, useState } from "react";
import { Book, Layers, PlusCircle, Component, List } from "lucide-react";
import { Link } from "react-router-dom"
import axios from 'axios';
import { API_BASE_URL } from "@config/api";


const statsDesign = [
    {
        icon: Book,
        color: "bg-indigo-100 text-indigo-600",
    },
    {
        icon: Layers,
        color: "bg-green-100 text-green-600",
    },
    {
        icon: Component,
        color: "bg-yellow-100 text-yellow-600",
    },
    {
        icon: List,
        color: "bg-pink-100 text-pink-600",
    },
];


const recentQuestions = [
    {
        title: "What are the main functions of the cardiovascular system?",
        subject: "Cardiology",
        difficulty: "Medium",
        type: "MCQ",
        time: "5 mins ago",
    },
    {
        title: "Explain the process of cellular respiration in detail",
        subject: "Biochemistry",
        difficulty: "Hard",
        type: "Essay",
        time: "15 mins ago",
    },
    {
        title: "What is the role of insulin in glucose metabolism?",
        subject: "Endocrinology",
        difficulty: "Easy",
        type: "MCQ",
        time: "1 hour ago",
    },
    {
        title: "Describe the anatomy of the human brain",
        subject: "Neurology",
        difficulty: "Medium",
        type: "MCQ",
        time: "2 hours ago",
    },
];

export default function AdminDashboard() {

    const [stats, setStats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    // Fetching Dashboard Data

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {

                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/dashboard/summary`);
                const rawStats = Object.entries(response.data)

                const mergedStats = rawStats.map(([key, value], index) => {
                    const design = statsDesign[index] || {};

                    return {
                        key,
                        value,
                        icon: design.icon,
                        color: design.color
                    }

                })

                setStats(mergedStats)
            } catch (error) {
                setError("Failed to fetch Dashboard Data.");
                console.error("Error fetching Dashboard Data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardData()
    }, [])

    return (
        <div className="p-6 h-[calc(100%-72px)] overflow-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {
                    loading ? Array(4).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center p-5 rounded-xl bg-gray-100 animate-pulse">
                            <div className="p-3 rounded-full bg-gray-300 rounded-full mr-4 h-11 w-11"></div>
                            <div>
                                <div className="h-4 bg-gray-300 rounded w-5 mb-2"></div>
                                <div className="h-6 bg-gray-300 rounded w-25"></div>
                            </div>
                        </div>
                    )) :
                        stats.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center p-5 bg-white rounded-xl shadow hover:shadow-lg transition"
                            >
                                <div className={`p-3 rounded-full ${item.color} mr-4`}>
                                    <item.icon size={28} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{item.value}</div>
                                    <div className="text-gray-500 text-sm">{item.key}</div>
                                </div>
                            </div>
                        ))
                }
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link to="/admin/add-subject"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-400 transition">
                        <PlusCircle size={18} /> Add Subject
                    </Link>
                    <Link to="/admin/add-system"
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-400 transition">
                        <PlusCircle size={18} /> Add System
                    </Link>
                    <Link to="/admin/add-subsystem"
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-400 transition">
                        <PlusCircle size={18} /> Add Sub-System
                    </Link>
                    <Link to="/admin/add-topic"
                        className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-400 transition">
                        <PlusCircle size={18} /> Add Topic
                    </Link>
                    <Link to="/admin/add-question     "
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-400 transition">
                        <PlusCircle size={18} /> Add Question
                    </Link>
                </div>
            </div>

            {/* Recent Questions */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Recent Questions</h2>
                <div className="bg-white rounded-xl shadow p-5">
                    <ul>
                        {recentQuestions.map((question, idx) => (
                            <li key={idx} className="flex items-start py-3 border-b border-gray-200 last:border-b-0">
                                <span className="mr-3 mt-1">
                                    <Book size={16} className="text-blue-400" />
                                </span>
                                <div className="flex-1">
                                    <div
                                        className="font-medium text-gray-800 text-sm line-clamp-2">{question.title}</div>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-gray-500">{question.subject}</span>
                                        <span className="text-xs text-gray-400">{question.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${question.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                                                question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                                                    'bg-red-100 text-red-600'
                                                }`}>{question.difficulty}</span>
                                        <span
                                            className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">{question.type}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}