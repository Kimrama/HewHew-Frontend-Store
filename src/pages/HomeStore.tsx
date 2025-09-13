import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import default_image from "../assets/default-featured-image.jpg";
import { Pencil } from "lucide-react";
import { getStore, toggleStoreState } from "../api/store";
import { set } from "react-hook-form";

export default function HomeStore() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [storeName, setStoreName] = useState<string | null>(null);
    const [canteen, setCanteen] = useState<string | null>(null);
    const [state, setState] = useState(false);
    const [storeImage, setStoreImage] = useState<string>(default_image);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            const store = await getStore();
            console.log(store);
            setStoreName(store.name);
            setCanteen(store.canteen_name);
            setState(store.state);
            setStoreImage(store.shopimg || default_image);
        };
        fetchData();
    }, []);

    if (!isAuthenticated) {
        return null;
    }
    async function handleToggleChange() {
        if (state) {
            setState(false);
            try {
                const response = await toggleStoreState({ state: "close" });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        } else {
            setState(true);
            try {
                const response = await toggleStoreState({ state: "open" });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="flex h-screen flex-col p-8">
            <div className="flex mt-8 gap-12 bg-white p-8 rounded-lg shadow-lg">
                <img
                    className="size-72 object-cover shadow-lg rounded-lg"
                    src={storeImage}
                    alt="mask image"
                />
                <div className="flex flex-col justify-between w-full">
                    <div>
                        <h1 className="text-6xl font-semibold font-thai mb-8">
                            ชื่อร้าน:{" "}
                            {storeName === "Default Shop Name"
                                ? "[ยังไม่ระบุ]"
                                : storeName}
                        </h1>
                        <h2 className="text-4xl font-semibold font-thai">
                            โรงอาหาร:{" "}
                            {canteen === "Default Canteen"
                                ? "[ยังไม่ระบุ]"
                                : canteen}
                        </h2>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div className="space-y-4">
                            <div className="flex  gap-3 items-center">
                                <input
                                    type="checkbox"
                                    id="switchStateSuccess2"
                                    className="switch switch-outline switch-primary is-valid mt-2"
                                    checked={state ?? false}
                                    onChange={handleToggleChange}
                                />
                                <label
                                    htmlFor="switchStateSuccess2"
                                    className="label-text cursor-pointer flex flex-col justify-center "
                                >
                                    <span className="text-base">
                                        เปิดการมองเห็นร้านค้า
                                    </span>
                                    <span>
                                        ทำให้ผู้ใช้สามารถมองเห็นร้านค้านี้ได้
                                    </span>
                                </label>
                            </div>
                        </div>
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
