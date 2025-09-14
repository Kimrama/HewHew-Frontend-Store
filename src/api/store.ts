import axios from "axios";

export interface EditStoreRequest {
    shop_name: string;
    canteen_name: string;
}

export interface EditStoreResponse {
    message: string;
    error?: string;
}

export interface UploadStorePictureRequest {
    file: File | null;
}

export interface UploadStorePictureResponse {
    message: string;
    error?: string;
}

export interface Store {
    name: string;
    canteen_name: string;
    state: boolean;
    shopimg: string | null;
}

export interface Canteen {
    CanteenName: string;
    Latitude: string;
    Longitude: string;
}

export interface CanteenListResponse {
    canteens: Canteen[];
}

export interface toggleStoreStateRequest {
    state: "open" | "close";
}

const BASE_URL = import.meta.env.VITE_API_URL;

export async function toggleStoreState(
    payload: toggleStoreStateRequest
): Promise<{ message: string; error?: string }> {
    const { data } = await axios.patch(
        `${BASE_URL}/v1/shop/toggle_open_state`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return data;
}

export async function getCanteenList(): Promise<CanteenListResponse> {
    const { data } = await axios.get<CanteenListResponse>(
        `${BASE_URL}/v1/canteens`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return data;
}

export async function getStore(): Promise<Store> {
    const { data } = await axios.get(`${BASE_URL}/v1/shop`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return data;
}

export async function uploadStoreImage(
    image: UploadStorePictureRequest
): Promise<UploadStorePictureResponse> {
    const formData = new FormData();
    if (image.file) {
        formData.append("Image", image.file);
    }
    const { data } = await axios.put<UploadStorePictureResponse>(
        `${BASE_URL}/v1/shop/shopimage`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return data;
}

export async function editStore(
    payload: EditStoreRequest
): Promise<EditStoreResponse> {
    const { data } = await axios.put<EditStoreResponse>(
        `${BASE_URL}/v1/shop`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    return data;
}
