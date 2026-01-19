import { Link } from "react-router-dom";
import { MdMenuOpen, MdNotificationsNone, MdOutlineMenu } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";

/* ----------------------------------
   APP TITLE
----------------------------------- */
function AppTitle() {
  return (
    <h1 className="flex items-center font-bold tracking-tight">
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
export default function Header({ open, setOpen, dark, setDark }) {
  const notificationCount = 3; // mock count

  return (
    <header
      className="
        fixed inset-x-2 top-2
        h-14
        z-40
        flex items-center justify-between
        px-2
        rounded-2xl
        backdrop-blur-xl
        bg-white/80 dark:bg-zinc-900/80
        border border-white/20 dark:border-zinc-700
        shadow-sm shadow-black/5
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
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
          "
        >
          {open ? <MdMenuOpen size={28}/>: <MdOutlineMenu size={26} />}
        </button>

        <AppTitle />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* 🔔 Notification */}
        <button
          className="
            relative
            p-2.5 rounded-xl
            text-zinc-700 dark:text-zinc-200
            hover:bg-black/5 dark:hover:bg-white/5
            active:scale-95
            transition
          "
          aria-label="Notifications"
        >
          <MdNotificationsNone size={22} />

          {/* Badge */}
          {notificationCount > 0 && (
            <span
              className="
                absolute -top-1 -right-1
                min-w-4.5 h-4.5
                px-1
                flex items-center justify-center
                text-[10px] font-bold
                rounded-full
                bg-red-500 text-white
                shadow
              "
            >
              {notificationCount}
            </span>
          )}
        </button>

        <ThemeToggle dark={dark} setDark={setDark} />

        <span className="h-6 w-px bg-zinc-200 dark:bg-zinc-700" />

        <Link to="/login">
          <button
            className="
              px-5 py-2
              text-sm font-semibold
              rounded-full
              bg-blue-600 text-white
              hover:bg-blue-700
              active:scale-95
              transition
              shadow-sm shadow-blue-600/20
            "
          >
            Login
          </button>
        </Link>
      </div>
    </header>
  );
}
