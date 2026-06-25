import { useState, useRef } from "react";
import { analyzeRepository } from "../services/analyze";

export default function useAnalyze() {
  const sourceRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(null);

  const [files, setFiles] = useState([]);

  const [markdown, setMarkdown] = useState("");

  const [fullscreen, setFullscreen] = useState(false);

  function reset() {
    setLoading(true);

    setStatus(null);

    setFiles([]);

    setMarkdown("");
  }

  function startAnalysis(githubUrl) {
    if (!githubUrl) return;

    if (sourceRef.current) {
      sourceRef.current.close();
    }

    reset();

    sourceRef.current = analyzeRepository(githubUrl, {

      onStatus(data) {
        setStatus(data);
      },

      onFiles(data) {
        setFiles(data);
      },

      onMarkdown(chunk) {
        setMarkdown((prev) => prev + chunk);
      },

      onDone() {
        setLoading(false);
      },

      onError() {
        setLoading(false);

        alert("Analysis failed.");
      }

    });
  }

  function openFullscreen() {
    setFullscreen(true);
  }

  function closeFullscreen() {
    setFullscreen(false);
  }

  return {

    loading,

    status,

    files,

    markdown,

    fullscreen,

    startAnalysis,

    openFullscreen,

    closeFullscreen,

  };
}