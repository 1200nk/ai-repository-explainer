import { X } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function FullscreenModal({
  open,
  markdown,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60"
      onClick={onClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-6 rounded-2xl bg-white shadow-xl"
      >

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

          <h2 className="text-xl font-semibold">
            Repository Explanation
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg border p-2 hover:bg-gray-100"
          >
            <X size={18} />
          </button>

        </div>

        <div className="h-[calc(100%-72px)] overflow-y-auto p-8">

          <div className="prose prose-gray max-w-none">

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
                      {String(children).replace(
                        /\n$/,
                        ""
                      )}
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

      </div>

    </div>
  );
}