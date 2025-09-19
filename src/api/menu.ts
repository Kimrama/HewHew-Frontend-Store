import axios from "axios";

export interface Tag {
    TagID: string;
    Topic: string;
}
interface TagListResponse {
    tags: Tag[];
}

export interface MenuItem {
    MenuID: string;
    Name: string;
    Detail: string;
    Price: number;
    Status: "available" | "unavailable";
    ImageURL: string | null;
    Tag1ID: string | null;
    Tag2ID: string | null;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getMenuList(): Promise<MenuItem[]> {
    const { data } = await axios.get<MenuItem[]>(`${BASE_URL}/v1/menu`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return data;
}

export async function getTagList(): Promise<TagListResponse> {
    const { data } = await axios.get<TagListResponse>(
        `${BASE_URL}/v1/shop/tags`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return data;
}

export async function createTag(): Promise;
