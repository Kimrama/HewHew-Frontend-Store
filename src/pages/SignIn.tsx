import AuthInput from "../components/ui/AuthInput";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, type LoginRequest } from "../api/authService";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // ⬅ ต้องมี

const notyf = new Notyf({
    duration: 3000,
    position: {
        x: "right",
        y: "top",
    },
});

export default function SignIn() {
    const { register, handleSubmit } = useForm<LoginRequest>();

    const onSubmit = (data: LoginRequest) => {
        login(data)
            .then((response) => {
                notyf.success("\nLogin successful!\n");
                localStorage.setItem("token", response.token);
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            })
            .catch((error) => {
                console.error("Login failed:", error);
                notyf.error("Login failed. Please check your credentials.");
            });
    };

    return (
        <div className="flex w-full justify-center ">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-medium mb-4 ">Sign In</h1>
                <form
                    className="p-6 rounded flex flex-col "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <AuthInput
                        label="Username"
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        icon="solar--user-bold"
                        {...register("username")}
                    />
                    <AuthInput
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        icon="solar--key-linear"
                        {...register("password")}
                    />
                    <button className="btn btn-primary waves waves-light w-md">
                        Sign In
                    </button>
                </form>
                <p className="border-t pt-4 text-lg">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
