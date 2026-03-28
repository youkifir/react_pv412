import { useEffect, useState } from "react"
import type { Student } from "../models/Student"
import { StudentService } from "../services/StudentService"
import { useNavigate } from "react-router-dom"
import StudentList from "../components/StudentList"

function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([])
    const navigate = useNavigate()
    const loadStudents = async () => {
        const promise_students = await StudentService.getAll()
        setStudents(promise_students)
    }
    const handleDelete = async (id: number) => {
        await StudentService.delete(id)
        loadStudents()
    }
    useEffect(() => {
        loadStudents()
    })

    return (
        <div className="container mt-4">
            <h2>Students</h2>
            <button
                className="btn btn-success mb-3"
                onClick={() => { navigate("/create") }}>
                Add Student
            </button>
            <StudentList
                students={students}
                onDelete={handleDelete} />
        </div>
    )
}

export default StudentsPage