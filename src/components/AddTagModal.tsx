import { useState, useEffect } from "react";
import { getTagList, type Tag as TagItem } from "../api/menu";
import Tag from "./ui/Tag";

export default function AddTagModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [allTags, setAllTags] = useState<TagItem[]>([]);

    useEffect(() => {
        async function fetchTags() {
            try {
                const data = await getTagList();
                setAllTags(data.tags);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        }
        fetchTags();
    }, []);

    return (
        <div className="">
            <button
                onClick={() => setIsOpen(true)}
                className="user-select-none select-none cursor-pointer px-4 bg-white border-1 border-gray-500 text-gray-500 border-dashed rounded-xl"
            >
                +
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black opacity-35"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    <div className="relative flex flex-col justify-between bg-white rounded shadow-lg w-146 h-[256px] p-6 z-10">
                        <div>
                            <div>
                                <h2 className="text-4xl mb-4 font-thai">
                                    สร้างหมวดหมู่
                                </h2>
                            </div>
                            <div className="w-full my-4">
                                <input
                                    type="text"
                                    placeholder="ชื่อหมวดหมู่"
                                    className="input text-3xl w-full h-full font-thai rounded border-1 border-black focus:outline-none focus:ring-offset-2 focus:ring-primary bg-white"
                                    // value={storeName}
                                    // onChange={(e) => setStoreName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                onClick={() => setIsOpen(false)}
                            >
                                ยกเลิก
                            </button>
                            <button
                                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                onClick={() => alert("Confirmed!")}
                            >
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
