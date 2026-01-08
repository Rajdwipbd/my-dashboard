import React, { useState, useEffect } from "react";
import helpData from "../../public/help.json";
import { FiMail, FiPhone, FiClock } from "react-icons/fi";

const Help = () => {
    const [faqs, setFaqs] = useState([]);
    const [support, setSupport] = useState({});

    useEffect(() => {
        setFaqs(helpData.faqs);
        setSupport(helpData.support);
    }, []);

    return (
        <div className="w-full min-h-screen p-6 bg-gray-100 mx-8 my-4 rounded-2xl">
            <div className="max-w-7xl mx-auto w-full">
                <h2 className="text-3xl font-bold mb-4">Help Center</h2>
                <p className="text-gray-600 mb-6">
                    Find answers to common questions or contact our support team.
                </p>

                {/* FAQ Section */}
                <div className="w-full bg-white p-6 rounded-lg shadow border mb-6">
                    <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-3">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="p-4 border rounded hover:bg-gray-50 transition"
                            >
                                <p className="font-medium">{faq.question}</p>
                                <p className="text-gray-600 mt-1 text-sm">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Support Contact Section */}
                <div className="w-full bg-white p-6 rounded-lg shadow border">
                    <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
                    <div className="space-y-3">
                        <p className="flex items-center gap-3 text-gray-700">
                            <FiMail className="text-blue-500" /> Email: {support.email}
                        </p>
                        <p className="flex items-center gap-3 text-gray-700">
                            <FiPhone className="text-green-500" /> Phone: {support.phone}
                        </p>
                        <p className="flex items-center gap-3 text-gray-700">
                            <FiClock className="text-yellow-500" /> Hours: {support.hours}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
