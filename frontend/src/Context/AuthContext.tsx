import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'
import type { Student } from '../models/Student';

type AuthType = {
    token: string | null;
    student: Student | null;
    isAuth: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("token")
        if (saved) {
            setToken(saved)
            try {
                const decoded: Student = jwtDecode(saved);
                setStudent(decoded);
            } catch (error) {
                localStorage.removeItem("token")
            }
        }
    }, [])

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
        const decoded: Student = jwtDecode(token);
        setStudent(decoded);
    }
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setStudent(null);
    }
    return (
        <AuthContext.Provider
            value={{ token, student, isAuth: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("No AuthProvider")
    return ctx
}