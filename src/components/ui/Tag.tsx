import { type Tag } from "../../api/menu";
import { useState } from "react";
interface TagProps {
    tag: Tag;
    selectTag: (tagId: string) => void;
}

export default function Tag({ tag, selectTag }: TagProps) {
    const [isSelected, setIsSelected] = useState(false);
    function handleClick() {
        selectTag(tag.TagID.toString());
        setIsSelected((prev) => !prev);
    }
    return (
        <span
            className={`badge rounded-sm user-select-none select-none cursor-pointer transition-colors duration-300 ${
                isSelected ? " bg-black text-white" : "bg-white text-black"
            }`}
            onClick={handleClick}
        >
            {tag.Topic}
        </span>
    );
}
