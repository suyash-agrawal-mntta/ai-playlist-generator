import { motion } from "framer-motion";

export function SystemStatusOrb() {
  return (
    <div className="fixed bottom-10 right-10 z-50 pointer-events-none hidden md:block">
      <div className="aura-glow w-64 h-64 rounded-full flex items-center justify-center border border-primary/20 bg-surface/40 backdrop-blur-xl relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
        />

        <div className="relative text-center px-6">
          <p className="text-[10px] font-black tracking-[0.3em] text-primary uppercase mb-2">
            System Status
          </p>
          <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
            Core intelligence active. Transmuting signals...
          </p>
        </div>
      </div>
    </div>
  );
}

