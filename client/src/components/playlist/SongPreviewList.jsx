import { AnimatePresence, motion } from "framer-motion";
import { Card } from "../common/Card";

export function SongPreviewList({ songs }) {
  return (
    <Card>
      <h3 className="section-title">Song Preview</h3>
      <AnimatePresence>
        <div className="song-grid">
          {songs.map((song, index) => (
            <motion.article
              key={`${song}-${index}`}
              className="song-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <span className="song-index">{String(index + 1).padStart(2, "0")}</span>
              <p className="song-name">{song}</p>
            </motion.article>
          ))}
        </div>
      </AnimatePresence>
    </Card>
  );
}

