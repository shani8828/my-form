export const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function logPageVisit(page) {
  try {
    await fetch(`${API}/api/log-visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: page, duration: 0 }), // duration can be updated later
    });
  } catch (err) {
    console.error("Failed to log visit:", err);
  }
}

