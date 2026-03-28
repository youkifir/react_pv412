import type { Student } from "../models/Student";
import StudentItem from './StudentItem'

interface Props {
    students: Student[]
    onDelete: (id: number) => void
}

function StudentList({ students, onDelete }: Props) {
    return (
        <div className="container mt-4">
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