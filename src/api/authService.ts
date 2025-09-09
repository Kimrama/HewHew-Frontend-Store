import axios from "axios";

export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await axios.post<LoginResponse>(
        `${BASE_URL}/v1/user/login`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return data;
};
