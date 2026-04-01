import { cn } from "../../utils/cn";

export function MaterialIcon({ name, className, filled = false }) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      style={filled ? { fontVariationSettings: "'FILL' 1, 'wght' 500, 'opsz' 24" } : undefined}
      aria-hidden
    >
      {name}
    </span>
  );
}

