import { Save, X } from "lucide-react";
import default_image from "../assets/default-featured-image.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export default function EditStore() {
    const navigate = useNavigate();
    const [preview, setPreview] = useState<string>(default_image);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleImageClick() {
        fileInputRef.current?.click(); // กด img → เปิด file dialog
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file); // แปลงไฟล์เป็น object URL
            setPreview(url);
        }
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
                                className="input max-w-sm text-6xl h-full font-thai"
                            />
                        </div>
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-4xl font-semibold font-thai">
                                โรงอาหาร:
                            </h2>
                            <select
                                className="select max-w-sm appearance-none font-thai text-4xl"
                                aria-label="select"
                            >
                                <option disabled selected>
                                    เลือกโรงอาหาร
                                </option>
                                <option>โรงอาหาร 1</option>
                                <option>โรงอาหาร 2</option>
                                <option>โรงอาหาร 3</option>
                                <option>โรงอาหาร 4</option>
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
                            onClick={() => navigate("/edit-store")}
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
