import React, { useState } from "react";
import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: 0
    });
    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await AuthService.register(form);
            navigate("/login");
        } catch {
            alert("Register error");
        }
    };
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input name="firstName" placeholder="First Name" onChange={handleChange} />
                <input name="lastName" placeholder="Last Name" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                <input name="age" type="number" placeholder="Age" onChange={handleChange} />
                <button>Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;