const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function readToken() {
  return sessionStorage.getItem("sos_token");
}

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const token = readToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || "The request could not be completed.");
  return result;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/auth/me"),
  modules: () => request("/modules"),
  list: (module) => request(`/modules/${module}`),
  create: (module, data) => request(`/modules/${module}`, { method: "POST", body: JSON.stringify(data) }),
  remove: (module, id) => request(`/modules/${module}/${id}`, { method: "DELETE" })
};
