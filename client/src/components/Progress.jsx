import {
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

const STEPS = [
  {
    key: "repository",
    label: "Fetching repository",
  },
  {
    key: "selection",
    label: "Selecting important files",
  },
  {
    key: "download",
    label: "Downloading source files",
  },
  {
    key: "analysis",
    label: "Generating explanation",
  },
];

export default function Progress({ status }) {
  if (!status) return null;

  const currentIndex = STEPS.findIndex(
    (step) => step.key === status.step
  );

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <h2 className="mb-4 text-lg font-semibold">
        Progress
      </h2>

      <div className="space-y-3">

        {STEPS.map((step, index) => {
          const finished = index < currentIndex;

          const active = step.key === status.step;

          return (
            <div
              key={step.key}
              className="flex items-center gap-3"
            >
              {finished ? (
                <CheckCircle2
                  size={20}
                  className="text-green-600"
                />
              ) : active ? (
                <LoaderCircle
                  size={20}
                  className="animate-spin text-blue-600"
                />
              ) : (
                <div className="h-5 w-5 rounded-full border border-gray-300" />
              )}

              <span
                className={
                  active
                    ? "font-medium text-blue-600"
                    : finished
                    ? "text-gray-900"
                    : "text-gray-400"
                }
              >
                {step.label}
              </span>
            </div>
          );
        })}

      </div>

      <div className="mt-5 rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700">
        {status.message}
      </div>

    </div>
  );
}