import React from "react";
import { NavLink, Outlet } from "react-router-dom";

/* ---------- SVG ICONS ---------- */

const BucketIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 6h18l-2 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 6z" />
    <path d="M3 6l9 4 9-4" />
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 11a4 4 0 100-8 4 4 0 000 8zM17 11a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M2 20a6 6 0 0112 0v1H2v-1zM14 20a5 5 0 0110 0v1H14v-1z" />
  </svg>
);

const LogsIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
    <path d="M14 2v6h6" />
  </svg>
);

/* ---------- ADMIN PAGE ---------- */

function AdminPage() {
  const adminOptions = [
    {
      title: "MinIO Bucket Manager",
      description: "Create, list, delete and inspect MinIO buckets",
      icon: BucketIcon,
      gradient: "from-sky-500 to-cyan-500",
      navigatePath: "/admin/bucket-management",
    },
    {
      title: "User Management",
      description: "Manage admin & user roles",
      icon: UsersIcon,
      gradient: "from-emerald-500 to-lime-500",
      navigatePath: "/admin/users-management",
    },
    {
      title: "System Logs",
      description: "View backend & storage logs",
      icon: LogsIcon,
      gradient: "from-orange-500 to-amber-500",
      navigatePath: "/admin/system-logs",
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
      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            System & storage management
          </p>
        </header>

        {/* Admin Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {adminOptions.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.title}
                to={item.navigatePath}
                className="block h-full"
              >
                <div
                  className="
                    group relative overflow-hidden
                    h-full rounded-2xl p-5
                    bg-white/80 dark:bg-zinc-900/70
                    backdrop-blur
                    border border-gray-200 dark:border-zinc-800
                    hover:shadow-xl transition
                    flex items-center
                  "
                >
                  {/* Gradient Glow */}
                  <div
                    className={`
                      absolute inset-0
                      opacity-0 group-hover:opacity-100
                      dark:bg-zinc-800
                      blur-2xl transition
                    `}
                  />

                  {/* Content */}
                  <div className="relative flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={`
                        h-12 w-12 rounded-xl
                        bg-linear-to-br ${item.gradient}
                        flex items-center justify-center
                        text-white shadow-lg
                        shrink-0
                      `}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </section>

        <Outlet></Outlet>
      </div>
    </main>
  );
}

export default AdminPage;
