import { useState } from "react";
import { motion } from "framer-motion";
import { LANDING_TRY_SUGGESTIONS } from "../../utils/landingTracks";
import { GlassPanel } from "../common/GlassPanel";
import { MaterialIcon } from "../common/MaterialIcon";
import { TiltHover } from "../common/TiltHover";

export function LandingPromptTeaser() {
  const [prompt, setPrompt] = useState("");
  const [playlistLength, setPlaylistLength] = useState(25);
  const [moodIntensity, setMoodIntensity] = useState(80);

  const moodLabel = moodIntensity >= 70 ? "High" : moodIntensity >= 40 ? "Medium" : "Low";

  return (
    <section className="relative z-10 py-16 px-6 max-w-4xl mx-auto" id="input-section">
      <TiltHover className="rounded-xl">
        <GlassPanel>
          <div className="absolute top-0 right-0 p-4">
            <MaterialIcon name="auto_awesome" className="text-primary/30 text-4xl" />
          </div>

          <div className="space-y-8">
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 ml-4">
                MAESTRO&apos;S Prompt
              </label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-high border-none rounded-xl px-8 py-6 text-xl md:text-2xl text-on-surface placeholder:text-on-surface-variant/30 focus:ring-2 focus:ring-primary/50 transition-all duration-300 outline-none"
                  placeholder="Late night drive through neon streets..."
                  type="text"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <MaterialIcon name="keyboard_voice" className="text-on-surface-variant/50" />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 px-4">
                <span className="text-xs text-on-surface-variant/60">Try:</span>
                {LANDING_TRY_SUGGESTIONS.map((suggestion) => (
                  <motion.button
                    key={suggestion}
                    type="button"
                    className="text-xs bg-surface-container-highest px-3 py-1 rounded-full hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
                    whileTap={{ y: 2 }}
                    onClick={() => setPrompt(suggestion)}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <label className="text-sm font-bold text-on-surface-variant">Playlist length</label>
                  <span className="text-sm text-primary font-mono">{playlistLength} Tracks</span>
                </div>
                <input
                  className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                  type="range"
                  min={5}
                  max={50}
                  value={playlistLength}
                  onChange={(event) => setPlaylistLength(Number(event.target.value))}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <label className="text-sm font-bold text-on-surface-variant">Mood intensity</label>
                  <span className="text-sm text-secondary font-mono">{moodLabel}</span>
                </div>
                <input
                  className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary"
                  type="range"
                  min={0}
                  max={100}
                  value={moodIntensity}
                  onChange={(event) => setMoodIntensity(Number(event.target.value))}
                />
              </div>
            </div>

            <motion.button
              type="button"
              className="w-full py-6 bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary font-black text-xl rounded-xl relative overflow-hidden group"
              whileTap={{ scale: 0.99 }}
            >
              <span className="relative z-10 inline-flex items-center justify-center gap-3">
                <MaterialIcon name="bolt" filled />
                GENERATE SOUNDTRACK
              </span>
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </div>
        </GlassPanel>
      </TiltHover>
    </section>
  );
}

