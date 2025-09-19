import { useRef, useState } from "react";
import default_image from "../assets/default-featured-image.jpg";
import ModalExample from "../components/ModalTagList";

export default function CreateMenu() {
    const [preview, setPreview] = useState<string>(default_image);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [menuName, setMenuName] = useState<string>("");
    const [menuDetail, setMenuDetail] = useState<string>("");

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
    return (
        <div className="flex p-16 w-full justify-center">
            <div className="flex flex-col bg-white p-8 px-12 rounded shadow">
                <div className="flex justify-center mb-8">
                    <img
                        className="size-58 object-cover shadow-lg rounded-lg cursor-pointer hover:opacity-80"
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
                </div>
                <div className="w-[512px]">
                    <div className="flex flex-col mb-6 w-full">
                        <div className="font-thai text-3xl mb-[10px]">
                            ชื่อรายการ:{" "}
                        </div>
                        <input
                            type="text"
                            placeholder="ระบุชื่อรายการอาหาร"
                            className="input text-2xl font-thai rounded border-1 border-black focus:outline-none focus:ring-offset-2 focus:ring-primary bg-white"
                            value={menuName}
                            onChange={(e) => setMenuName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mb-6">
                        <div className="font-thai text-3xl mb-[10px]">
                            รายละเอียด:{" "}
                        </div>
                        <textarea
                            className="border-1 border-black resize-none h-[128px] w-full rounded focus:outline-none focus:ring-offset-2 focus:ring-primary bg-white p-4 text-2xl font-thai"
                            name="menuDetail"
                            id="menuDetail"
                            value={menuDetail}
                            placeholder="ระบุรายละเอียดของรายการอาหาร"
                            onChange={(e) => setMenuDetail(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex flex-col mb-6">
                        <div className="font-thai text-3xl mb-2">
                            เลือกหมวดหมู่:{" "}
                        </div>
                        <ModalExample />
                    </div>
                </div>
            </div>
        </div>
    );
}
