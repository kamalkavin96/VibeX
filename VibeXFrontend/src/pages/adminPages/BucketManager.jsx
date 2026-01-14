import React, { useEffect, useState } from "react";
import { getAllBucketLists } from "../../services/bucketManagementService";

/* ---------- ICONS ---------- */

const BucketIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 6h18l-2 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 6z" />
    <path d="M3 6l9 4 9-4" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M8 6V4h8v2" />
    <path d="M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/* ---------- PAGE ---------- */

function BucketManager() {
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const data = await getAllBucketLists();
        setBuckets(data.data);
      } catch (error) {
        console.error("Failed to load buckets", error);
      }
    };

    fetchBuckets();
  }, []);

  // const buckets = [
  //   { name: "playlist-images", objectCount: 342, totalSizeReadable: "1.2 GB",  creationDate: "2026-01-09T04:41:19.994Z" },
  //   { name: "video-uploads", objectCount: 128, totalSizeReadable: "4.8 GB",  creationDate: "2026-01-09T04:41:19.994Z" },
  //   { name: "user-avatars", objectCount: 980, totalSizeReadable: "620 MB",  creationDate: "2026-01-09T04:41:19.994Z" },
  // ];

  return (
    <main
      className="
        pt-12 lg:pl-64 min-h-screen
        bg-linear-to-b from-gray-50 to-gray-100
        dark:from-black dark:to-zinc-900
        text-gray-900 dark:text-gray-100
      "
    >
      <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">MinIO Buckets</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Object storage buckets overview
            </p>
          </div>

          {/* New Bucket Button */}
          <button
            className="
              flex items-center justify-center
              gap-2
              h-10 w-10 sm:h-auto sm:w-auto
              px-0 sm:px-4 py-2
              rounded-xl
              bg-sky-600 hover:bg-sky-500
              text-white font-medium
              shadow-sm transition
            "
            title="New Bucket"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="hidden sm:inline">New Bucket</span>
          </button>
        </header>

        {/* Bucket List */}
        <section
          className="
            rounded-2xl overflow-hidden
            bg-white dark:bg-zinc-900
            border border-gray-200 dark:border-zinc-800
            divide-y divide-gray-200 dark:divide-zinc-800
          "
        >
          {buckets.map((bucket) => (
            <div
              key={bucket.name}
              className="
                flex items-center justify-between
                px-5 py-4
                hover:bg-gray-50 dark:hover:bg-zinc-800/60
                transition
              "
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div
                  className="
                    h-10 w-10 rounded-lg
                    bg-sky-100 dark:bg-sky-900/40
                    text-sky-600 dark:text-sky-400
                    flex items-center justify-center
                  "
                >
                  <BucketIcon className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-medium">{bucket.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    created on {bucket.creationDate} | {bucket.objectCount} objects | {bucket.totalSizeReadable}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  className="
                    h-9 w-9 rounded-lg
                    flex items-center justify-center
                    text-gray-500 dark:text-gray-400
                    hover:bg-sky-500/10 hover:text-sky-600
                    transition
                  "
                  title="View Bucket"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>

                <button
                  className="
                    h-9 w-9 rounded-lg
                    flex items-center justify-center
                    text-gray-500 dark:text-gray-400
                    hover:bg-red-500/10 hover:text-red-500
                    transition
                  "
                  title="Delete Bucket"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

export default BucketManager;
