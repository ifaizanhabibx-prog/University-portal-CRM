import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../auth";

function Topbar({ searchValue, onSearchChange, onMenuClick }) {
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="topbar">
      <button className="topbar__menu-btn" onClick={onMenuClick}></button>

      <div className="topbar__search-wrap">
        <input
          type="text"
          className="topbar__search"
          placeholder="Search students, courses"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {searchValue && (
          <button
            className="topbar__search-clear"
            onClick={() => onSearchChange("")}
            aria-label="clear-search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="topbar__user">
        <span className="topbar__user-icon">👤</span>
        <span>{user?.email || "Faizan"}</span>
        <button className="topbar__logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}

export default Topbar;
