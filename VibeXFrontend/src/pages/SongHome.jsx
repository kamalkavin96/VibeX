import { Link } from "react-router";
import { FaPlay, FaHeart, FaFire, FaMusic, FaList } from "react-icons/fa";
import { MdFlashOn } from "react-icons/md";

/* ---------- COMPONENT ---------- */
function SongHome() {

  const jumpBack = [
     {
      label: "Discover Songs",
      icon: MdFlashOn,
      gradient: "from-blue-500 to-indigo-500",
      navigation: "/discover-songs",
    },
    {
      label: "PlayList",
      icon: FaList,
      gradient: "from-indigo-500 to-purple-500",
      navigation: "/playlist",
    },
    // {
    //   label: "Liked Songs",
    //   icon: FaHeart,
    //   gradient: "from-pink-500 to-rose-500",
    //   navigation: "/liked-songs",
    // },
    // {
    //   label: "Trending Songs",
    //   icon: FaFire,
    //   gradient: "from-orange-500 to-red-500",
    //   navigation: "/trending-songs",
    // },
    // {
    //   label: "Recently Played",
    //   icon: FaPlay,
    //   gradient: "from-pink-500 to-fuchsia-500",
    //   navigation: "/recently-played",
    // },
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {jumpBack.map((item) => {
              const Icon = item.icon;
              return (
                <Link to={item.navigation}>
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
                        <Icon size={20} />
                      </div>

                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </div>
                </Link>
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
                    <FaPlay size={18} />
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

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="relative">
                  <div className="h-48 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500" />

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
                      <FaPlay className="text-blue-600" size={24} />
                    </div>
                  </button>
                </div>

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

export default SongHome;
