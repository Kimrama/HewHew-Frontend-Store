import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#ffe8db] to-white">
            <Outlet />
        </div>
    );
}
