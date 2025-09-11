import AuthInput from "../components/ui/AuthInput";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Notyf } from "notyf";
import {
    register as auth_register,
    type RegisterFormRequest,
} from "../api/authService";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
const notyf = new Notyf({
    duration: 3000,
    position: {
        x: "right",
        y: "top",
    },
});

interface SignUpProps {
    username: string;
    fname: string;
    lname: string;
    password: string;
    confirm_password: string;
}

function validateStrongPassword(password: string): boolean {
    const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;

    return strongPasswordRegex.test(password);
}

export default function SignUp() {
    const [creatingUser, setCreatingUser] = useState(false);
    const { register, handleSubmit, reset } = useForm<SignUpProps>();
    const [showValidatePasswordMatch, setShowValidatePasswordMatch] =
        useState(false);
    const [
        showValidatePasswordMatchStrong,
        setShowValidatePasswordMatchStrong,
    ] = useState(false);
    const navigate = useNavigate();

    function onSubmit(data: SignUpProps) {
        console.log(data);
        setCreatingUser(true);
        if (data.password !== data.confirm_password) {
            setShowValidatePasswordMatch(true);
            setCreatingUser(false);
            return;
        } else {
            setShowValidatePasswordMatch(false);
        }
        const registerForm: RegisterFormRequest = {
            username: data.username,
            fname: data.fname,
            lname: data.lname,
            password: data.password,
        };
        if (!validateStrongPassword(data.password)) {
            setShowValidatePasswordMatchStrong(true);
            setCreatingUser(false);
            return;
        } else {
            setShowValidatePasswordMatchStrong(false);
        }
        auth_register(registerForm)
            .then((response) => {
                notyf.success("Sign Up successful!");
                reset();
                navigate("/auth/signin");
            })
            .catch((error) => {
                notyf.error(
                    `Sign Up failed. Please try again. error: ${error}`
                );
            })
            .finally(() => {
                setCreatingUser(false);
            });
    }

    return (
        <div className="flex w-full justify-center ">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-white flex flex-col justify-center items-center p-10 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-medium mb-4 ">Sign Up</h1>
                    <form
                        className="p-6 rounded flex flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <AuthInput
                            label="Username"
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            {...register("username")}
                        />
                        <AuthInput
                            label="First Name"
                            type="text"
                            id="fname"
                            placeholder="Enter your first name"
                            {...register("fname")}
                        />
                        <AuthInput
                            label="Last Name"
                            type="text"
                            id="lname"
                            placeholder="Enter your last name"
                            {...register("lname")}
                        />
                        <AuthInput
                            label="Password"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        <AuthInput
                            label="Confirm Password"
                            type="password"
                            id="confirm_password"
                            placeholder="Enter your confirm password"
                            {...register("confirm_password")}
                        />
                        <span
                            className={`text-red-500 text-sm mt-2 ${
                                showValidatePasswordMatch ? "block" : "hidden"
                            }`}
                        >
                            Passwords do not match
                        </span>
                        <span
                            className={`text-red-500 text-sm mt-2 ${
                                showValidatePasswordMatchStrong
                                    ? "block"
                                    : "hidden"
                            }`}
                        >
                            Passwords must be at least 8 characters long and
                            include uppercase,
                            <br />
                            lowercase, number, and special character.
                        </span>
                        <button className="btn btn-primary waves waves-light w-md mt-10">
                            {creatingUser ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>
                    <p className="border-t pt-4 text-lg">
                        If you have an account already{" "}
                        <Link to="/auth/signin" className="text-primary">
                            Sign In
                        </Link>{" "}
                        instead
                    </p>
                </div>
            </div>
        </div>
    );
}
