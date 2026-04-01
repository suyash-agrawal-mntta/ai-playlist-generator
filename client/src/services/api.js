const BACKEND_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:3000";

async function request(path, options = {}) {
  const response = await fetch(`${BACKEND_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof body === "string"
        ? body
        : body?.error || body?.message || "Request failed";
    throw new Error(message);
  }

  return body;
}

export const api = {
  getLoginUrl() {
    return `${BACKEND_BASE}/login`;
  },

  async generatePreview({ prompt, length }) {
    return request("/generate-playlist/preview", {
      method: "POST",
      body: JSON.stringify({ prompt, length }),
    });
  },

  async createPlaylist({ prompt, length, songs }) {
    return request("/generate-playlist", {
      method: "POST",
      body: JSON.stringify({ prompt, length, songs }),
    });
  },
};

