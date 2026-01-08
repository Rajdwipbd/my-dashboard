import React, { useEffect, useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import Dashboard from "../Pages/Dashboard";

const options = ["Default", "A - Z", "Z - A", "Active", "Inactive"];

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState("Default");
    const [showOptions, setShowOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const perPage = 12;

    useEffect(() => {
        fetch("/customers.json")
            .then(res => res.json())
            .then(data => {
                setCustomers(data);
                setLoading(false); // Data loaded
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    // Show loading state
    if (loading) {
        return (
            <div className="w-full my-3 mx-5 flex justify-center items-center h-64">
                <p className="text-lg">Loading data...</p>
            </div>
        );
    }

    // Active & Inactive members for dashboard
    const activeMembers = customers.filter(item => item.status === "Active");
    const inactiveMembers = customers.filter(item => item.status === "Inactive");

    // Filter by search term
    const filteredData = customers.filter(customer =>
        customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered data
    const sortedData = [...filteredData].sort((a, b) => {
        if (sortType === "A - Z") return a.customerName.localeCompare(b.customerName);
        if (sortType === "Z - A") return b.customerName.localeCompare(a.customerName);
        if (sortType === "Active") return a.status === "Active" ? -1 : 1;
        if (sortType === "Inactive") return a.status === "Inactive" ? -1 : 1;
        return 0; // Default
    });

    // Pagination
    const totalPages = Math.ceil(sortedData.length / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    return (
        <div className="w-full my-3 mx-5">
            {/* Dashboard Component */}
            <Dashboard
                totalCustomers={customers.length}
                activeMembers={activeMembers.length}
                inactiveMembers={inactiveMembers.length}
            />

            {/* Search + Sort */}
            <section className="flex justify-between mx-2 my-4">
                <div>
                    <h4 className="font-semibold">All Customers</h4>
                    <p className="text-blue-500">Active Members</p>
                </div>

                <div className="flex gap-4 items-center w-full max-w-lg">
                    {/* Search Box */}
                    <div className="w-full bg-white border rounded-lg flex items-center gap-2 px-3 py-2 shadow-sm">
                        <FiSearch className="text-gray-500 text-xl" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-1 outline-none text-gray-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowOptions(!showOptions)}
                            className="flex items-center gap-2 px-4 bg-gray-100 border rounded-md hover:bg-gray-200"
                        >
                            <span className="px-2 text-sm">Sort: {sortType}</span>
                            <FiChevronDown />
                        </button>

                        {showOptions && (
                            <div className="absolute mt-1 bg-white w-28 border rounded-md shadow-md z-10">
                                {options.map((item) => (
                                    <p
                                        key={item}
                                        className={`px-3 py-1 cursor-pointer hover:bg-gray-200 ${item === sortType ? "bg-gray-200 font-medium" : ""}`}
                                        onClick={() => {
                                            setSortType(item);
                                            setShowOptions(false);
                                        }}
                                    >
                                        {item}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Table */}
            <section className="overflow-x-auto border rounded-md bg-white shadow-sm">
                <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-100 text-left text-gray-600">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Country</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map(customer => (
                            <tr key={customer.id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-3">{customer.customerName}</td>
                                <td className="p-3">{customer.category}</td>
                                <td className="p-3">{customer.phone}</td>
                                <td className="p-3">{customer.email}</td>
                                <td className="p-3">{customer.country}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs ${customer.status === "Active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}>
                                        {customer.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Pagination */}
            <div className="flex justify-center gap-3 my-4">
                <button
                    onClick={() => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev))}
                    className="px-4 py-1 border rounded hover:bg-gray-200"
                >
                    Prev
                </button>
                <span className="font-medium">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev))}
                    className="px-4 py-1 border rounded hover:bg-gray-200"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Customers;