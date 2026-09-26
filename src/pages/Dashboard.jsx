import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { initialStudents } from "../data/students";
import { initialCourses } from "../data/courses";
import { useOutletContext } from "react-router-dom";

const recentActivities = [
  {
    text: "New student Ayesha enrolled in 'Computer Science 101'",
    time: "2 hours ago",
  },
  {
    text: "Course 'Mathematics 201' updated with new syllabus",
    time: "5 hours ago",
  },
  {
    text: "Student Jane Smith graduated from 'Physics 301'",
    time: "1 day ago",
  },
  {
    text: "New course 'Data Science 101' added to the curriculum",
    time: "2 days ago",
  },
];

function Dashboard() {
  const totalStudents = initialStudents.length;
  const totalCourses = initialCourses.length;
  const { loading, error } = useOutletContext();
  const activeEnrollments = initialStudents.filter(
    (s) => s.status === "Active",
  ).length;
  const graduatedStudents = initialStudents.filter(
    (s) => s.status === "Graduated",
  ).length;

  const stats = [
    { label: "Total Students", value: totalStudents, icon: "👨‍🎓" },
    { label: "Total Courses", value: totalCourses, icon: "📚" },
    { label: "Active Enrollments", value: activeEnrollments, icon: "📝" },
    { label: "Graduated Students", value: graduatedStudents, icon: "🎓" },
  ];

  const enrollmentByCourse = Object.values(
    initialStudents.reduce((acc, s) => {
      acc[s.course] = acc[s.course] || { course: s.course, students: 0 };
      acc[s.course].students += 1;
      return acc;
    }, {}),
  );

  if (loading) {
    return (
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Loading overview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle" style={{ color: "#b3261e" }}>
          {error}
        </p>
      </div>
    );
  }
  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Overview of enrollment and activity.</p>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-card__icon">{stat.icon}</div>
            <div>
              <div className="stat-card__value">{stat.value}</div>
              <div className="stat-card__label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="activity-card">
        <h2 className="activity-card__title">Recent Activities</h2>
        <ul className="activity-card__list">
          {recentActivities.map((item) => (
            <li className="activity-list__item" key={item.text}>
              <span>{item.text}</span>
              <span className="activity-list__time">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="chart-card">
        <h2 className="chart-card__title">Students per course</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={enrollmentByCourse}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E3E6EA" />
            <XAxis dataKey="course" fontSize={12} />
            <YAxis allowDecimals={false} fontSize={12} />
            <Tooltip />
            <Bar dataKey="students" fill="#3d5a80" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
