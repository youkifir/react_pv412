import { BrowserRouter, Routes, Route } from "react-router-dom"
import StudentsPage from "../pages/StudentsPage"
import StudentFormPage from "../pages/StudentFormPage"
import LoginPage from "../components/LoginPage"
import RegisterPage from "../components/RegisterPage"
import ProtectedRoute from "./ProtectedRoute"

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute><StudentFormPage /></ProtectedRoute>} />
                <Route path="/edit/:id" element={<ProtectedRoute><StudentFormPage /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter