import { Link } from "react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header({ setOpen, dark, setDark }) {
  return (
    <header
      className="
        fixed top-0 left-0 right-0
        h-12
        bg-white/80 dark:bg-zinc-900/80
        backdrop-blur
        border-b border-gray-200/70 dark:border-zinc-800
        flex items-center justify-between
        px-4 z-40
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={() => setOpen(true)}
          className="
            lg:hidden
            p-2 rounded-lg
            text-gray-700 dark:text-gray-200
            hover:bg-gray-200/60 dark:hover:bg-zinc-800
            transition
          "
          aria-label="Open menu"
        >
          ☰
        </button>

        <h1 className="text-base font-semibold tracking-tight flex items-center gap-0.5">
          <span className="text-gray-900 dark:text-white">Vibe</span>
          <span className="bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            X
          </span>
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <ThemeToggle dark={dark} setDark={setDark} />

        {/* Divider */}
        <span className="h-5 w-px bg-gray-200 dark:bg-zinc-700" />

        {/* Login Button */}
        <Link to="/login">
          <button
            className="
            px-4 py-1.5
            text-sm font-medium
            rounded-full
            bg-blue-600 text-white
            hover:bg-blue-700
            active:scale-95
            transition
          "
          >
            Login
          </button>
        </Link>
      </div>
    </header>
  );
}
