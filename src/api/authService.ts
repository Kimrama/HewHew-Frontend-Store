import axios from "axios";

export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
}

export interface RegisterFormRequest {
    username: string;
    password: string;
    fname: string;
    lname: string;
}
export interface RegisterResponse {
    message: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export async function login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await axios.post<LoginResponse>(
        `${BASE_URL}/v1/admin/login`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return data;
}

export async function register(
    payload: RegisterFormRequest
): Promise<RegisterResponse> {
    const { data } = await axios.postForm<RegisterResponse>(
        `${BASE_URL}/v1/admin/register`,
        payload
    );
    return data;
}
