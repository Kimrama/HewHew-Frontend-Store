import { Save, X } from "lucide-react";
import default_image from "../assets/default-featured-image.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
    editStore,
    getCanteenList,
    getStore,
    uploadStoreImage,
    type Canteen,
} from "../api/store";

export default function EditStore() {
    const navigate = useNavigate();
    const [preview, setPreview] = useState<string>(default_image);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [storeName, setStoreName] = useState<string>("");
    const [canteen, setCanteen] = useState<string>("");
    const [canteenList, setCanteenList] = useState<Canteen[]>([]);

    useEffect(() => {
        async function fetchStore() {
            try {
                const store = await getStore();
                setStoreName(store.name);
                if (store.canteen_name !== "Default Canteen") {
                    setCanteen(store.canteen_name);
                }
                console.log(canteen);
            } catch (error) {
                console.error("Error fetching store:", error);
            }
        }
        async function fetchCanteens() {
            try {
                const response = await getCanteenList();
                setCanteenList(response.canteens);
            } catch (error) {
                console.error("Error fetching canteens:", error);
            }
        }
        fetchStore();
        fetchCanteens();
    }, []);
    function handleImageClick() {
        fileInputRef.current?.click();
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setImageFile(selectedFile);
            const url = URL.createObjectURL(selectedFile);
            setPreview(url);
        }
    }

    async function submitEditStore() {
        const payload = { shop_name: storeName, canteen_name: canteen };
        if (imageFile) {
            try {
                const response = await uploadStoreImage({ file: imageFile });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
        editStore(payload)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className="flex h-screen flex-col p-8">
            <div className="flex mt-8 gap-12 bg-white p-8 rounded-lg shadow-lg">
                <img
                    className="size-72 object-cover shadow-lg rounded-lg cursor-pointer hover:opacity-80"
                    src={preview}
                    alt="store"
                    onClick={handleImageClick}
                />

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />

                <div className="flex flex-col justify-between w-full">
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <h1 className="text-6xl font-semibold font-thai">
                                ชื่อร้าน:
                            </h1>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input text-6xl w-[75%] h-full font-thai"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-4xl font-semibold font-thai">
                                โรงอาหาร:
                            </h2>
                            <select
                                className="select w-[50%] appearance-none font-thai text-4xl"
                                aria-label="select"
                                value={canteen}
                                onChange={(e) => {
                                    setCanteen(e.target.value);
                                    console.log(canteen);
                                }}
                            >
                                {canteen.length === 0 && (
                                    <option disabled value="">
                                        -- เลือกโรงอาหาร --
                                    </option>
                                )}
                                {canteenList.map((canteen) => (
                                    <option
                                        key={canteen.CanteenName}
                                        value={canteen.CanteenName}
                                    >
                                        {canteen.CanteenName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end items-center w-full">
                        <button
                            className="btn btn-outline btn-error"
                            onClick={() => navigate("/")}
                        >
                            <X />
                            ยกเลิก
                        </button>
                        <button
                            className="btn btn-primary ml-4"
                            onClick={submitEditStore}
                        >
                            <Save />
                            บันทึก
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
