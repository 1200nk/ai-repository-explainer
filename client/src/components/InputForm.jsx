import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function InputForm({
  loading,
  onAnalyze,
}) {
  const [githubUrl, setGithubUrl] = useState("");

  const [instructions, setInstructions] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!githubUrl.trim()) {
      return;
    }

    onAnalyze(githubUrl.trim(), instructions.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >

      <div className="space-y-5">

        <div>

          <label className="mb-2 block font-medium">
            GitHub Repository URL
          </label>

          <input
            type="url"
            placeholder="https://github.com/facebook/react"
            value={githubUrl}
            onChange={(e) =>
              setGithubUrl(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Optional Instructions
          </label>

          <textarea
            rows={3}
            placeholder="Focus on authentication, database layer, API architecture..."
            value={instructions}
            onChange={(e) =>
              setInstructions(e.target.value)
            }
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
          />

        </div>

        <div className="flex items-center justify-between">

          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              onClick={() =>
                setInstructions(
                  "Focus on project architecture."
                )
              }
              className="rounded-full border px-3 py-1 text-sm hover:bg-gray-100"
            >
              Architecture
            </button>

            <button
              type="button"
              onClick={() =>
                setInstructions(
                  "Explain the backend."
                )
              }
              className="rounded-full border px-3 py-1 text-sm hover:bg-gray-100"
            >
              Backend
            </button>

            <button
              type="button"
              onClick={() =>
                setInstructions(
                  "Explain the frontend."
                )
              }
              className="rounded-full border px-3 py-1 text-sm hover:bg-gray-100"
            >
              Frontend
            </button>

          </div>

          <button
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Sparkles size={18} />

            {loading
              ? "Analyzing..."
              : "Explain"}

          </button>

        </div>

      </div>

    </form>
  );
}