import type { Course } from "../models/Course";

let courses: Course[] = [
    { id: 1, name: "React Modern Guide", direction: "Frontend" },
    { id: 2, name: "Node.js Architecture", direction: "Backend" },
    { id: 3, name: "UI/UX Design Basics", direction: "Design" },
    { id: 4, name: "TypeScript Advanced", direction: "Frontend" },
    { id: 5, name: "Python for Data Science", direction: "Data Science" },
    { id: 6, name: "Manual Testing", direction: "QA" },
    { id: 7, name: "Automation with Playwright", direction: "QA" },
    { id: 8, name: "C# and .NET Core", direction: "Backend" },
    { id: 9, name: "Figma Pro Tips", direction: "Design" },
    { id: 10, name: "Vue 3 Mastery", direction: "Frontend" },
    { id: 11, name: "Java Spring Boot", direction: "Backend" },
    { id: 12, name: "Docker and Kubernetes", direction: "DevOps" },
    { id: 13, name: "SQL & Database Design", direction: "Database" },
    { id: 14, name: "NestJS Microservices", direction: "Backend" },
    { id: 15, name: "Three.js 3D Web", direction: "Frontend" }
];

export const CourseService = {
    getAll: (): Promise<Course[]> => {
        return Promise.resolve(courses);
    },
    getById: (id: number): Promise<Course | undefined> => {
        const course = courses.find(c => c.id === id);
        return Promise.resolve(course);
    },
    create: (course: Omit<Course, "id">): Promise<Course> => {
        const newId = courses.length > 0 ? Math.max(...courses.map(s => s.id)) + 1 : 1;

        const newCourse: Course = {
            ...course,
            id: newId
        }

        courses.push(newCourse);
        return Promise.resolve(newCourse)
    },
    update: (id: number, updated: Omit<Course, "id">): Promise<Course | undefined> => {
        const index = courses.findIndex(c => c.id === id);

        if (index !== -1) {
            courses[index] = { id, ...updated };
            return Promise.resolve(courses[index]);
        }
        return Promise.resolve(undefined);
    },
    delete: (id: number): Promise<boolean> => {
        const index = courses.findIndex(c => c.id === id);
        if (index !== -1) {
            courses.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false)
    }
}