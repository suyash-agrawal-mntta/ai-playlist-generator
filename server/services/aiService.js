import { InferenceClient } from "@huggingface/inference";
import { env } from "../config/env.js";

function extractJsonArray(text) {
  if (typeof text !== "string") return null;
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) return null;

  const candidate = text.slice(start, end + 1);
  return JSON.parse(candidate);
}

function normalizeSongs(linesOrItems) {
  const out = [];

  for (const item of linesOrItems) {
    if (typeof item !== "string") continue;
    let s = item.trim();
    if (!s) continue;

    // Normalize dash variants to " - "
    s = s.replaceAll("\u2013", "-").replaceAll("\u2014", "-");

    // Extract "Artist - Song" even if spacing is inconsistent.
    const match = s.match(/^(.+?)\s*-\s*(.+)$/);
    if (!match) continue;

    const artist = match[1].trim();
    const title = match[2].trim();
    if (!artist || !title) continue;

    out.push(`${artist} - ${title}`);
  }

  return out;
}

/**
 * Hugging Face Inference API call using:
 * - model: mistralai/Mistral-7B-Instruct-v0.2 (overridable via HF_MODEL)
 * - returns exactly 10 strings formatted as: "Artist - Song"
 */
export async function generateSongsFromPrompt(prompt) {
  if (typeof prompt !== "string" || !prompt.trim()) {
    throw new Error("Prompt must be a non-empty string");
  }

  if (!env.HF_API_KEY) {
    throw new Error("HF_API_KEY is not set");
  }

  const client = new InferenceClient(env.HF_API_KEY);

  async function fetchSongs(userMessage, expectedCount) {
    let result;
    try {
      result = await client.chatCompletion({
        model: env.HF_MODEL,
        provider: "featherless-ai",
        messages: [
          {
            role: "system",
            content:
              `You are a music recommendation assistant. ` +
              `Reply with ONLY a valid JSON array of exactly ${expectedCount} strings. ` +
              'Each string must be in the format "Artist - Song" (hyphen surrounded by spaces). ' +
              "No markdown, no numbering, no extra text.",
          },
          { role: "user", content: userMessage },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      });
    } catch (err) {
      throw new Error(err?.message || "Hugging Face request failed");
    }

    const rawText =
      result?.choices?.[0]?.message?.content ||
      (typeof result === "string" ? result : null) ||
      result?.generated_text ||
      result?.[0]?.generated_text ||
      result?.[0]?.summary_text ||
      "";

    const parsed = extractJsonArray(rawText);
    const fromJson = Array.isArray(parsed) ? normalizeSongs(parsed) : [];
    const fromLines = normalizeSongs(rawText.split("\n"));
    const songs = fromJson.length >= fromLines.length ? fromJson : fromLines;

    return songs.slice(0, expectedCount);
  }

  const baseSongs = await fetchSongs(prompt.trim(), 10);
  const uniqueSongs = [...new Set(baseSongs)];

  if (uniqueSongs.length >= 10) return uniqueSongs.slice(0, 10);

  // Ask for the remaining songs while explicitly excluding what we already have.
  const needed1 = 10 - uniqueSongs.length;
  const excludeList = uniqueSongs.join(", ");
  const followupMessage =
    `Vibe/theme: "${prompt.trim()}". ` +
    `Generate exactly ${needed1} more UNIQUE songs. ` +
    `Do NOT repeat these: ${excludeList}. ` +
    "Return ONLY the JSON array.";

  const extraSongs = await fetchSongs(followupMessage, needed1);
  const merged = [...new Set([...uniqueSongs, ...extraSongs])];

  if (merged.length < 10) {
    throw new Error(
      `Expected 10 songs, but only got ${merged.length}. (Initial: ${uniqueSongs.length}, extra: ${extraSongs.length})`,
    );
  }

  return merged.slice(0, 10);
}

