import { motion } from "framer-motion";
import { GradientButton } from "../common/GradientButton";

export function LandingHero() {
  return (
    <section className="relative z-10 pt-24 pb-12 px-6 text-center max-w-5xl mx-auto">
      <motion.h1
        className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-on-surface to-on-surface-variant"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        Turn your vibe into a playlist{" "}
        <motion.span className="inline-block cursor-default" whileHover={{ rotate: 12 }}>
          🎧
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto mb-12 font-medium"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
      >
        Describe your mood, we’ll build your soundtrack. Harnessing AI to transmute emotions into maestro gold.
      </motion.p>

      <motion.div
        className="flex justify-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16 }}
      >
        <GradientButton as="a" href="#input-section" whileTap={{ scale: 0.95 }}>
          Get Started
        </GradientButton>
      </motion.div>
    </section>
  );
}

