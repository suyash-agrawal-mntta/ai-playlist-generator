import { Card } from "../common/Card";
import { GradientButton } from "../common/GradientButton";

export function SuccessPanel({ success }) {
  if (!success) return null;

  return (
    <Card className="success-panel">
      <h3 className="section-title">Playlist Ready</h3>
      <p>
        Playlist created successfully with <strong>{success.totalTracks}</strong> tracks.
      </p>
      {success.playlistUrl ? (
        <a href={success.playlistUrl} target="_blank" rel="noreferrer">
          <GradientButton>Open in Spotify</GradientButton>
        </a>
      ) : null}
    </Card>
  );
}

