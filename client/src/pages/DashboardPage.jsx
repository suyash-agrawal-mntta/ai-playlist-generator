import { AnimatePresence, motion } from "framer-motion";
import { Card } from "../components/common/Card";
import { ErrorBanner } from "../components/common/ErrorBanner";
import { GradientButton } from "../components/common/GradientButton";
import { LoadingState } from "../components/common/LoadingState";
import { PromptForm } from "../components/playlist/PromptForm";
import { SongPreviewList } from "../components/playlist/SongPreviewList";
import { SuccessPanel } from "../components/playlist/SuccessPanel";

export function DashboardPage({
  prompt,
  length,
  loading,
  error,
  songs,
  success,
  onPromptChange,
  onLengthChange,
  onGenerate,
  onCreatePlaylist,
  onBack,
}) {
  return (
    <main className="page-shell dashboard">
      <div className="dashboard-head">
        <button className="ghost-btn" onClick={onBack}>
          Back
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <h2 className="section-title">Playlist Dashboard</h2>
          <PromptForm
            prompt={prompt}
            length={length}
            loading={loading}
            onPromptChange={onPromptChange}
            onLengthChange={onLengthChange}
            onGenerate={onGenerate}
          />
        </Card>
      </motion.div>

      <ErrorBanner message={error} />
      <AnimatePresence>{loading ? <LoadingState text="Crafting your soundtrack..." /> : null}</AnimatePresence>

      {songs.length > 0 ? (
        <>
          <SongPreviewList songs={songs} />
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <GradientButton className="create-btn" disabled={loading} onClick={onCreatePlaylist}>
              {loading ? "Creating..." : "Create Playlist"}
            </GradientButton>
          </motion.div>
        </>
      ) : null}

      <SuccessPanel success={success} />
    </main>
  );
}

