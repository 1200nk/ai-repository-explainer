import {
  Copy,
  Download,
  Expand,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownViewer({
  markdown,
  onFullscreen,
}) {
  function copyMarkdown() {
    navigator.clipboard.writeText(markdown);
  }

  function downloadMarkdown() {
    const blob = new Blob([markdown], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "repository-analysis.md";

    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="mb-10 rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

        <h2 className="text-xl font-semibold">
          Repository Explanation
        </h2>

        <div className="flex gap-2">

          <button
            onClick={copyMarkdown}
            className="rounded-lg border p-2 hover:bg-gray-100"
          >
            <Copy size={18} />
          </button>

          <button
            onClick={downloadMarkdown}
            className="rounded-lg border p-2 hover:bg-gray-100"
          >
            <Download size={18} />
          </button>

          <button
            onClick={onFullscreen}
            className="rounded-lg border p-2 hover:bg-gray-100"
          >
            <Expand size={18} />
          </button>

        </div>

      </div>

      <div className="prose prose-gray max-w-none overflow-x-auto p-8">

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }) {
              const match =
                /language-(\w+)/.exec(
                  className || ""
                );

              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneLight}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className={className}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>

      </div>

    </div>
  );
}