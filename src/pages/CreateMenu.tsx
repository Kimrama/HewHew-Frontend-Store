import React, { useRef, useState } from "react";
import default_image from "../assets/default-featured-image.jpg";
import ModalTagList from "../components/ModalTagList";
import { useNavigate } from "react-router-dom";
import { type Tag as TagItem } from "../api/menu";
import { type CreateMenuRequest, createMenu } from "../api/menu";

export default function CreateMenu() {
    const [preview, setPreview] = useState<string>(default_image);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [menuName, setMenuName] = useState<string>("");
    const [menuDetail, setMenuDetail] = useState<string>("");
    const [tagSelected, setTagSelected] = useState<TagItem[]>([]);
    const [menuPrice, setMenuPrice] = useState<string>("");

    const [showInvalidMenuName, setShowInvalidMenuName] =
        useState<boolean>(false);
    const [showInvalidPrice, setShowInvalidPrice] = useState<boolean>(false);

    const navigate = useNavigate();
    function handleImageClick() {
        fileInputRef.current?.click();
    }

    function handlePriceInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9]/g, "");
        setMenuPrice(numericValue);
    }
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setImageFile(selectedFile);
            const url = URL.createObjectURL(selectedFile);
            setPreview(url);
        }
    }
    function handleTagSelect(tag: TagItem) {
        if (tagSelected.includes(tag)) {
            setTagSelected((prev) => prev.filter((t) => t.TagID !== tag.TagID));
        } else {
            if (tagSelected.length >= 2) return;
            setTagSelected((prev) => [...prev, tag]);
        }
    }

    function handleOnCreateMenu() {
        if (menuName.trim().length === 0) {
            setShowInvalidMenuName(true);
        }
        if (menuPrice.trim().length === 0) {
            setShowInvalidPrice(true);
        }

        const request: CreateMenuRequest = {
            name: menuName,
            detail: menuDetail,
            price: parseInt(menuPrice),
            image: imageFile ? imageFile : null,
            tag1ID: tagSelected[0] ? tagSelected[0].TagID : null,
            tag2ID: tagSelected[1] ? tagSelected[1].TagID : null,
        };

        try {
            createMenu(request).then((response) => {
                console.log(response.message);
                navigate("/menu");
            });
        } catch (error) {
            console.log(error);
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
                            ชื่อรายการ: <span className="text-red-500">*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="ระบุชื่อรายการอาหาร"
                            className="input text-2xl font-thai rounded border-1 border-black focus:outline-none focus:ring-offset-2 focus:ring-primary bg-white"
                            value={menuName}
                            onChange={(e) => setMenuName(e.target.value)}
                        />
                        <div
                            className={`${
                                showInvalidMenuName ? "text-red-500" : "hidden"
                            }`}
                        >
                            กรุณาระบุชื่อของรายการอาหาร
                        </div>
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
                        <div className="flex gap-3 items-center">
                            {tagSelected.map((tag) => (
                                <span
                                    className={`badge rounded-lg user-select-none select-none `}
                                    key={tag.Topic}
                                >
                                    {tag.Topic}
                                </span>
                            ))}
                            <ModalTagList
                                handleTagSelect={handleTagSelect}
                                tagSelected={tagSelected}
                                onDeleteTagUpdate={setTagSelected}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-6">
                        <div className="font-thai text-3xl mb-[10px]">
                            ราคา: <span className="text-red-500">*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="ระบุราคาของรายการอาหาร"
                            className="input text-2xl font-thai rounded border-1 border-black focus:outline-none focus:ring-offset-2 focus:ring-primary bg-white"
                            value={menuPrice}
                            onChange={handlePriceInput}
                        />
                        <div
                            className={`${
                                showInvalidPrice ? "text-red-500" : "hidden"
                            }`}
                        >
                            กรุณาระบุราคาของรายการอาหาร
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        onClick={() => {
                            navigate("/menu");
                        }}
                    >
                        ยกเลิก
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                        onClick={handleOnCreateMenu}
                    >
                        ยืนยัน
                    </button>
                </div>
            </div>
        </div>
    );
}
