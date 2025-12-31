import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

/* ================= MOCK DATA ================= */

const nowPlaying = {
  title: "Midnight Drive",
  artist: "Synthwave Collective",
  listeners: 142,
};

const kpis = [
  { label: "Total Plays", value: "14.2K", color: "from-blue-500 to-indigo-500" },
  { label: "Watch Time", value: "1,120 hrs", color: "from-violet-500 to-purple-500" },
  { label: "Downloads", value: "386", color: "from-emerald-500 to-teal-500" },
  { label: "Active Users", value: "6.4K", color: "from-amber-500 to-orange-500" },
];

const weeklyPlays = [
  { day: "Mon", plays: 320 },
  { day: "Tue", plays: 420 },
  { day: "Wed", plays: 390 },
  { day: "Thu", plays: 510 },
  { day: "Fri", plays: 680 },
  { day: "Sat", plays: 920 },
  { day: "Sun", plays: 840 },
];

const monthlyGrowth = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1800 },
  { month: "Mar", users: 2600 },
  { month: "Apr", users: 3400 },
  { month: "May", users: 4600 },
  { month: "Jun", users: 5900 },
];

const videoUsage = [
  { type: "Music Videos", hours: 420 },
  { type: "Live", hours: 310 },
  { type: "Movies", hours: 210 },
  { type: "Podcasts", hours: 180 },
];

const vibes = [
  { name: "Chill", value: 38 },
  { name: "Workout", value: 26 },
  { name: "Focus", value: 21 },
  { name: "Party", value: 15 },
];

const recentActivity = [
  "Liked song · Neon Skyline",
  "Watched live · EDM Arena",
  "Downloaded · Workout Mix",
  "Added song to Chill playlist",
];

/* ================= DASHBOARD ================= */

export default function Dashboard() {
  return (
    <main className="
      pt-12 lg:pl-64 min-h-screen
      bg-gray-50 dark:bg-zinc-950
      text-gray-900 dark:text-gray-100
    ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">

        <Header />

        <NowPlaying />

        <KPIGrid />

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Weekly Plays">
            <WeeklyChart />
          </Card>

          <Card title="Monthly User Growth">
            <GrowthChart />
          </Card>
        </div>

        {/* VIDEOS + VIBES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Video Consumption">
            <VideoUsage />
          </Card>

          <Card title="Vibes Distribution">
            <Vibes />
          </Card>
        </div>

        <Card title="Recent Activity">
          <RecentActivity />
        </Card>

      </div>
    </main>
  );
}

/* ================= SECTIONS ================= */

const Header = () => (
  <header>
    <h2 className="text-3xl font-semibold tracking-tight">
      Dashboard
    </h2>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Overview of your VibeX activity (mock data)
    </p>
  </header>
);

/* 🎧 NOW PLAYING */
const NowPlaying = () => (
  <div className="
    rounded-2xl p-5
    bg-white dark:bg-zinc-900
    border border-gray-200 dark:border-zinc-800
    flex items-center justify-between
  ">
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Now Playing
      </p>
      <p className="font-semibold">
        {nowPlaying.title}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {nowPlaying.artist}
      </p>
    </div>
    <span className="
      text-sm px-3 py-1 rounded-full
      bg-blue-100 dark:bg-blue-900/40
      text-blue-600 dark:text-blue-400
    ">
      {nowPlaying.listeners} listening
    </span>
  </div>
);

/* KPI */
const KPIGrid = () => (
  <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    {kpis.map(k => (
      <div
        key={k.label}
        className="
          relative overflow-hidden
          rounded-2xl p-4
          bg-white dark:bg-zinc-900
          border border-gray-200 dark:border-zinc-800
        "
      >
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${k.color}`}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {k.label}
        </p>
        <p className="text-xl font-semibold mt-1">
          {k.value}
        </p>
      </div>
    ))}
  </section>
);

/* ================= CARDS ================= */

const Card = ({ title, children }) => (
  <section className="
    rounded-2xl p-4
    bg-white dark:bg-zinc-900
    border border-gray-200 dark:border-zinc-800
  ">
    <h4 className="text-sm font-semibold mb-4">
      {title}
    </h4>
    {children}
  </section>
);

/* ================= CHARTS ================= */

const WeeklyChart = () => (
  <ResponsiveContainer width="100%" height={260}>
    <LineChart data={weeklyPlays}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line
        dataKey="plays"
        stroke="#6366f1"
        strokeWidth={3}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

const GrowthChart = () => (
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={monthlyGrowth}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="users" fill="#22c55e" />
    </BarChart>
  </ResponsiveContainer>
);

/* ================= INSIGHTS ================= */

const VideoUsage = () => (
  <div className="space-y-3">
    {videoUsage.map(v => (
      <div key={v.type}>
        <div className="flex justify-between text-sm">
          <span>{v.type}</span>
          <span className="text-gray-500 dark:text-gray-400">
            {v.hours} hrs
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded">
          <div
            className="h-2 rounded bg-violet-500"
            style={{ width: `${(v.hours / 420) * 100}%` }}
          />
        </div>
      </div>
    ))}
  </div>
);

const Vibes = () => (
  <div className="space-y-3">
    {vibes.map(v => (
      <div key={v.name}>
        <div className="flex justify-between text-sm">
          <span>{v.name}</span>
          <span className="text-gray-500 dark:text-gray-400">
            {v.value}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded">
          <div
            className="h-2 rounded bg-blue-500"
            style={{ width: `${v.value}%` }}
          />
        </div>
      </div>
    ))}
  </div>
);

const RecentActivity = () => (
  <ul className="space-y-3 text-sm">
    {recentActivity.map((r, i) => (
      <li
        key={i}
        className="pb-2 border-b border-gray-200 dark:border-zinc-800"
      >
        {r}
      </li>
    ))}
  </ul>
);
