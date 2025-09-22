import { Link } from "react-router-dom";
import { Menu, ChevronLeft, Home, LogOut, Utensils } from "lucide-react";

export default function Sidebar({
    isCollapsed,
    setIsCollapsed,
}: {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}) {
    return (
        <div
            className={`fixed top-0 left-0 h-screen bg-white text-gray-800 transition-all duration-300
            ${isCollapsed ? "w-16" : "w-64"}`}
        >
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
                {!isCollapsed && (
                    <h2 className="text-lg font-bold whitespace-nowrap overflow-hidden transition-all duration-300">
                        HewHew - Store
                    </h2>
                )}
                <button onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? (
                        <Menu size={20} />
                    ) : (
                        <ChevronLeft size={20} />
                    )}
                </button>
            </div>

            <nav className="flex flex-col justify-between h-[calc(100%-64px)]">
                <div className="flex flex-col space-y-2 mt-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                    >
                        <Home size={20} />
                        <span
                            className={`whitespace-nowrap overflow-hidden transition-all duration-300 
    ${isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"}`}
                        >
                            Home
                        </span>
                    </Link>
                    <Link
                        to="/menu"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                    >
                        <Utensils size={20} />
                        <span
                            className={`whitespace-nowrap overflow-hidden transition-all duration-300 
    ${isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"}`}
                        >
                            Menu
                        </span>
                    </Link>
                </div>

                <div className="mb-4">
                    <button
                        onClick={() => {
                            const isConfirm = window.confirm(
                                "Do you want to logout?"
                            );
                            if (isConfirm) {
                                localStorage.removeItem("token");
                                window.location.href = "/auth/signin";
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-200"
                    >
                        <LogOut size={20} />
                        <span
                            className={`whitespace-nowrap overflow-hidden transition-all duration-300 
    ${isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"}`}
                        >
                            Logout
                        </span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
