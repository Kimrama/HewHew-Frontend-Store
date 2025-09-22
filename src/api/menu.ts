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

export interface CreateMenuRequest {
    name: string;
    detail: string;
    price: number;
    image: File | null;
    tag1ID: string | null;
    tag2ID: string | null;
}
export interface CreateMenuResponse {
    message: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export async function createMenu(
    payload: CreateMenuRequest
): Promise<CreateMenuResponse> {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("detail", payload.detail);
    formData.append("price", payload.price.toString());
    if (payload.image) {
        formData.append("image", payload.image);
    }
    formData.append("tag1_id", payload.tag1ID ? payload.tag1ID : "");
    formData.append("tag2_id", payload.tag2ID ? payload.tag2ID : "");

    const { data } = await axios.post(`${BASE_URL}/v1/menu`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return data;
}

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
export async function deleteTag(tagId: string): Promise<void> {
    const { data } = await axios.delete(`${BASE_URL}/v1/shop/tags/${tagId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return data;
}

export async function createTag(topic: string): Promise<any> {
    const { data } = await axios.post<Tag>(
        `${BASE_URL}/v1/shop/tags`,
        {
            topic: topic,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return data;
}
