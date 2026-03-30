/**
 * Spotify OAuth `state` is used to carry the user's prompt through the redirect.
 */

export function createPromptState(prompt) {
  const payload = { prompt };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function decodePromptFromState(state, fallbackPrompt) {
  if (typeof state !== "string" || state.length >= 5000) return fallbackPrompt;

  try {
    const decoded = Buffer.from(state, "base64").toString("utf8");
    const parsed = JSON.parse(decoded);

    if (parsed && typeof parsed.prompt === "string" && parsed.prompt.trim()) {
      return parsed.prompt.trim();
    }
  } catch {
    // If state decoding fails, just fall back.
  }

  return fallbackPrompt;
}

export function sanitizePrompt(prompt, fallbackPrompt, maxLen = 200) {
  const input = typeof prompt === "string" ? prompt.trim() : "";
  const safe = input || fallbackPrompt;
  return safe.slice(0, maxLen);
}

