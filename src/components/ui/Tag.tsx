import { type Tag as TagItem } from "../../api/menu";
import { useState, useEffect } from "react";

interface TagProps {
    tag: TagItem;
    selectTag: (tag: TagItem) => void;
    erasable?: boolean;
    onDelete?: (tagId: string) => void;
    tagSelected?: TagItem[];
}

export default function Tag({
    tag,
    selectTag,
    erasable = false,
    onDelete,
    tagSelected = [],
}: TagProps) {
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (
            tagSelected.find((t) => t.TagID.toString() === tag.TagID.toString())
        ) {
            setIsSelected(true);
        }
    }, [tagSelected, tag.TagID]);

    function handleClick() {
        if (!isSelected && tagSelected.length >= 2) return;
        selectTag(tag);
        setIsSelected((prev) => !prev);
    }
    function handleDelete() {
        onDelete && onDelete(tag.TagID.toString());
    }
    return (
        <div className="relative">
            {erasable && (
                <div className="absolute -top-2 -right-2 z-10 border-2 border-white rounded-full bg-red-500 text-white w-5 h-5 flex justify-center items-center cursor-pointer">
                    <button onClick={handleDelete} className="text-xs">
                        &times;
                    </button>
                </div>
            )}
            <span
                className={`badge rounded-lg user-select-none select-none cursor-pointer transition-colors duration-300 ${
                    isSelected ? " bg-black text-white" : "bg-white text-black"
                }`}
                onClick={handleClick}
            >
                {tag.Topic}
            </span>
        </div>
    );
}
