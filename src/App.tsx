import HomeStore from "./pages/HomeStore.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeStore />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}

export default App;
