import { motion } from "framer-motion";

export function LoadingState({ text = "Loading..." }) {
  return (
    <motion.div
      className="loading-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="spinner" />
      <p>{text}</p>
    </motion.div>
  );
}

