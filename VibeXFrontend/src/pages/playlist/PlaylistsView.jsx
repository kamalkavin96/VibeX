import { useEffect, useState } from "react";
import {
  createPlaylist,
  deletePlaylist,
  getAllPlaylists,
  updatePlaylist,
} from "../../services/playlistService";
import { getAllSongsByPlaylists } from "../../services/playListSongs.js";

import { randomGradient } from "../../utils/playlistUtils";
import PlaylistCard from "../../components/playlist/PlaylistCard";
import PlaylistCreateModal from "../../components/playlist/PlaylistCreateModal";
import PlaylistDeleteModal from "../../components/playlist/PlaylistDeleteModal";
import PlaylistEditModal from "../../components/playlist/PlaylistEditModal";
import { useNavigate } from "react-router";
import MainContent from "../../components/MainContent.jsx";

const normalizePlaylists = (data = []) =>
  data.map((p) => ({
    ...p,
    songs: Math.floor(Math.random() * 30) + 1,
    gradient: randomGradient(),
  }));

export default function PlaylistsView() {
  const [playlists, setPlaylists] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [playlistEdit, setPlaylistEdit] = useState(null);

  const [loadPlayList, setLoadPlayList] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await getAllPlaylists();
      setPlaylists(normalizePlaylists(res?.data || []));
    };
    fetchPlaylists();
  }, [open, loadPlayList]);

  return (
    <MainContent>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Playlists</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your music collections
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium"
          >
            + Create Playlist
          </button>
        </header>

        {/* GRID */}
        <section className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {playlists.map((pl) => (
            <PlaylistCard
              key={pl.id}
              playlist={pl}
              onDelete={() => {
                setDeleteId(pl.id);
                setDeleteName(pl.name);
                setDeleteOpen(true);
              }}
              onEdit={async () => {
                const songs = await getAllSongsByPlaylists(pl.id);
                setPlaylistEdit({
                  ...pl,
                  songs,
                });
                setEditOpen(true);
              }}
              onPlay={(playlist) => {
                console.log("Playing playlist:", playlist);
                navigate(`/song-player/playlist/${playlist.id}/${playlist.name}`);
              }}
            />
          ))}
        </section>

        {/* CREATE */}
        {open && (
          <PlaylistCreateModal
            onClose={() => setOpen(false)}
            onCreate={async (payload) => {
              await createPlaylist(payload);
              // await fetchPlaylists();
              setOpen(false);
            }}
          />
        )}

        {/* DELETE */}
        {deleteOpen && (
          <PlaylistDeleteModal
            deletePlName={deleteName}
            onClose={() => setDeleteOpen(false)}
            onDelete={async () => {
              await deletePlaylist(deleteId);
              // await fetchPlaylists();
              setDeleteOpen(false);
              setLoadPlayList(!loadPlayList);
            }}
          />
        )}

        {/* EDIT */}
        {editOpen && (
          <PlaylistEditModal
            playlist={playlistEdit}
            onClose={() => setEditOpen(false)}
            onEdit={async (payload) => {
              await updatePlaylist(payload);
              setEditOpen(false);
              setLoadPlayList(!loadPlayList);
            }}
          />
        )}
      </div>
    </MainContent>
  );
}
