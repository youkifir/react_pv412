import React, { useEffect, useState } from "react";
import type { Student } from "../models/Student";

interface Props {
    onSave: (student: Omit<Student, "id">) => void;
    studentToEdit: Student | null;
}

function StudentForm({ onSave, studentToEdit }: Props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState<number>(0);
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (studentToEdit) {
            setFirstName(studentToEdit.firstName)
            setLastName(studentToEdit.lastName)
            setEmail(studentToEdit.email)
            setAge(studentToEdit.age)
        } else {
            setFirstName("")
            setLastName("")
            setEmail("")
            setAge(0)
        }
    }, [studentToEdit])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({ firstName, lastName, email, age })
        setFirstName("")
        setLastName("")
        setEmail("")
        setAge(0)
    }

    return <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-3">
            <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
            />
        </div>
        <div className="col-md-3">
            <input
                type="text"
                className="form-control"
                placeholder="LastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
            />
        </div>
        <div className="col-md-3">
            <input
                type="text"
                className="form-control"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
        </div>
        <div className="col-md-1">
            <input
                type="number"
                className="form-control"
                placeholder="Age"
                value={age}
                onChange={e => setAge(Number(e.target.value))}
                required
            />
        </div>
        <div className="col md-2">
            <button
                type="submit"
                className="btn btn-success w-100"
            >
                {studentToEdit ? "Update" : "Add"}
            </button>
        </div>
    </form>
}

export default StudentForm