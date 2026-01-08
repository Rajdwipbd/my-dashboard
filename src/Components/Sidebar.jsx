import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiShoppingBag, FiDollarSign, FiPieChart, FiHelpCircle, FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: "Dashboard", to: "/dashboard", icon: <FiHome /> },
        { name: "Products", to: "/products", icon: <FiShoppingBag /> },
        { name: "Customers", to: "/customers", icon: <FiUsers /> },
        { name: "Income", to: "/income", icon: <FiDollarSign /> },
        { name: "Promote", to: "/promote", icon: <FiPieChart /> },
        { name: "Help", to: "/help", icon: <FiHelpCircle /> },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-md bg-white shadow"
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md border-r flex flex-col justify-between z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:sticky md:top-0`}
            >
                {/* Logo */}
                <div>
                    <h1 className="text-2xl font-bold px-6 py-6">
                        <span className="text-yellow-300">D</span>ash<span className="text-gray-700"><span className="text-red-300">b</span>oar<span className="text-green-300">d</span></span><span className="text-indigo-500">.</span>
                    </h1>

                    {/* Menu Items */}
                    <nav className="mt-6 space-y-1">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-indigo-500 hover:bg-indigo-50 transition ${isActive ? "bg-indigo-50 text-indigo-500 font-semibold" : ""
                                    }`
                                }
                                onClick={() => setIsOpen(false)} // Mobile এ click করলে sidebar hide হবে
                            >
                                {item.icon} {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Bottom User Info */}
                <div className="px-6 py-5 border-t bg-gray-50">
                    <p className="text-sm font-medium">Evano</p>
                    <p className="text-xs text-gray-500">Project Manager</p>
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
