import { api } from "./api";

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})
export const AuthService = {
    async login(email: string, password: string) {
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
    },
    async register(data: any) {
        const res = await api.post("/auth/register", data);
        if (res.data) {
            alert("User register seccessfully!");
        } else {
            alert(`Register error`);
        }
    },
    logout() {
        localStorage.removeItem("token");
    },
    is_auth() {
        return !!localStorage.getItem("token");
    }
}