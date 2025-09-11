import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronLeft, Home, User, LogOut, Utensils } from "lucide-react";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div
            className={`fixed top-0 left-0 h-screen bg-white text-gray-800 transition-all duration-100 
  ${isCollapsed ? "w-16" : "w-64"}`}
        >
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
                {!isCollapsed && (
                    <h2 className="text-lg font-bold fixed left-16">
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
                        {!isCollapsed && (
                            <span className="fixed left-16">Home</span>
                        )}
                    </Link>
                    <Link
                        to="/menu"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                    >
                        <Utensils size={20} />
                        {!isCollapsed && (
                            <span className="fixed left-16">Menu</span>
                        )}
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
                            } else {
                                return;
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-200"
                    >
                        <LogOut size={20} />
                        {!isCollapsed && (
                            <span className="fixed left-16">Logout</span>
                        )}
                    </button>
                </div>
            </nav>
        </div>
    );
}
