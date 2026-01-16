import { TbPlayerPlay } from "react-icons/tb";
import { Link } from "react-router";

export default function SideDrawer({ open, setOpen }) {

  // Close drawer on item click (mobile only — desktop unaffected)
  const closeDrawer = () => setOpen(false);

  return (
    <aside
      className={`
        fixed top-12 left-0 w-64
        h-[calc(100vh-3rem)]
        bg-white dark:bg-zinc-800
        border-r border-gray-200 dark:border-zinc-900
        z-40 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <nav className="p-3 text-sm font-medium space-y-1">

        <Link to="/">
          <NavItem icon={<HomeIcon />} label="Home" onClick={closeDrawer} />
        </Link>

        {/* <Link to="/playlist">
          <NavItem icon={<PlaylistIcon />} label="Playlists" onClick={closeDrawer} />
        </Link> */}

        {/* <Link to="/dashboard">
          <NavItem icon={<DashboardIcon />} label="Dashboard" onClick={closeDrawer} />
        </Link> */}

        <Link to="/songs">
          <NavItem icon={<DashboardIcon />} label="Songs" onClick={closeDrawer} />
        </Link>

        <Link to="/song-player">
          <NavItem icon={<TbPlayerPlay />} label="Song Player" onClick={closeDrawer} />
        </Link>

        
        {/* <NavItem icon={<HeartIcon />} label="Liked Songs" onClick={closeDrawer} />
        <NavItem icon={<RecentPlayedIcon />} label="Recently Played" onClick={closeDrawer} /> */}

        <div className="mt-3 border-t border-gray-200 dark:border-zinc-800 pt-3">

          <Link to="/admin">
            <NavItem icon={<AdminIcon />} label="Admin" onClick={closeDrawer} />
          </Link>
          
          <NavItem icon={<SettingsIcon />} label="Settings" onClick={closeDrawer} />
        </div>

      </nav>
    </aside>
  );
}

/* ---------- NAV COMPONENTS ---------- */

function NavItem({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        flex items-center gap-3
        px-4 py-2 rounded-md
        text-gray-700 dark:text-gray-200
        hover:bg-gray-100 dark:hover:bg-zinc-800
        cursor-pointer transition
      "
    >
      {icon}
      {label}
    </div>
  );
}

function NavGroup({ icon, label, items, open, onToggle, onItemClick }) {
  return (
    <div>
      {/* Parent */}
      <div
        onClick={onToggle}
        className="
          flex items-center justify-between
          px-4 py-2 rounded-md
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-zinc-800
          cursor-pointer transition
        "
      >
        <div className="flex items-center gap-3">
          {icon}
          {label}
        </div>
        <Chevron open={open} />
      </div>

      {/* Submenu */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-6 mt-1 space-y-1">
          {items.map((item) => (
            <div
              key={item.label}
              onClick={onItemClick}
              className="
                flex items-center gap-3
                px-4 py-1.5 rounded-md
                text-sm text-gray-600 dark:text-gray-400
                hover:bg-gray-100 dark:hover:bg-zinc-800
                cursor-pointer transition
              "
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chevron({ open }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

/* ---------- ICON BASE ---------- */

const iconClass = "h-4 w-4 text-gray-500 dark:text-gray-400";

/* ---------- ICONS ---------- */

const Icon = ({ path }) => (
  <svg
    className={iconClass}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={path} />
  </svg>
);

const HomeIcon = () => <Icon path="M3 10l9-7 9 7v10H3z" />;
const DashboardIcon = () => <Icon path="M4 13h6v7H4z M14 4h6v16h-6z" />;
const MusicIcon = () => <Icon path="M9 18V5l12-2v13" />;
const VideoIcon = () => <Icon path="M3 5h13v14H3z M16 9l5-3v12l-5-3z" />;
const WaveIcon = () => <Icon path="M3 12h3l3-6 4 12 3-6h5" />;

const CompassIcon = () => <Icon path="M12 2l4 10-4 10-4-10z" />;
const FireIcon = () => <Icon path="M12 2c2 4 4 6 4 9a4 4 0 11-8 0c0-3 2-5 4-9z" />;
const HeartIcon = () => <Icon path="M12 21l-8-8a5 5 0 017-7l1 1 1-1a5 5 0 017 7z" />;
const PlaylistIcon = () => <Icon path="M4 6h16M4 12h10M4 18h8" />;
const ClockIcon = () => <Icon path="M12 8v5l3 3" />;

const LiveIcon = () => <Icon path="M4 12a8 8 0 0116 0" />;
const MovieIcon = () => <Icon path="M4 4h16v16H4z" />;
const MusicVideoIcon = () => <Icon path="M10 8l6 4-6 4z" />;
const PodcastIcon = () => <Icon path="M12 2a8 8 0 00-8 8" />;

const ChillIcon = () => <Icon path="M3 12h18" />;
const WorkoutIcon = () => <Icon path="M4 10h16M6 14h12" />;
const PartyIcon = () => <Icon path="M12 2l4 8-4 12-4-12z" />;
const FocusIcon = () => <Icon path="M12 8a4 4 0 100 8" />;
// const SleepIcon = () => <Icon path="M3 12h6l-3 6" />;
const RecentPlayedIcon  = () => (
  <Icon
    path="
      M3 12a9 9 0 1 0 3-6.7
      M3 4v4h4
      M12 7v5l3 2
    "
  />
);



const DownloadIcon = () => <Icon path="M12 3v12l4-4m-4 4l-4-4 M4 19h16" />;
// const SettingsIcon = () => <Icon path="M12 15a3 3 0 100-6" />;

const SettingsIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06
      a2 2 0 0 1-2.83 2.83l-.06-.06
      a1.65 1.65 0 0 0-1.82-.33
      a1.65 1.65 0 0 0-1 1.51V21
      a2 2 0 0 1-4 0v-.09
      a1.65 1.65 0 0 0-1-1.51
      a1.65 1.65 0 0 0-1.82.33l-.06.06
      a2 2 0 0 1-2.83-2.83l.06-.06
      a1.65 1.65 0 0 0 .33-1.82
      a1.65 1.65 0 0 0-1.51-1H3
      a2 2 0 0 1 0-4h.09
      a1.65 1.65 0 0 0 1.51-1
      a1.65 1.65 0 0 0-.33-1.82l-.06-.06
      a2 2 0 0 1 2.83-2.83l.06.06
      a1.65 1.65 0 0 0 1.82.33
      h.01
      a1.65 1.65 0 0 0 1-1.51V3
      a2 2 0 0 1 4 0v.09
      a1.65 1.65 0 0 0 1 1.51
      h.01
      a1.65 1.65 0 0 0 1.82-.33l.06-.06
      a2 2 0 0 1 2.83 2.83l-.06.06
      a1.65 1.65 0 0 0-.33 1.82
      v.01
      a1.65 1.65 0 0 0 1.51 1H21
      a2 2 0 0 1 0 4h-.09
      a1.65 1.65 0 0 0-1.51 1z"
    />
  </svg>
);

const AdminIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V6l7-4z" />
    <circle cx="12" cy="11" r="2.5" />
    <path d="M8.5 16c.7-1.5 2-2.5 3.5-2.5s2.8 1 3.5 2.5" />
  </svg>
);
