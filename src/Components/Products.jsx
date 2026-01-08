import React, { useState, useEffect } from "react";
import productsData from "../../public/products.json"; // Ensure path is correct

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(productsData);
    }, []);

    return (
        <div className="w-full p-4 mx-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out w-full flex flex-col"
                    >
                        <div className="mb-3 h-40 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden w-full">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="object-cover h-full w-full"
                                />
                            ) : (
                                <span className="text-gray-400">No Image</span>
                            )}
                        </div>

                        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                        <p className="text-gray-800 font-bold mb-2">${product.price}</p>

                        <span
                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${product.status === "Available"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {product.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
