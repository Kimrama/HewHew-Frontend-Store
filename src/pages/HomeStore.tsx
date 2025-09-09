import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomeStore() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        }
    }, [navigate]);

    return <div>Home Store Page</div>;
}
