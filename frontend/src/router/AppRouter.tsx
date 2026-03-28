import { BrowserRouter, Routes, Route } from "react-router-dom"
import StudentsPage from "../pages/StudentsPage"
import StudentFormPage from "../pages/StudentFormPage"

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StudentsPage />} />
                <Route path="/create" element={<StudentFormPage />} />
                <Route path="/edit/:id" element={<StudentFormPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter