import { NavLink } from "react-router-dom";
import {
  MdAdminPanelSettings,
  MdFormatListBulleted,
  MdMusicNote,
  MdOutlineHome,
  MdOutlineSettings,
  MdPlayArrow,
} from "react-icons/md";

/* =========================================================
   SIDEBAR CONFIG
========================================================= */

const MAIN_NAV = [
  { label: "Home", path: "/", icon: <MdOutlineHome size={24} /> },
  { label: "Songs", path: "/songs", icon: <MdMusicNote size={24} /> },
  { label: "Playlists", path: "/playlist", icon: <MdFormatListBulleted size={24} />,},
  { label: "Song Player", path: "/song-player", icon: <MdPlayArrow size={26} />,},
  { label: "Test", path: "/test", icon: <MdPlayArrow size={26} />,},
];

const FOOTER_NAV = [
  { label: "Admin", path: "/admin", icon: <MdAdminPanelSettings size={24} />, },
  { label: "Settings", path: "/settings", icon: <MdOutlineSettings size={24} />, },
];

/* =========================================================
   SIDEDRAWER
========================================================= */

export default function SideDrawer({ open, setOpen }) {
  const closeDrawer = () => setOpen(false);

  return (
    <aside
      className={`
        fixed
        top-17.5  /* header height + top gap */
        left-2
        w-64
        h-[calc(100vh-4.3rem-0.5rem)]
        z-40
        rounded-2xl
        backdrop-blur-xl
        bg-white/80 dark:bg-zinc-900/80
        border border-white/30 dark:border-zinc-700
        shadow-xl shadow-black/5
        transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-70"}
        lg:translate-x-0
      `}
    >
      <nav className="p-3 space-y-1 text-sm font-medium h-full overflow-y-auto">
        {MAIN_NAV.map((item) => (
          <NavItem key={item.label} {...item} onClick={closeDrawer} />
        ))}

        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
          {FOOTER_NAV.map((item) => (
            <NavItem key={item.label} {...item} onClick={closeDrawer} />
          ))}
        </div>
      </nav>
    </aside>
  );
}


/* =========================================================
   NAV ITEM
========================================================= */

function NavItem({ icon, label, path, onClick }) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `
        group relative flex items-center gap-3
        px-4 py-2 rounded-xl
        transition-all duration-200
        ${
          isActive
            ? "bg-linear-to-r from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400"
            : "text-zinc-700 dark:text-zinc-300"
        }
        hover:bg-white/70 dark:hover:bg-zinc-800/70
        hover:shadow-md hover:shadow-black/5
        `
      }
    >
      {/* Active Glow */}
      <span
        className="
          absolute left-0 top-1/2 -translate-y-1/2
          h-6 w-1 rounded-full
          bg-emerald-500
          opacity-0 group-[.active]:opacity-100
        "
      />

      {/* Icon */}
      <span
        className="
          text-lg
          transition-transform duration-200
          group-hover:scale-115 
        "
      >
        {icon}
      </span>

      {/* Label */}
      <span 
        className="tracking-wide 
          transition-transform duration-200 
          group-hover:scale-105
        "
      >
        {label}
      </span>
    </NavLink>
  );
}