import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (login(email, password)) {
      navigate(from, { replace: true });
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-card__title">University Portal</h1>
        <p className="login-card__subtitle">Sign in to your admin account</p>

        {error && <div className="login-card__error">{error}</div>}

        <label className="login-card__label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="login-card__label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit" className="btn-primary login-card__submit">
          Sign In
        </button>

        <p className="login-card__hint">
          Demo credentials: admin@university.edu / admin123
        </p>
      </form>
    </div>
  );
};

export default Login;
