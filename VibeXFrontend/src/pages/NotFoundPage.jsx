import React from "react";
import { useNavigate } from "react-router";

/* ---------- ICONS ---------- */
const BackIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const HomeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z" />
  </svg>
);

const LightningIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);

/* ---------- COMPONENT ---------- */
function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main
      className="
        min-h-screen w-full
        flex flex-col items-center justify-center
        text-center
        bg-linear-to-b from-gray-50 to-gray-100
        dark:from-black dark:to-zinc-900
        text-gray-900 dark:text-gray-100
        relative overflow-hidden
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute inset-0
          blur-3xl
        "
      />

      {/* Content */}
      <div className="relative z-10 space-y-6 px-4">
        {/* Icon */}
        <div
          className="
            mx-auto h-20 w-20
            rounded-3xl
            bg-linear-to-br from-blue-500 to-indigo-600
            flex items-center justify-center
            text-white shadow-2xl
          "
        >
          <LightningIcon className="h-10 w-10" />
        </div>

        {/* Text */}
        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight">
          404
        </h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Looks like this vibe doesn’t exist anymore.  
          Let’s get you back to the music.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="
              flex items-center gap-2
              px-5 py-2.5 rounded-full
              bg-white dark:bg-zinc-800
              border border-gray-200 dark:border-zinc-700
              text-sm font-medium
              hover:shadow-lg transition
            "
          >
            <BackIcon className="h-4 w-4" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="
              flex items-center gap-2
              px-5 py-2.5 rounded-full
              bg-linear-to-br from-indigo-500 to-purple-600
              text-white text-sm font-medium
              shadow-xl hover:opacity-90 transition
            "
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </button>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
