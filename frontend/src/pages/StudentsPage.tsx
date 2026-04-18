import { useEffect, useState } from "react";
import { api } from "../services/api";
import { validateName, validateEmail } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";

const StudentsPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<any>({});

  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Ошибка загрузки:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const validate = () => {
    const newErrors: any = {};
    if (!firstName) {
      newErrors.firstName = "Имя обязательно";
    } else if (!validateName(firstName)) {
      newErrors.firstName = "Минимум 2 символа";
    }
    if (!email) {
      newErrors.email = "Email обязателен";
    } else if (!validateEmail(email)) {
      newErrors.email = "Неверный email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addStudent = async () => {
    if (!validate()) return;
    try {
      await api.post("/students", {
        firstName,
        lastName: "test",
        email,
        age: 20
      });
      setFirstName("");
      setEmail("");
      setErrors({});
      load();
    } catch {
      setErrors({ server: "Ошибка создания на сервере" });
    }
  };

  // ФУНКЦИЯ УДАЛЕНИЯ
  const deleteStudent = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этого студента?")) {
      try {
        await api.delete(`/students/${id}`);
        load(); // Обновляем список
      } catch (err) {
        alert("Ошибка при удалении");
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-10"> {/* Увеличил ширину для кнопок */}

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3 mb-0">Управление студентами</h2>
            <Link to="/profile" className="btn btn-outline-primary shadow-sm">
              <i className="bi bi-person-circle me-2"></i> Мой профиль
            </Link>
          </div>

          {/* Форма добавления */}
          <div className="card shadow-sm mb-5 border-0">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="mb-0">Добавить нового студента</h5>
            </div>
            <div className="card-body bg-light">
              <div className="row g-3">
                <div className="col-md-5">
                  <input
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    placeholder="Имя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <div className="invalid-feedback">{errors.firstName}</div>
                </div>
                <div className="col-md-5">
                  <input
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-success w-100" onClick={addStudent}>
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Список студентов */}
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 text-secondary">Активные студенты</h5>
              <span className="badge bg-primary rounded-pill">{students.length}</span>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Студент</th>
                    <th>Email</th>
                    <th className="text-center">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((s) => (
                      <tr key={s.id || s.Id}>
                        <td className="ps-4">
                          <div className="fw-bold text-dark">{s.firstName || s.FirstName}</div>
                          <small className="text-muted">ID: {s.id || s.Id}</small>
                        </td>
                        <td>{s.email || s.Email}</td>
                        <td className="text-center">
                          <div className="btn-group btn-group-sm">
                            {/* Редактирование */}
                            <Link
                              to={`/edit/${s.id || s.Id}`}
                              className="btn btn-outline-warning"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>

                            {/* Удаление */}
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => deleteStudent(s.id || s.Id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center py-4 text-muted">
                        Список студентов пуст
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentsPage;