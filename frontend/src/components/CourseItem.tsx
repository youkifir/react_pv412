import type { Course } from "../models/Course"


interface Props {
    course: Course
}

function CourseItem({ course }: Props) {
    return (
        <tr>
            <td>{course.id}</td>
            <td>{course.name}</td>
            <td>{course.direction}</td>
            <td>
                <button
                    className="btn btn-primary me-2"
                    onClick={() => { }}>
                    Edit
                </button>
                <button
                    className="btn btn-danger me-2"
                    onClick={() => { }}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default CourseItem