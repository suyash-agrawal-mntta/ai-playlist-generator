import { cn } from "../../utils/cn";

export function Card({ children, className }) {
  return <section className={cn("glass-card", className)}>{children}</section>;
}

