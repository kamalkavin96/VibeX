import { useEffect, useMemo, useState } from "react";

import MainContent from "../components/MainContent";

import AlbumCard from "../components/album/AlbumCard";
import AlbumCreateModal from "../components/album/AlbumCreateModal";
import AlbumEditModal from "../components/album/AlbumEditModal";
import AlbumDeleteModal from "../components/album/AlbumDeleteModal";

import {
  getAllAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "../services/album.service";

export default function AlbumPage() {

  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [albumEdit, setAlbumEdit] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [reloadAlbums, setReloadAlbums] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await getAllAlbums();

        setAlbums(res?.data || res || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbums();
  }, [reloadAlbums]);

  const filteredAlbums = useMemo(() => {
    return albums.filter((album) =>
      album.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [albums, search]);

  return (
    <MainContent>
      <div className="w-full">
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
            "
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Albums</h2>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your music albums
              </p>
            </div>

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
                placeholder="Search albums..."
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
                  px-5
                  py-2.5
                  rounded-xl
                  bg-linear-to-r
                  from-blue-500
                  to-indigo-500
                  text-white
                  shadow-md
                "
              >
                + Add Album
              </button>
            </div>
          </header>

          {/* GRID */}

          <section
            className="
              grid
              xs:grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-5
              max-h-[85.2vh]
              overflow-y-auto
              custom-scrollbar
              py-2
            "
          >
            {filteredAlbums.length > 0 ? (
              filteredAlbums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onEdit={() => {
                    setAlbumEdit(album);
                    setEditOpen(true);
                  }}
                  onDelete={() => {
                    setDeleteId(album.id);
                    setDeleteTitle(album.title);
                    setDeleteOpen(true);
                  }}
                  onPlay={() => {
                    console.log("Play album", album);
                  }}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <h3 className="text-lg font-medium">No albums found</h3>

                <p className="text-gray-500 mt-2">Create your first album</p>
              </div>
            )}
          </section>

          {/* CREATE */}

          {createOpen && (
            <AlbumCreateModal
              onClose={() => setCreateOpen(false)}
              onCreate={async (payload) => {

                await createAlbum(payload);
                setCreateOpen(false);
                setReloadAlbums((prev) => !prev);
              }}
            />
          )}

          {/* EDIT */}

          {editOpen && (
            <AlbumEditModal
              album={albumEdit}
              onClose={() => setEditOpen(false)}
              onEdit={async (payload) => {
                await updateAlbum(payload);

                setEditOpen(false);

                setReloadAlbums((prev) => !prev);
              }}
            />
          )}

          {/* DELETE */}

          {deleteOpen && (
            <AlbumDeleteModal
              albumTitle={deleteTitle}
              onClose={() => setDeleteOpen(false)}
              onDelete={async () => {
                await deleteAlbum(deleteId);

                setDeleteOpen(false);

                setReloadAlbums((prev) => !prev);
              }}
            />
          )}
        </div>
      </div>
    </MainContent>
  );
}
