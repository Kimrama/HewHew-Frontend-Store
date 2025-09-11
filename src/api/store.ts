import axios from "axios";

export interface EditStoreRequest {
    storeName: string;
    canteen: string;
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
}
const BASE_URL = import.meta.env.VITE_API_URL;

export async function getStore(): Promise<Store> {
    const { data } = await axios.get(`${BASE_URL}/v1/admin/getshop`, {
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
        formData.append("file", image.file);
    }
    const { data } = await axios.post<UploadStorePictureResponse>(
        `${BASE_URL}/v1/store/image`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return data;
}

export async function editStore(
    payload: EditStoreRequest
): Promise<EditStoreResponse> {
    const { data } = await axios.put<EditStoreResponse>(
        `${BASE_URL}/v1/store`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return data;
}
