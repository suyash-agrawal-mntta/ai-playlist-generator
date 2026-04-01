import { motion } from "framer-motion";
import { usePointerTilt } from "../../hooks/usePointerTilt";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../utils/cn";

export function TiltHover({ className, children }) {
  const reducedMotion = useReducedMotion();
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = usePointerTilt(6);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={{ rotateX, rotateY, perspective: 1200 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}

