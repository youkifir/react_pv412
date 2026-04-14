import React, { useState } from "react";
import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await AuthService.login(email, password);
            navigate("/");
        } catch {
            alert("Login error");
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button>Login</button>
            </form>

            <button onClick={() => navigate("/register")}>
                Go to Register
            </button>
        </div>
    );
}

export default LoginPage;