import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentService } from "../services/StudentService";

interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: string;
}

function StudentFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        if (id) {
            StudentService.getById(Number(id)).then(s => {
                setFirstName(s.firstName);
                setLastName(s.lastName);
                setEmail(s.email);
                setAge(s.age.toString());
            });
        }
    }, [id]);

    const validate = (): boolean => {
        const newErrors: Errors = {};

        if (!firstName.trim())
            newErrors.firstName = "Ім'я обов'язкове";
        else if (firstName.length < 2)
            newErrors.firstName = "Мінімум 2 символи";

        if (!lastName.trim())
            newErrors.lastName = "Прізвище обов'язкове";
        else if (lastName.length < 2)
            newErrors.lastName = "Мінімум 2 символи";

        if (!email.trim())
            newErrors.email = "Email обов'язковий";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = "Невірний формат email";

        if (!age)
            newErrors.age = "Вік обов'язковий";
        else if (Number(age) <= 15)
            newErrors.age = "Вік має бути більше 16";
        else if (Number(age) > 120)
            newErrors.age = "Вік має бути менше 120";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const student = { firstName, lastName, email, age: Number(age) };
        if (id) {
            await StudentService.update(Number(id), student);
        } else {
            await StudentService.create(student);
        }
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <h2>{id ? "Редагування" : "Створення"} студента</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-2">
                    <input
                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        placeholder="Ім'я"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    {errors.firstName && (
                        <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                </div>

                <div className="mb-2">
                    <input
                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                        placeholder="Прізвище"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    {errors.lastName && (
                        <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                </div>

                <div className="mb-2">
                    <input
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                    )}
                </div>

                <div className="mb-2">
                    <input
                        className={`form-control ${errors.age ? "is-invalid" : ""}`}
                        type="number"
                        placeholder="Вік"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                    {errors.age && (
                        <div className="invalid-feedback">{errors.age}</div>
                    )}
                </div>

                <button className="btn btn-success">Зберегти</button>
            </form>
        </div>
    );
}

export default StudentFormPage;