import { Bot } from "lucide-react";

export default function Header() {
  return (
    <header className="mb-10 text-center">

      <div className="flex items-center justify-center gap-3">

        <Bot size={34} />

        <h1 className="text-5xl font-bold">
          AI Github Repository Explainer
        </h1>

      </div>

      <p className="mt-4 text-lg text-gray-600">
        Any Github repository explained in few seconds.
      </p>

    </header>
  );
}