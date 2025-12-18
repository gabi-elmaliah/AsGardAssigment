const API_URL = "/api/students";

export async function fetchStudents() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
}

export async function createStudent(student) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create student");
  }

  return res.json();
}

export async function fetchStudentById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch student");
  return res.json();
}

export async function deleteStudent(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete student");
}

export async function updateStudent(id, updatedStudent) {
  const res = await fetch(`/api/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStudent),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update student");
  }

  return res.json();
}
