import { useEffect, useMemo, useState } from "react";

import MainContent from "../components/MainContent";

import ArtistCard from "../components/artist/ArtistCard";
import ArtistCreateModal from "../components/artist/ArtistCreateModal";
import ArtistEditModal from "../components/artist/ArtistEditModal";
import ArtistDeleteModal from "../components/artist/ArtistDeleteModal";
import {
  getAllArtists,
  createArtist,
  deleteArtist,
  updateArtist,
} from "../services/artist.service";

const normalizeArtists = (artists = []) =>
  artists.map((artist) => ({
    ...artist,
    songs: artist.songs ?? Math.floor(Math.random() * 500) + 1,
  }));

export default function ArtistPage() {
  const [artists, setArtists] = useState([]);

  const [search, setSearch] = useState("");

  const [createOpen, setCreateOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [artistEdit, setArtistEdit] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  const [reloadArtists, setReloadArtists] = useState(false);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await getAllArtists();

        setArtists(normalizeArtists(res?.data || res || []));
      } catch (err) {
        console.error(err);
      }
    };

    fetchArtists();
  }, [reloadArtists]);

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) =>
      artist.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [artists, search]);

  return (
    <MainContent>
      <div className=" w-full m-1">
        <div className="max-w-7xl mx-auto px-4 py-1 space-y-8">
          {/* HEADER */}

          <header
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
              mb-4
            "
          >
            {/* Left Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Artists</h2>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your music artists
              </p>
            </div>

            {/* Right Section */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                w-full
                md:w-auto
              "
            >
              <input
                type="text"
                placeholder="Search artists..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  sm:w-64
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-zinc-700
                  bg-white
                  dark:bg-zinc-900
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500/30
                "
              />

              <button
                onClick={() => setCreateOpen(true)}
                className="
                  w-full
                  sm:w-auto
                  px-5
                  py-2.5
                  rounded-xl
                  bg-linear-to-r
                  from-blue-500
                  to-indigo-500
                  text-white
                  text-sm
                  font-medium
                  shadow-md
                  hover:shadow-lg
                  transition-all
                  duration-200
                "
              >
                + Add Artist
              </button>
            </div>
          </header>

          {/* ARTISTS GRID */}

          <section
            className="
              grid
              xs:grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-5
              max-h-[87.3vh]
              overflow-y-auto
              custom-scrollbar
              p-2
            "
          >
            {filteredArtists.length > 0 ? (
              filteredArtists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  onEdit={() => {
                    setArtistEdit(artist);
                    setEditOpen(true);
                  }}
                  onDelete={() => {
                    setDeleteId(artist.id);
                    setDeleteName(artist.name);
                    setDeleteOpen(true);
                  }}
                  onPlay={() => {
                    console.log("Play artist", artist);
                  }}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <h3 className="text-lg font-medium">No artists found</h3>

                <p className="text-gray-500 mt-2">Create your first artist</p>
              </div>
            )}
          </section>

          {/* CREATE */}

          {createOpen && (
            <ArtistCreateModal
              onClose={() => setCreateOpen(false)}
              onCreate={async (payload) => {
                await createArtist(payload);
                setCreateOpen(false);
                setReloadArtists((prev) => !prev);
              }}
            />
          )}

          {/* EDIT */}

          {editOpen && (
            <ArtistEditModal
              artist={artistEdit}
              onClose={() => setEditOpen(false)}
              onEdit={async (payload) => {
                await updateArtist(payload);
                setEditOpen(false);
                setReloadArtists((prev) => !prev);
              }}
            />
          )}

          {/* DELETE */}

          {deleteOpen && (
            <ArtistDeleteModal
              artistName={deleteName}
              onClose={() => setDeleteOpen(false)}
              onDelete={async () => {
                await deleteArtist(deleteId);
                setDeleteOpen(false);
                setReloadArtists((prev) => !prev);
              }}
            />
          )}
        </div>
      </div>
    </MainContent>
  );
}
