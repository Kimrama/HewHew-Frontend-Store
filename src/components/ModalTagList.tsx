import { useState, useEffect } from "react";
import { getTagList, type Tag as TagItem } from "../api/menu";
import Tag from "./ui/Tag";
import AddTagModal from "./AddTagModal";
import { deleteTag, createTag } from "../api/menu";

interface ModalTagListProps {
    handleTagSelect: (tag: TagItem) => void;
    tagSelected: TagItem[];
    onDeleteTagUpdate?: (tags: TagItem[]) => void;
}

export default function ModalTagList({
    handleTagSelect,
    tagSelected,
    onDeleteTagUpdate,
}: ModalTagListProps) {
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

    function onDeleteTag(tagId: string) {
        try {
            deleteTag(tagId);
            if (onDeleteTagUpdate) {
                onDeleteTagUpdate(
                    allTags.filter((tag) => tag.TagID.toString() !== tagId)
                );
            }
            setAllTags((prev) =>
                prev.filter((tag) => tag.TagID.toString() !== tagId)
            );
        } catch (error) {
            console.error("Error deleting tag:", error);
        }
    }
    async function onAddTag(topic: string) {
        try {
            const data = await createTag(topic);
            const newTag: TagItem = { TagID: data.tag.TagID, Topic: topic };
            console.log(newTag);
            setAllTags((prev) => [...prev, newTag]);
        } catch (error) {
            console.error("Error creating tag:", error);
        }
    }
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
                            <h2 className="text-4xl font-thai">
                                เลือกหมวดหมู่
                            </h2>
                            <p className="text-gray-400">เลือกได้ 2 หมวดหมู่</p>
                        </div>
                        <div>
                            <button
                                className="absolute -top-0 right-4 text-3xl"
                                onClick={() => setIsOpen(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4 max-h-64 overflow-y-auto p-5">
                            {allTags.map((tag) => (
                                <Tag
                                    key={tag.TagID}
                                    tag={tag}
                                    selectTag={handleTagSelect}
                                    erasable={true}
                                    onDelete={() =>
                                        onDeleteTag(tag.TagID.toString())
                                    }
                                    tagSelected={tagSelected}
                                />
                            ))}
                            <AddTagModal onAddTag={onAddTag} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
