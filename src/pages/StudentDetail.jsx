import { useParams, Link } from "react-router-dom";
import { initialStudents } from "../data/students";

function StudentDetail() {
  const { id } = useParams();
  const student = initialStudents.find((s) => String(s.id) === id);

  if (!student) {
    return (
      <div>
        <p className="page-subtitle">Student not found.</p>
        <Link to="/students" className="btn-primary" style={{ display: "inline-block", marginTop: "12px" }}>
          Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/students" className="back-link">← Back to Students</Link>

      <div className="detail-card">
        <div className="detail-card__avatar">{student.name.charAt(0)}</div>
        <div>
          <h1 className="page-title">{student.name}</h1>
          <p className="page-subtitle">{student.email}</p>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-item">
          <span className="detail-item__label">Course</span>
          <span className="detail-item__value">{student.course}</span>
        </div>
        <div className="detail-item">
          <span className="detail-item__label">Status</span>
          <span className={`status-badge status-badge--${student.status.toLowerCase()}`}>
            {student.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StudentDetail;