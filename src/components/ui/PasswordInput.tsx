import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ ...props }) {
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        setShowPassword(true);
        setShowPassword(false);
    }, []);
    return (
        <div>
            <label className="label-text" htmlFor="password">
                Password
            </label>
            <div className="input flex items-center">
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="flex-1"
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 cursor-pointer"
                    aria-label="password toggle"
                >
                    {showPassword ? (
                        <EyeOff className="size-5 text-gray-500" />
                    ) : (
                        <Eye className="size-5 text-gray-500" />
                    )}
                </button>
            </div>
        </div>
    );
}
