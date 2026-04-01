import { useState } from "react";
import { usePlaylist } from "./hooks/usePlaylist";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";

export default function App() {
  const [activePage, setActivePage] = useState("landing");
  const [prompt, setPrompt] = useState("late night drive");
  const [length, setLength] = useState(10);

  const { loading, error, songs, success, generateSongs, createPlaylist } = usePlaylist();

  if (activePage === "landing") {
    return <LandingPage />;
  }

  return (
    <DashboardPage
      prompt={prompt}
      length={length}
      loading={loading}
      error={error}
      songs={songs}
      success={success}
      onPromptChange={setPrompt}
      onLengthChange={setLength}
      onGenerate={() => generateSongs(prompt, length)}
      onCreatePlaylist={() => createPlaylist(prompt, length)}
      onBack={() => setActivePage("landing")}
    />
  );
}

