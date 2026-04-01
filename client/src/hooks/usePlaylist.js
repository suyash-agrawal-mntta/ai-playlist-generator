import { useMemo, useState } from "react";
import { api } from "../services/api";

export function usePlaylist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [songs, setSongs] = useState([]);
  const [success, setSuccess] = useState(null);

  const hasSongs = songs.length > 0;

  const canCreate = useMemo(() => hasSongs && !loading, [hasSongs, loading]);

  async function generateSongs(prompt, length) {
    setLoading(true);
    setError("");
    setSuccess(null);

    try {
      const data = await api.generatePreview({ prompt, length });
      const nextSongs = Array.isArray(data?.songs) ? data.songs : [];
      setSongs(nextSongs);

      if (nextSongs.length === 0) {
        setError("No songs found. Try a different prompt.");
      }
    } catch (err) {
      setSongs([]);
      setError(err.message || "Could not generate songs.");
    } finally {
      setLoading(false);
    }
  }

  async function createPlaylist(prompt, length) {
    if (!songs.length) return;

    setLoading(true);
    setError("");

    try {
      const data = await api.createPlaylist({ prompt, length, songs });
      setSuccess({
        totalTracks: data?.totalTracks ?? songs.length,
        playlistUrl: data?.playlistUrl || "",
      });
    } catch (err) {
      setError(err.message || "Could not create playlist.");
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    songs,
    success,
    canCreate,
    generateSongs,
    createPlaylist,
  };
}

