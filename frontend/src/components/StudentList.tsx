import type { Student } from "../models/Student";
import StudentItem from './StudentItem';
import { Link } from "react-router-dom";

interface Props {
    students: Student[]
    onDelete: (id: number) => void
}

function StudentList({ students, onDelete }: Props) {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    return (
        <div className="container mt-4">
            {user.firstName && (
                <p className="text-muted">Привіт, <strong>{user.firstName}</strong>!</p>
            )}
            <Link className="text-muted" to="/profile">Профіль</Link>
            <table className="table table-info">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>LastName</th>
                        <th>E-mail</th>
                        <th>Age</th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <StudentItem
                            key={s.id}
                            student={s}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StudentList;