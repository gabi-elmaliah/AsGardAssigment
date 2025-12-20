const API_URL = "/api/schedule/generate";

export async function generateSchedule(weekStart) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ weekStart }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to generate schedule");
  }

  return res.json();
}
