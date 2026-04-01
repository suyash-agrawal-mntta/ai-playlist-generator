import { useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

function clamp(value, maxAbsValue) {
  return Math.max(-maxAbsValue, Math.min(maxAbsValue, value));
}

export function usePointerTilt(maxTilt = 6) {
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 280, damping: 24 });
  const rotateY = useSpring(rawRotateY, { stiffness: 280, damping: 24 });

  const onPointerMove = useCallback(
    (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const normalizedX = (x - 0.5) * 2;
      const normalizedY = (y - 0.5) * 2;

      rawRotateY.set(clamp(normalizedX * maxTilt, maxTilt));
      rawRotateX.set(clamp(-normalizedY * maxTilt, maxTilt));
    },
    [maxTilt, rawRotateX, rawRotateY],
  );

  const onPointerLeave = useCallback(() => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }, [rawRotateX, rawRotateY]);

  return { rotateX, rotateY, onPointerMove, onPointerLeave };
}

