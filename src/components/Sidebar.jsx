import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: "◱" },
  { to: "/students", label: "Students", icon: "👨‍🎓" },
  { to: "/courses", label: "Courses", icon: "📚" },
];

function Sidebar({ isOpen, onCLose }) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <div className="sidebar__brand">
        <span className="sidebar__mark">◈</span>
        <span className="sidebar__name">University Portal</span>
        <button className="sidebar__close" onClick={onCLose}>
          X
        </button>
      </div>
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
            }
            onClick={onCLose}
          >
            <span className="sidebar__icon">{item.icon}</span>
            <span className="sidebar__text">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
