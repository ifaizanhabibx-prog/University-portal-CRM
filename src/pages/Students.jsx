import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { initialStudents } from "../data/students";

const emptyForm = { name: "", email: "", course: "", status: "Active" };

function Students() {
  const { search } = useOutletContext();
  const [students, setStudents] = useState(initialStudents);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);

  const filtered = students.filter((s) =>
    `${s.name} ${s.email} ${s.course}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.course) return;

    if (editingId) {
      setStudents(
        students.map((s) => (s.id === editingId ? { ...s, ...form } : s)),
      );
    } else {
      setStudents([...students, { id: Date.now(), ...form }]);
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function handleDelete(id) {
    setStudents(students.filter((s) => s.id !== id));
  }

  function handleEdit(student) {
    setForm({
      name: student.name,
      email: student.email,
      course: student.course,
      status: student.status,
    });
    setEditingId(student.id);
    setLoading(true);
    setShowForm(true);
  }

  function handleCancel() {
    setForm(emptyForm);
    setEditingId(null);
    setLoading(true);
    setShowForm(false);
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="page-subtitle">Manage and view student information.</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => (showForm ? handleCancel() : setShowForm(true))}
        >
          {showForm ? "Cancel" : "+ Add Student"}
        </button>
      </div>

      {showForm && (
        <form className="add-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="course"
            placeholder="Course"
            value={form.course}
            onChange={handleChange}
            required
          />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Graduated">Graduated</option>
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
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  style={{ alignItems: "center", padding: "20px" }}
                >
                  Loading students...
                </td>
              </tr>
            ) : Error ? (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    alignItems: "center",
                    padding: "20px",
                    color: "#B3261E",
                  }}
                >
                  {Error}
                </td>
              </tr>
            ) : filtered.length > 0 ? (
              filtered.map((s) => (
                <tr key={s.id}>
                  <td>
                    <Link to={`/students/${s.id}`} className="row-link">
                      {s.name}
                    </Link>
                  </td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                  <td>
                    <span
                      className={`status-badge status-badge--${s.status.toLowerCase()}`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="row-actions">
                    <button className="btn-edit" onClick={() => handleEdit(s)}>
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(s.id)}
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
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;
