import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const initialCourses = [
  {
    id: 1,
    name: "Computer Science 101",
    instructor: "Dr. Ahsan Iqbal",
    students: 120,
    status: "Active",
  },
  {
    id: 2,
    name: "Calculs 101",
    instructor: "Dr. Sana Riaz",
    students: 90,
    status: "Active",
  },
  {
    id: 3,
    name: "Pak Studies 201",
    instructor: "Dr. Imran Malik",
    students: 83,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Physics 101",
    instructor: "Dr. Fatima Noor",
    students: 69,
    status: "Active",
  },
  {
    id: 5,
    name: "Data Science 621",
    instructor: "Dr. Bilal Chaudhry",
    students: 52,
    status: "Inactive",
  },
];

const emptyForm = { name: "", instructor: "", students: "", status: "Active" };

function Courses() {
  const { search } = useOutletContext();
  const [courses, setCourses] = useState(initialCourses);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    instructor: "",
    students: "",
    status: "Active",
  });

  const filtered = courses.filter((c) =>
    `${c.name} ${c.instructor}`.toLowerCase().includes(search.toLowerCase()),
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.instructor || !form.students) return;

    if (editingId) {
      setCourses(
        courses.map((c) =>
          c.id === editingId
            ? { ...c, ...form, students: Number(form.students) }
            : c,
        ),
      );
    } else {
      setCourses([
        ...courses,
        { id: Date.now(), ...form, students: Number(form.students) },
      ]);
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function handleDelete(id) {
    setCourses(courses.filter((c) => c.id !== id));
  }

  function handleEdit(course) {
    setForm({
      name: course.name,
      instructor: course.instructor,
      students: course.students,
      status: course.status,
    });
    setEditingId(course.id);
    setShowForm(true);
  }

  function handleCancel() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Courses</h1>
          <p className="page-subtitle">Manage and view course information.</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => (showForm ? handleCancel() : setShowForm(true))}
        >
          {showForm ? "Cancel" : "+ Add Course"}
        </button>
      </div>

      {showForm && (
        <form className="add-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Course name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="instructor"
            placeholder="Instructor"
            value={form.instructor}
            onChange={handleChange}
            required
          />
          <input
            name="students"
            type="number"
            placeholder="Students"
            value={form.students}
            onChange={handleChange}
            required
          />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit" className="btn-primary">
            {editingId ? "Update" : "Save"}
          </button>
        </form>
      )}

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Students</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.instructor}</td>
                  <td>{c.students}</td>
                  <td>
                    <span
                      className={`status-badge status-badge--${c.status.toLowerCase()}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleEdit(c.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Courses;
