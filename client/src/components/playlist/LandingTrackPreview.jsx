import { LANDING_TRACKS } from "../../utils/landingTracks";
import { requestOpenInSpotifyUrl } from "../../services/spotifyUi";
import { TiltHover } from "../common/TiltHover";
import { MaterialIcon } from "../common/MaterialIcon";

export function LandingTrackPreview() {
  return (
    <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-xs font-bold mb-4">
            <MaterialIcon name="check_circle" className="text-sm" />
            Your playlist is ready
          </div>
          <h2 className="text-4xl font-bold tracking-tight">Maestro Blueprint</h2>
        </div>
        <a
          href={requestOpenInSpotifyUrl()}
          className="flex items-center gap-3 px-8 py-4 bg-[#1DB954] text-black font-bold rounded-full hover:scale-105 transition-transform"
        >
          <MaterialIcon name="play_circle" filled className="text-xl" />
          Open in Spotify
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LANDING_TRACKS.map((track) => (
          <TiltHover key={track.id} className="rounded-xl">
            <article className="group bg-surface-container rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-high hover:-translate-y-1 transition-all duration-300 border border-white/5">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img alt={track.artAlt} src={track.artUrl} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <MaterialIcon name="play_arrow" className="text-white" />
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-bold text-on-surface truncate">{track.title}</h4>
                <p className="text-sm text-on-surface-variant truncate">{track.artist}</p>
              </div>
              <p className="text-xs font-mono text-tertiary opacity-80 group-hover:opacity-100 transition-opacity">
                {track.duration}
              </p>
            </article>
          </TiltHover>
        ))}
      </div>
    </section>
  );
}

