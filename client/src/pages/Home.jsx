import Header from "../components/Header";
import InputForm from "../components/InputForm";
import Progress from "../components/Progress";
import FilesList from "../components/FilesList";
import MarkdownViewer from "../components/MarkdownViewer";
import FullscreenModal from "../components/FullscreenModal";

import useAnalyze from "../hooks/useAnalyze";

export default function Home() {
  const analyze = useAnalyze();

  return (
    <>
      <main className="min-h-screen px-5 py-10">
        <div className="mx-auto max-w-7xl">

          <Header />

          <InputForm
            loading={analyze.loading}
            onAnalyze={analyze.startAnalysis}
          />

          {(analyze.loading || analyze.status) && (
            <Progress
              status={analyze.status}
            />
          )}

          {analyze.files.length > 0 && (
            <FilesList
              files={analyze.files}
            />
          )}

          {(analyze.markdown || analyze.loading) && (
            <MarkdownViewer
              markdown={analyze.markdown}
              onFullscreen={analyze.openFullscreen}
            />
          )}

        </div>
      </main>

      <FullscreenModal
        open={analyze.fullscreen}
        markdown={analyze.markdown}
        onClose={analyze.closeFullscreen}
      />
    </>
  );
}