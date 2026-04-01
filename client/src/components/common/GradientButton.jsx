import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function GradientButton({ as = "button", className, children, ...props }) {
  const Component = motion[as];

  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center px-8 py-4 rounded-xl font-extrabold text-on-primary",
        "bg-gradient-to-r from-primary to-primary-container",
        "shadow-[0_0_30px_rgba(221,183,255,0.3)] hover:shadow-[0_0_50px_rgba(221,183,255,0.5)]",
        "transition-all duration-500 scale-105",
        className,
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </Component>
  );
}

