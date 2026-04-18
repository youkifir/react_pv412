import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { api } from "../services/api";
import { validateEmail, validatePassword } from "../utils/validation";

const LoginPage = () => {
    const { login, isAuth } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<any>({});

    if (isAuth) return <Navigate to="/students" />;

    const validate = () => {
        const newErrors: any = {};
        if (!email) {
            newErrors.email = "Email обязателен";
        } else if (!validateEmail(email)) {
            newErrors.email = "Неверный формат email";
        }
        if (!password) {
            newErrors.password = "Пароль обязателен";
        } else if (!validatePassword(password)) {
            newErrors.password = "Минимум 6 символов";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        try {
            const res = await api.post("/auth/login", { email, password });
            login(res.data.token);
            navigate("/students");
        } catch {
            setErrors({ server: "Неверный email или пароль" });
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow-lg border-0" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: "60px", height: "60px" }}>
                            <i className="bi bi-box-arrow-in-right fs-3"></i>
                        </div>
                        <h2 className="fw-bold">Вход</h2>
                        <p className="text-muted">Введите данные для доступа</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-bold">Email</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>
                            <input
                                className={`form-control border-start-0 bg-light ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="invalid-feedback">{errors.email}</div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label small fw-bold">Пароль</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text bg-light border-end-0"><i className="bi bi-lock"></i></span>
                            <input
                                type="password"
                                className={`form-control border-start-0 bg-light ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="invalid-feedback">{errors.password}</div>
                        </div>
                    </div>

                    {errors.server && <div className="alert alert-danger p-2 small text-center">{errors.server}</div>}

                    <div className="d-grid gap-2">
                        <button className="btn btn-primary btn-lg shadow-sm" onClick={handleLogin}>Войти</button>
                    </div>

                    <div className="text-center mt-4">
                        <span className="text-muted small">Нет аккаунта?</span>{" "}
                        <Link to="/register" className="small text-decoration-none fw-bold">Создать</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;