import React from "react";

/* ---------- SVG ICONS ---------- */
const PlayIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21s-7-4.35-9.5-8.5C.5 9.5 2.5 6 6 6c2 0 3.5 1.2 4.5 2.5C11.5 7.2 13 6 15 6c3.5 0 5.5 3.5 3.5 6.5C19 16.65 12 21 12 21z" />
  </svg>
);

const LightningIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);

const FireIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 3s2 3 2 5-2 4-2 4 4 0 4-5-4-7-4-7zM9 3S5 7 5 12c0 5 4 9 7 9s7-4 7-9c0-2-1-4-2-6-1 5-8 5-8 0z" />
  </svg>
);

const MusicIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
  </svg>
);

/* ---------- COMPONENT ---------- */
function Home() {
  const jumpBack = [
    {
      label: "Liked Songs",
      icon: HeartIcon,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      label: "Discover",
      icon: LightningIcon,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      label: "Trending",
      icon: FireIcon,
      gradient: "from-orange-500 to-red-500",
    },
    { label: "Chill", icon: MusicIcon, gradient: "from-cyan-500 to-sky-500" },
    {
      label: "Workout",
      icon: LightningIcon,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      label: "Recently Played",
      icon: PlayIcon,
      gradient: "from-purple-500 to-violet-500",
    },
  ];

  return (
    <main
      className="
        pt-12 lg:pl-64 min-h-screen
        bg-linear-to-b from-gray-50 to-gray-100
        dark:from-black dark:to-zinc-900
        text-gray-900 dark:text-gray-100
      "
    >
      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-12">
        {/* HERO */}
        <section className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Welcome back
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Discover new music, videos, and vibes curated for you.
          </p>
        </section>

        {/* JUMP BACK IN */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Jump Back In</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {jumpBack.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="
                    group relative overflow-hidden
                    rounded-2xl p-4
                    bg-white/80 dark:bg-zinc-900/70
                    backdrop-blur
                    border border-gray-200 dark:border-zinc-800
                    hover:shadow-xl transition
                    cursor-pointer
                  "
                >
                  {/* Gradient Glow */}
                  <div
                    className={`
                      absolute inset-0 opacity-0 group-hover:opacity-100
                      bg-linear-to-br ${item.gradient}
                      blur-2xl transition
                    `}
                  />

                  <div className="relative flex items-center gap-3">
                    <div
                      className={`
                        h-11 w-11 rounded-xl
                        bg-linear-to-br ${item.gradient}
                        flex items-center justify-center
                        text-white shadow-lg
                      `}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* RECENTLY PLAYED */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Recently Played</h3>

          <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="
                  group rounded-2xl p-4
                  bg-white dark:bg-zinc-900
                  border border-gray-200 dark:border-zinc-800
                  hover:shadow-lg transition
                "
              >
                <div className="relative">
                  <div className="h-36 rounded-xl bg-linear-to-br from-gray-300 to-gray-200 dark:from-zinc-800 dark:to-zinc-700" />
                  <button
                    className="
                      absolute bottom-3 right-3
                      h-10 w-10 rounded-full
                      bg-blue-600 text-white
                      opacity-0 group-hover:opacity-100
                      scale-90 group-hover:scale-100
                      transition
                      flex items-center justify-center
                    "
                  >
                    <PlayIcon className="h-5 w-5" />
                  </button>
                </div>

                <h4 className="mt-3 text-sm font-semibold truncate">
                  Playlist {i}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Curated for you
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TRENDING VIDEOS */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Trending Videos</h3>

          <div
            className="
                grid gap-6
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                "
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="
                    group relative overflow-hidden
                    rounded-2xl
                    bg-white/80 dark:bg-zinc-900/70
                    backdrop-blur
                    border border-gray-200 dark:border-zinc-800
                    hover:shadow-xl transition
                    "
              >
                {/* Thumbnail */}
                <div className="relative">
                  <div
                    className="
                        h-48
                        bg-linear-to-br
                        from-indigo-500 via-purple-500 to-pink-500
                    "
                  />

                  {/* Play Overlay */}
                  <button
                    className="
                        absolute inset-0
                        flex items-center justify-center
                        bg-black/40
                        opacity-0 group-hover:opacity-100
                        transition
                        "
                  >
                    <div
                      className="
                            h-14 w-14 rounded-full
                            bg-white/90 dark:bg-zinc-900
                            flex items-center justify-center
                            shadow-xl
                            scale-90 group-hover:scale-100
                            transition
                        "
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 text-blue-600"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Info */}
                <div className="p-4 space-y-1">
                  <h4 className="text-sm font-semibold">Trending Video {i}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Watch now on VibeX
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
