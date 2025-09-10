import Sidebar from "../components/Sidebar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative bg-gradient-to-b from-[#ffe8db] to-white">
            <Sidebar />
            <main className="p-6 ml-60 transition-all duration-300 ">
                {children}
            </main>
        </div>
    );
}
