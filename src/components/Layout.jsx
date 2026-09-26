import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { initialStudents } from "../data/students";

function Layout() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setStudents(initialStudents);
        setLoading(false);
      } catch {
        setError("Failed to load student data.");
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        <Topbar searchValue={search} onSearchChange={setSearch} />
        <main className="layout__content">
          <Outlet context={{ search, students, setStudents, loading, error }} />
        </main>
      </div>
    </div>
  );
}

export default Layout;
