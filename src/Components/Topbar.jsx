// Topbar.jsx
import { FiSearch } from "react-icons/fi";

const Topbar = () => {
    return (
        <div className="flex justify-between items-center bg-white px-6 py-4 shadow-sm border-b">

            {/* Left text */}
            <h2 className="text-xl font-semibold">Hello Evano 👋</h2>

            {/* Right Search Box */}
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl w-72">
                <FiSearch className="text-gray-500" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none ml-2 w-full text-sm"
                />
            </div>
        </div>
    );
};

export default Topbar;

