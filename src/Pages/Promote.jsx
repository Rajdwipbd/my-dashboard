import React, { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
import promoteData from "../../public/promote.json";

const Promote = () => {
    const [summary, setSummary] = useState([]);
    const [monthlyPerformance, setMonthlyPerformance] = useState([]);
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        // Local JSON fetch simulation
        setSummary(promoteData.summary);
        setMonthlyPerformance(promoteData.monthlyPerformance);
        setCampaigns(promoteData.campaigns);
    }, []);

    return (
        <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-4">Promote Dashboard</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {summary.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition"
                    >
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                        <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Monthly Campaign Performance */}
            <div className="bg-white p-4 rounded-lg shadow border mb-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Campaign Performance</h3>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyPerformance}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="reach" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="spend" fill="#16A34A" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Campaigns Table */}
            <div className="overflow-x-auto bg-white border rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-4">Recent Campaigns</h3>
                <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-left text-gray-600">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Start Date</th>
                            <th className="p-3">End Date</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Reach</th>
                            <th className="p-3">Spend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((camp) => (
                            <tr key={camp.id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-3">{camp.name}</td>
                                <td className="p-3">{camp.type}</td>
                                <td className="p-3">{camp.start}</td>
                                <td className="p-3">{camp.end}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${camp.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : camp.status === "Paused"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {camp.status}
                                    </span>
                                </td>
                                <td className="p-3">{camp.reach}</td>
                                <td className="p-3">${camp.spend}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Promote;
