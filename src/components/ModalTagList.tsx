import { useState, useEffect } from "react";
import { getTagList, type Tag as TagItem } from "../api/menu";
import Tag from "./ui/Tag";
import AddTagModal from "./AddTagModal";

export default function ModalTagList() {
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
                className="px-2 py-1 bg-white border-1 border-gray-500 text-gray-500 border-dashed rounded"
            >
                เลือกหมวดหมู่
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black opacity-35"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded shadow-lg w-146 p-6 z-10">
                        <div>
                            <h2 className="text-4xl mb-4 font-thai">
                                เลือกหมวดหมู่
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4 max-h-64 overflow-y-auto">
                            {allTags.map((tag) => (
                                <Tag
                                    key={tag.TagID}
                                    tag={tag}
                                    selectTag={() => {}}
                                />
                            ))}
                            <AddTagModal />
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
