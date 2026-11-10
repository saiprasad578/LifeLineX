const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getRecords(moduleName) {
  const response = await fetch(`${API_URL}/${moduleName}`);
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Unable to load records.");
  return result.items || [];
}

export async function createRecord(moduleName, data) {
  const response = await fetch(`${API_URL}/${moduleName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Unable to save record.");
  return result.item;
}

export async function deleteRecord(moduleName, id) {
  const response = await fetch(`${API_URL}/${moduleName}/${id}`, { method: "DELETE" });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Unable to delete record.");
  return result;
}
