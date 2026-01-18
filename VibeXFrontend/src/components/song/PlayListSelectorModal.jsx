import { useEffect, useState } from "react";
import { getAllPlaylists } from "../../services/playlistService";

export default function PlayListSelectorModal({ onClose, onSelect, songName }) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllPlaylists();
      setPlaylists(res?.data || []);
    };
    fetch();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-5">
        <h3 className="text-lg font-semibold mb-4">Select Playlist for ({songName})</h3>

        <div className="max-h-64 overflow-y-auto space-y-2">
          {playlists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => setSelectedId(pl.id)}
              className={`
                w-full text-left px-3 py-2 rounded-lg border transition
                ${
                  selectedId === pl.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-transparent hover:bg-gray-100 dark:hover:bg-zinc-800"
                }
              `}
            >
              {pl.name}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            disabled={!selectedId}
            onClick={() => onSelect(selectedId)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}