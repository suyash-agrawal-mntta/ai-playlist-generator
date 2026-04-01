import { cn } from "../../utils/cn";

export function GlassPanel({ className, children }) {
  return (
    <div
      className={cn(
        "glass-panel p-8 md:p-12 rounded-xl shadow-2xl border border-white/5 relative overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

