import { GradientButton } from "../common/GradientButton";

export function PromptForm({
  prompt,
  length,
  loading,
  onPromptChange,
  onLengthChange,
  onGenerate,
}) {
  const disabled = loading || !prompt.trim();

  return (
    <form
      className="prompt-form"
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate();
      }}
    >
      <label className="field-label" htmlFor="prompt">
        Describe your vibe
      </label>
      <textarea
        id="prompt"
        className="prompt-input"
        value={prompt}
        placeholder="late night drive, neon city lights, melodic and chill..."
        onChange={(e) => onPromptChange(e.target.value)}
      />

      <div className="prompt-controls">
        <div>
          <label className="field-label" htmlFor="length">
            Playlist length
          </label>
          <select
            id="length"
            className="length-select"
            value={length}
            onChange={(e) => onLengthChange(Number(e.target.value))}
          >
            <option value={5}>5 songs</option>
            <option value={10}>10 songs</option>
            <option value={15}>15 songs</option>
            <option value={20}>20 songs</option>
          </select>
        </div>

        <GradientButton type="submit" disabled={disabled}>
          {loading ? "Generating..." : "Generate Songs"}
        </GradientButton>
      </div>
    </form>
  );
}

