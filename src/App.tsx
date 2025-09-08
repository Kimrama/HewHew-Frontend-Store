import HomeStore from "./pages/HomeStore.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeStore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
