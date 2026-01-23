import { useEffect, useState } from "react";

import {
  deleteSong,
  getAllSongs,
  uploadSong,
  updateSong,
} from "../../services/songService";
import SongUploadModal from "../../components/song/SongUploadModal";
import SongCard from "../../components/song/SongCard";
import SongDeleteModal from "../../components/song/SongDeleteModal";
import MainContent from "../../components/MainContent";
import SongEditModal from "../../components/song/SongEditModal";
import { addSongToPlayList } from "../../services/playListSongs";
import PlayListSelectorModal from "../../components/song/PlayListSelectorModal";
import { useNavigate } from "react-router";

export default function SongsView() {
  const [songs, setSongs] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [editSong, setEditSong] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const [openPlayList, setOpenPlayList] = useState(false);
  const [playListSong, setPlayListSong] = useState(null);

  const navigate = useNavigate()

  const fetchSongs = async () => {
    const res = await getAllSongs();
    setSongs(res?.data || []);
  };

  useEffect(() => {
    const fetchSongsWrapper = async () => {
      await fetchSongs();
    };
    fetchSongsWrapper();
  }, []);

  return (
    <MainContent>
       <div className="h-[calc(100vh-4.7rem)] w-full m-1">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
          {/* HEADER */}
          <header className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-3xl font-semibold">Songs</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload & manage your music
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-full bg-linear-to-r from-green-500 to-emerald-500 text-white text-sm font-medium"
            >
              + Upload Song
            </button>
          </header>

          {/* SONG GRID */}
          <section
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3      
            gap-4

            max-h-[74vh]
            overflow-y-auto
            pr-1
            custom-scrollbar
          "
          >
            {songs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onDelete={() => {
                  setDeleteId(song.id);
                  setDeleteName(song.title);
                  setDeleteOpen(true);
                }}
                onEdit={()=>{
                  setEditOpen(true);
                  setEditSong(song);
                }}
                onPlayListAdd={()=>{
                  setPlayListSong(song);
                  setOpenPlayList(true);

                }}
                onPlay={(playSong)=>{
                  // console.log(playSong);
                  navigate(`/song-player/song/${playSong.id}`);
                }}
              />
            ))}
          </section>

          {/* UPLOAD */}
          {open && (
            <SongUploadModal
              onClose={() => setOpen(false)}
              onUpload={async (payload) => {
                await uploadSong(payload);
                await fetchSongs();
                setOpen(false);
              }}
            />
          )}

          {/* DELETE */}
          {deleteOpen && (
            <SongDeleteModal
              songName={deleteName}
              onClose={() => setDeleteOpen(false)}
              onDelete={async () => {
                await deleteSong(deleteId);
                await fetchSongs();
                setDeleteOpen(false);
              }}
            />
          )}

          {/* EDIT */}
          {editOpen && (
            <SongEditModal
              song={editSong}
              onClose={()=>setEditOpen(false)}
              onEdit={async (payload) => {
                await updateSong(payload);
                await fetchSongs();
                setEditOpen(false);
              }}
            />
          )}


          {/* PLAYLIST SELECTOR MODAL */}
          {openPlayList && (
            <PlayListSelectorModal
              songName={playListSong.title}
              onClose={() => setOpenPlayList(false)}
              onSelect={(playlistId) => {
                addSongToPlayList(playlistId, playListSong.id);
                setOpenPlayList(false);
              }}
            />
          )}



        </div>
      </div>
    </MainContent>
  );
}
