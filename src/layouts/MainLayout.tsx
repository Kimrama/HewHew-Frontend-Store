import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div className="flex bg-gradient-to-b from-[#ffe8db] to-white min-h-screen">
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <main className={`w-full transition-all duration-300 ml-16`}>
                {children}
            </main>
        </div>
    );
}
