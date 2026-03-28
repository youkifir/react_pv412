import { useEffect, useState } from "react";
import type { Course } from "../models/Course";
import { CourseService } from "../services/CourseService";
import CourseItem from "./CourseItem";

function CourseList() {
    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        CourseService.getAll().then(setCourses);
    }, [])
    return (
        <div className="container mt-4">
            <h2>Courses List</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Direction</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <CourseItem key={course.id} course={course} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CourseList