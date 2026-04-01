import { AmbientBackground } from "../components/common/AmbientBackground";
import { SiteFooter } from "../components/common/SiteFooter";
import { SiteNav } from "../components/common/SiteNav";
import { LandingHero } from "../components/playlist/LandingHero";
import { LandingPromptTeaser } from "../components/playlist/LandingPromptTeaser";
import { LandingTrackPreview } from "../components/playlist/LandingTrackPreview";
import { SystemStatusOrb } from "../components/playlist/SystemStatusOrb";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-container-lowest selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="relative pt-20">
        <AmbientBackground />
        <LandingHero />
        <LandingPromptTeaser />
        <LandingTrackPreview />
      </main>
      <SiteFooter />
      <SystemStatusOrb />
    </div>
  );
}

