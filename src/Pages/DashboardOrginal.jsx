// src/Pages/DashboardOriginal.jsx
import React, { useEffect, useState } from "react";
import { FiUsers, FiUserCheck, FiUserX } from "react-icons/fi";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const DashboardOriginal = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Data fetch
    useEffect(() => {
        fetch("/customers.json")
            .then((res) => res.json())
            .then((data) => {
                setCustomers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Loading data...</p>
            </div>
        );
    }

    const totalCustomers = customers.length;
    const activeMembers = customers.filter((c) => c.status === "Active").length;
    const inactiveMembers = customers.filter((c) => c.status === "Inactive").length;

    const stats = [
        { label: "Total Customers", value: totalCustomers, icon: <FiUsers size={24} className="text-blue-500" /> },
        { label: "Active Members", value: activeMembers, icon: <FiUserCheck size={24} className="text-green-500" /> },
        { label: "Inactive Members", value: inactiveMembers, icon: <FiUserX size={24} className="text-red-500" /> },
    ];

    const chartData = [
        { name: "Total", value: totalCustomers },
        { name: "Active", value: activeMembers },
        { name: "Inactive", value: inactiveMembers },
    ];

    return (
        <div className="m-4">
            {/* Stats */}
            <section className="grid md:grid-cols-3 gap-6 w-full border rounded-lg p-6 bg-white">
                {stats.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-gray-100 p-4 rounded">
                        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow">
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">{item.label}</p>
                            <p className="text-xl font-bold">{item.value}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Chart */}
            <section className="bg-white mt-6 p-6 border rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Customer Overview</h2>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    );
};

export default DashboardOriginal;
