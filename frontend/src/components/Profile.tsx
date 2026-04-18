import { useAuth } from "../Context/AuthContext"

const Profile = () => {
    const { student, logout } = useAuth()
    
    if (!student) return null;

    return (
        <div className="card border-0 shadow-sm bg-light mb-4">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        {/* Аватар-заглушка с инициалом */}
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                             style={{ width: "50px", height: "50px", fontSize: "1.2rem", fontWeight: "bold" }}>
                            {student.firstName?.[0]?.toUpperCase() || "U"}
                        </div>
                        
                        <div className="ms-3">
                            <h5 className="mb-0 text-dark">
                                {student.firstName} {student.lastName}
                            </h5>
                            <span className="badge bg-info text-dark mt-1">
                                <i className="bi bi-shield-lock me-1"></i>
                                {student.role}
                            </span>
                        </div>
                    </div>

                    <button className="btn btn-outline-danger btn-sm px-3" onClick={logout}>
                        <i className="bi bi-box-arrow-right me-1"></i> Выйти
                    </button>
                </div>

                <hr className="my-3 text-muted" />

                <div className="row g-2">
                    <div className="col-sm-6">
                        <small className="text-muted d-block">Электронная почта</small>
                        <span className="fw-medium">{student.email}</span>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                        <small className="text-muted d-block">ID Пользователя</small>
                        <span className="font-monospace text-secondary">#{student.id}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;