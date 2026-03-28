import type { Student } from "../models/Student"
import { useNavigate } from "react-router-dom"

interface Props {
    student: Student
    onDelete: (id: number) => void
}

function StudentItem({ student, onDelete }: Props) {
    const navigate = useNavigate()
    return (
        <tr>
            <td>{student.id}</td>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>
            <td>
                <button
                    className="btn btn-primary me-2"
                    onClick={() => { navigate(`/edit/${student.id}`) }}>
                    Edit
                </button>
                <button
                    className="btn btn-danger me-2"
                    onClick={() => { onDelete(student.id) }}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default StudentItem