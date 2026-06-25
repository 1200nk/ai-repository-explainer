import {
  ChevronDown,
  ChevronUp,
  FileCode2,
} from "lucide-react";

import { useState } from "react";

export default function FilesList({
  files,
}) {
  const [open, setOpen] = useState(true);

  if (!files.length) return null;

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4"
      >

        <div className="font-semibold">
          Files Analyzed ({files.length})
        </div>

        {open ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}

      </button>

      {open && (
        <div className="max-h-64 overflow-y-auto border-t border-gray-200">

          {files.map((file) => (
            <div
              key={file}
              className="flex items-center gap-3 border-b border-gray-100 px-5 py-3 last:border-b-0"
            >

              <FileCode2
                size={18}
                className="text-gray-500"
              />

              <span className="font-mono text-sm break-all">
                {file}
              </span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}