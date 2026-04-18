import React, { useState } from "react";
import { AuthService } from "../services/AuthService";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: 0
    });
    const [error, setError] = useState("");

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await AuthService.register(form);
            navigate("/login");
        } catch {
            setError("Ошибка при регистрации. Возможно, такой email уже занят.");
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow-lg border-0" style={{ maxWidth: "500px", width: "100%" }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Регистрация</h2>
                        <p className="text-muted">Станьте частью нашей системы</p>
                    </div>

                    <form onSubmit={handleRegister}>
                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label className="form-label small fw-bold">Имя</label>
                                <input name="firstName" className="form-control bg-light" placeholder="Иван" onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-bold">Фамилия</label>
                                <input name="lastName" className="form-control bg-light" placeholder="Иванов" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-bold">Email</label>
                            <input name="email" type="email" className="form-control bg-light" placeholder="mail@example.com" onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-bold">Пароль</label>
                            <input name="password" type="password" className="form-control bg-light" placeholder="Минимум 6 символов" onChange={handleChange} required />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-bold">Возраст</label>
                            <input name="age" type="number" className="form-control bg-light" placeholder="18" onChange={handleChange} required />
                        </div>

                        {error && <div className="alert alert-danger p-2 small text-center">{error}</div>}

                        <div className="d-grid">
                            <button className="btn btn-success btn-lg shadow-sm">Зарегистрироваться</button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <span className="text-muted small">Уже есть аккаунт?</span>{" "}
                        <Link to="/login" className="small text-decoration-none fw-bold text-success">Войти</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;