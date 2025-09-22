import { useState, useEffect } from "react";
import {
    getTagList,
    type Tag as TagItem,
    type MenuItem,
    getMenuList,
} from "../api/menu";
import Tag from "../components/ui/Tag";
import MenuCard from "../components/Menucard.tsx";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
    const [tags, setTags] = useState<TagItem[]>([]);
    const [selectedTagList, setSelectedTagList] = useState<TagItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [menus, setMenus] = useState<MenuItem[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTags() {
            const data = await getTagList();
            setTags(data.tags);
        }
        async function fetchMenus() {
            try {
                const data = await getMenuList();
                console.log("Fetched menus:", data);
                setMenus(data);
            } catch (error) {
                console.error("Error fetching menus:", error);
            }
        }
        fetchTags();
        fetchMenus();
    }, []);
    function handleTagClick(tag: TagItem) {
        const foundTag =
            tags.find((t) => t.TagID.toString() === tag.TagID.toString()) ||
            null;
        if (foundTag === null) return;
        if (selectedTagList.includes(foundTag)) {
            setSelectedTagList((prev) => prev.filter((t) => t !== foundTag));
        } else if (foundTag) {
            setSelectedTagList((prev) => [...prev, foundTag]);
        }
    }
    function handleSearchChange(searchTermInp: string) {
        setSearchTerm(searchTermInp);
    }

    return (
        <div className="flex h-screen">
            <div className="flex flex-col flex-1 p-4">
                <div className="flex justify-between mx-32 mb-4">
                    <div className="flex w-[85%]">
                        <div className="input input-lg flex space-x-4">
                            <span className="icon-[tabler--search] text-base-content/80 my-auto size-6 shrink-0"></span>
                            <input
                                type="search"
                                className="grow"
                                placeholder="Search"
                                id="kbdInput"
                                value={searchTerm}
                                onChange={(e) =>
                                    handleSearchChange(e.target.value)
                                }
                            />
                            <label className="sr-only" htmlFor="kbdInput">
                                Search
                            </label>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary w-[14%] h-11"
                        onClick={() => navigate("/create-menu")}
                    >
                        <Plus className="mr-2 " />
                        สร้างเมนูใหม่
                    </button>
                </div>
                <div className="flex flex-wrap gap-4 mx-32 mb-8">
                    {tags.map((tag) => (
                        <div key={tag.TagID}>
                            <Tag tag={tag} selectTag={handleTagClick} />
                        </div>
                    ))}
                </div>
                <div className="overflow-y-auto">
                    <div className="grid grid-cols-2 gap-6 m-8">
                        {menus
                            .filter((menu) => {
                                const matchesSearchTerm =
                                    menu.Name.toLowerCase().includes(
                                        searchTerm.toLowerCase()
                                    );
                                const matchesSelectedTags =
                                    selectedTagList.length === 0 ||
                                    selectedTagList.some(
                                        (tag) =>
                                            tag.TagID === menu.Tag1ID ||
                                            tag.TagID === menu.Tag2ID
                                    );
                                return matchesSearchTerm && matchesSelectedTags;
                            })
                            .map((menu) => (
                                <MenuCard key={menu.MenuID} menu={menu} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
