import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import default_image from "../assets/default-featured-image.jpg";
import SettingSwitches from "../components/ui/SettingSwitch";
import { Pencil } from "lucide-react";

export default function HomeStore() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex h-screen flex-col p-8">
            <div className="flex mt-8 gap-12 bg-white p-8 rounded-lg shadow-lg">
                <img
                    className="size-72 object-cover shadow-lg rounded-lg"
                    src={default_image}
                    alt="mask image"
                />
                <div className="flex flex-col justify-between w-full">
                    <div>
                        <h1 className="text-6xl font-semibold font-thai mb-8">
                            ชื่อร้าน: [ยังไม่ระบุ]
                        </h1>
                        <h2 className="text-4xl font-semibold font-thai">
                            โรงอาหาร: [ยังไม่ระบุ]
                        </h2>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <SettingSwitches
                            label="เปิดการมองเห็นร้านค้า"
                            description="ทำให้ลูกค้ามองเห็นร้านนี้"
                        />
                        <button
                            className="btn btn-outline btn-primary"
                            onClick={() => navigate("/edit-store")}
                        >
                            <Pencil />
                            แก้ไขข้อมูลร้าน
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
