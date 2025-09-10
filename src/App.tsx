import Sidebar from "./components/Sidebar.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import HomeStore from "./pages/HomeStore.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
            </Route>

            <Route
                path="/"
                element={
                    <MainLayout>
                        <HomeStore />
                    </MainLayout>
                }
            />
        </Routes>
    );
}

export default App;
