import { useMemo, useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  const backendBase = useMemo(() => {
    // For local dev, you can keep the default.
    // Later you can set `VITE_BACKEND_URL` in the frontend `.env`.
    return import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:3000";
  }, []);

  const submitDisabled = prompt.trim().length === 0;

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    const p = prompt.trim();
    if (!p) {
      setError("Please enter a prompt.");
      return;
    }

    // Redirect browser to backend OAuth login with the prompt.
    const url = `${backendBase}/login?prompt=${encodeURIComponent(p)}`;
    window.location.href = url;
  }

  return (
    <div className="page">
      <h1 className="title">MusicAI</h1>
      <p className="subtitle">Enter a prompt, and we will create a playlist for you.</p>

      <form className="card" onSubmit={onSubmit}>
        <label className="label" htmlFor="prompt">
          Prompt
        </label>
        <input
          id="prompt"
          className="input"
          value={prompt}
          placeholder='e.g., "sunset road trip"'
          onChange={(e) => setPrompt(e.target.value)}
        />

        {error ? <div className="error">{error}</div> : null}

        <button className="button" type="submit" disabled={submitDisabled}>
          Generate playlist
        </button>
      </form>
    </div>
  );
}

