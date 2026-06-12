import { NavLink } from "react-router-dom";
import {
  MdAdminPanelSettings,
  MdFormatListBulleted,
  MdMusicNote,
  MdOutlineHome,
  MdOutlineSettings,
  MdPlayArrow,
} from "react-icons/md";
import { useEffect } from "react";
import { RiHome3Line, RiPlayList2Fill } from "react-icons/ri";
import { FaPlay, FaRegCompass, FaRegHeart } from "react-icons/fa";
import { IoMdAlbums } from "react-icons/io";
import { PiClockBold, PiClockClockwiseBold, PiFolderSimpleUserBold, PiPlayBold } from "react-icons/pi";
import { IoAlbumsOutline, IoPlayOutline } from "react-icons/io5";
import { LuAlbum } from "react-icons/lu";

/* =========================================================
   SIDEBAR CONFIG
========================================================= */

const MENU_NAV = [
  { label: "Home", path: "/home", icon: <RiHome3Line  size={20} /> },
  { label: "Discover", path: "/discover-songs", icon: <FaRegCompass size={20} /> },
  { label: "Album", path: "/album", icon: <LuAlbum size={20} /> },
  { label: "Artist", path: "/artist", icon: <PiFolderSimpleUserBold  size={20} /> },
  { label: "Player", path: "/song-player", icon: <PiPlayBold size={20} />,},
];

const LIBRARY_NAV = [
  { label: "Recently Added", path: "/recently-added", icon: <PiClockBold  size={20} /> },
  { label: "Most Played", path: "/most-played", icon: <PiClockClockwiseBold size={20} /> },
];

const PLAY_FAV_NAV = [
  { label: "Your favorites", path: "/your-favorites", icon: <FaRegHeart  size={20} /> },
  { label: "Your playlist", path: "/playlist", icon: <RiPlayList2Fill size={20} /> },
];

const FOOTER_NAV = [
  { label: "Admin", path: "/admin", icon: <MdAdminPanelSettings size={20} />, },
  { label: "Settings", path: "/settings", icon: <MdOutlineSettings size={20} />, },
];

/* =========================================================
   SIDEDRAWER
========================================================= */

export default function SideDrawer({ open, setOpen, heightReduce }) {
  const closeDrawer = () => setOpen(false);

  return (
    <div     
      className={`
        fixed
        w-64
        z-40
        h-[calc(100vh-75px)]
        backdrop-blur-xl
        bg-white/80 dark:bg-zinc-900/80
        border border-white/30 dark:border-zinc-700
        shadow-xl shadow-black/5
        transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-70"}
        lg:translate-x-0
        
      `}
    >
      <nav className="p-3 space-y-1 text-sm font-medium h-full overflow-y-auto sidebar-scroll">

        <div className="px-4 py-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            MENU
          </span>
        </div>

        <div className="mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-700">
        {MENU_NAV.map((item) => (
          <NavItem key={item.label} {...item} onClick={closeDrawer} />
        ))}
        </div>

        <div className="px-4 py-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            LIBRARY
          </span>
        </div>

        <div className="mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-700">
        {LIBRARY_NAV.map((item) => (
          <NavItem key={item.label} {...item} onClick={closeDrawer} />
        ))}
        </div>

        <div className="px-4 py-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            PLAYLIST AND FAVORITE
          </span>
        </div>

        <div className="mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-700">
          {PLAY_FAV_NAV.map((item) => (
            <NavItem key={item.label} {...item} onClick={closeDrawer} />
          ))}
        </div>

        <div className="px-4 py-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            GENERAL
          </span>
        </div>

        <div className="mb-4">
          {FOOTER_NAV.map((item) => (
            <NavItem key={item.label} {...item} onClick={closeDrawer} />
          ))}
        </div>

       
      </nav>
    </div>
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