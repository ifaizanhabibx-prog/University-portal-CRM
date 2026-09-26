import { useParams, Link } from "react-router-dom";
import { initialCourses } from "../data/courses";

function CourseDetail() {
  const { id } = useParams();
  const course = initialCourses.find((c) => String(c.id) === id);

  if (!course) {
    return (
      <div>
        <p className="page-subtitle">Course not found.</p>
        <Link
          to="/courses"
          className="btn-primary"
          style={{ display: "inline-block", marginTop: "12px" }}
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/courses" className="back-link">
        ← Back to Courses
      </Link>

      <div className="detail-card">
        <div className="detail-card__avatar">{course.name.charAt(0)}</div>
        <div>
          <h1 className="page-title">{course.name}</h1>
          <p className="page-subtitle">Instructor: {course.instructor}</p>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-item">
          <span className="detail-item__label">Students Enrolled</span>
          <span className="detail-item__value">{course.students}</span>
        </div>
        <div className="detail-item">
          <span className="detail-item__label">Status</span>
          <span
            className={`status-badge status-badge--${course.status.toLowerCase()}`}
          >
            {course.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
