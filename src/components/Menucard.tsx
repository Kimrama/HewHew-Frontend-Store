import { type MenuItem } from "../api/menu";
import default_image from "../assets/default-featured-image.jpg";
import SettingsSwitches from "./ui/SettingSwitch";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
export default function MenuCard({ menu }: { menu: MenuItem }) {
    const navigate = useNavigate();
    return (
        <div className="card sm:card-side mb-8 w-full bg-neutral-50">
            <figure className="object-cover w-2/5">
                <img
                    src={menu.ImageURL || default_image}
                    // alt="headphone"
                    className="object-cover w-4xl"
                />
            </figure>
            <div className="card-body w-full">
                <h5 className="card-title mb-0.5">{menu.Name}</h5>
                <p className="mb-2 line-clamp-4">{menu.Detail}</p>
                <div className="card-actions flex justify-between items-center">
                    <SettingsSwitches
                        label="เปิดให้มองเห็น"
                        description="ทำให้ผู้ใช้สามารถมองเห็นอาหารนี้ได้"
                    />
                    <button
                        className="btn btn-outline btn-primary"
                        onClick={() => navigate("/edit-store")}
                    >
                        <Pencil />
                        แก้ไขอาหาร
                    </button>
                </div>
            </div>
        </div>
    );
}
