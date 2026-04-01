import { requestSpotifyConnectUrl } from "../../services/spotifyUi";

export function SiteNav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-2xl shadow-nav">
      <div className="flex justify-between items-center px-8 h-20 w-full max-w-[1440px] mx-auto">
        <div className="text-2xl font-black tracking-tighter text-primary">Music Maestro</div>

        <div className="hidden md:flex gap-8 items-center">
          <a className="font-bold tracking-tight text-sm text-primary border-b-2 border-primary pb-1" href="#">
            Home
          </a>
          <a className="font-bold tracking-tight text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
            How it Works
          </a>
          <a className="font-bold tracking-tight text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
            Pricing
          </a>
        </div>

        <a
          href={requestSpotifyConnectUrl()}
          className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded-full hover:scale-95 transition-transform active:scale-90 text-sm"
        >
          Connect Spotify
        </a>
      </div>
    </nav>
  );
}

