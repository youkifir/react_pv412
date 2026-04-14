import type { Student } from '../models/Student';
import { api } from './api';

export const StudentService = {
    async getAll(): Promise<Student[]> {
        const res = await api.get("/students")
        return res.data
    },
    async getById(id: number): Promise<Student> {
        const res = await api.get(`/students/${id}`)
        return res.data
    },
    async create(student: Omit<Student, "id" | "password" | "role">): Promise<Student> {
        const res = await api.post("/students", student)
        return res.data
    },
    async update(id: number, student: Omit<Student, "id" | "password" | "role">): Promise<Student> {
        const res = await api.put(`/students/${id}`, student)
        return res.data
    },
    async delete(id: number): Promise<void> {
        const res = await api.delete(`/students/${id}`)
        return res.data
    }
}