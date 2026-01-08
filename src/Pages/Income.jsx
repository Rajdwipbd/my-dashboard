import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const Income = () => {
    const incomeStats = [
        { label: "Total Income", value: 12500 },
        { label: "This Month", value: 3200 },
        { label: "This Week", value: 800 },
        { label: "Pending Payments", value: 400 },
    ];

    const monthlyIncome = [
        { month: "Jan", income: 1000 },
        { month: "Feb", income: 1200 },
        { month: "Mar", income: 900 },
        { month: "Apr", income: 1500 },
        { month: "May", income: 1300 },
        { month: "Jun", income: 1100 },
        { month: "Jul", income: 1400 },
        { month: "Aug", income: 1250 },
        { month: "Sep", income: 1350 },
        { month: "Oct", income: 1450 },
        { month: "Nov", income: 1600 },
        { month: "Dec", income: 1700 },
    ];

    const transactions = [
        { date: "2025-12-01", source: "Freelancing", amount: 300, status: "Received" },
        { date: "2025-12-02", source: "Product Sale", amount: 50, status: "Pending" },
        { date: "2025-12-03", source: "Investments", amount: 200, status: "Received" },
        { date: "2025-12-04", source: "Freelancing", amount: 400, status: "Received" },
        { date: "2025-12-05", source: "Product Sale", amount: 100, status: "Pending" },
    ];

    return (
        <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-4">Income Overview</h2>

            {/* Summary Cards with border */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {incomeStats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow hover:shadow-md transition border border-gray-200"
                    >
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                        <p className="text-xl font-bold">${stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Monthly Income Chart */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Monthly Income</h3>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyIncome}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="income" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Transaction Table */}
            <div className="overflow-x-auto bg-white border rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-left text-gray-600">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Source</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx, idx) => (
                            <tr key={idx} className="border-b hover:bg-gray-50 transition">
                                <td className="p-3">{tx.date}</td>
                                <td className="p-3">{tx.source}</td>
                                <td className="p-3">${tx.amount}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${tx.status === "Received"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Income;
