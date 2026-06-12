import { Link } from "react-router-dom";
import { MdMenuOpen, MdNotificationsNone, MdOutlineMenu } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";

/* ----------------------------------
   APP TITLE
----------------------------------- */
function AppTitle() {
  return (
    <h1 className="ml-4 flex items-center font-bold tracking-tight">
      <span className="text-xl md:text-2xl text-zinc-900 dark:text-white">
        Vibe
      </span>
      <span
        className="
          text-4xl
          bg-linear-to-r from-blue-600 to-indigo-500
          bg-clip-text text-transparent
        "
      >
        X
      </span>
    </h1>
  );
}

/* ----------------------------------
   HEADER
----------------------------------- */
export default function Header({ open, setOpen }) {
  return (
    <header
      className="
        fixed
        h-16
        w-full
        z-40
        flex items-center
        px-2
        backdrop-blur-xl
        bg-white/80 dark:bg-zinc-900/80
        border-b border-white/20 dark:border-zinc-700
        shadow-sm shadow-black/5
      "
    >
      {/* Left */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
        className="
      lg:hidden
      p-1 rounded-xl
      text-zinc-700 dark:text-zinc-200
      hover:bg-black/5 dark:hover:bg-white/5
      active:scale-95
      transition
      z-10
    "
      >
        {open ? <MdMenuOpen size={28} /> : <MdOutlineMenu size={26} />}
      </button>

      {/* Centered Title */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <AppTitle />
      </div>
    </header>
  );
}
