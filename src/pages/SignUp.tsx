import AuthInput from "../components/ui/AuthInput";
import { Link } from "react-router-dom";

export default function SignUp() {
    return (
        <div className="flex w-full justify-center ">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-medium mb-4 ">Sign Up</h1>
                <form className="p-6 rounded flex flex-col ">
                    <AuthInput
                        label="Username"
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                    />
                    <AuthInput
                        label="First Name"
                        type="text"
                        id="fname"
                        placeholder="Enter your first name"
                    />
                    <AuthInput
                        label="Last Name"
                        type="text"
                        id="lname"
                        placeholder="Enter your last name"
                    />
                    <AuthInput
                        label="Password"
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                    />
                    <AuthInput
                        label="Confirm Password"
                        type="password"
                        id="confirm_password"
                        placeholder="Enter your confirm password"
                    />
                    <button className="btn btn-primary waves waves-light w-md">
                        Sign Up
                    </button>
                </form>
                <p className="border-t pt-4 text-lg">
                    If you have an account already{" "}
                    <Link to="/signin" className="text-primary">
                        Sign In
                    </Link>{" "}
                    instead
                </p>
            </div>
        </div>
    );
}
