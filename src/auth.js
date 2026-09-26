const AUTH_KEY = "portal_auth";
const VALID_EMAIL = "admin@university.edu";
const VALID_PASSWORD = "admin123";

export function login(email, password) {
  if (email === VALID_EMAIL && password == VALID_PASSWORD) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email }));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) !== null;
}

export function getUser() {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}
