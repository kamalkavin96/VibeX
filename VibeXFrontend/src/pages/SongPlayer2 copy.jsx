import React, { useEffect, useState } from "react";
import MainContent from "../components/MainContent";

import { getAllSongs } from "../services/songService";

/* ---------------- MOCK DATA ---------------- */
const mockSongs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
  { id: 2, title: "Shape of You", artist: "Ed Sheeran", duration: "4:02" },
  { id: 3, title: "Levitating", artist: "Dua Lipa", duration: "3:45" },
  { id: 4, title: "Believer", artist: "Imagine Dragons", duration: "3:24" },
  { id: 5, title: "Heat Waves", artist: "Glass Animals", duration: "3:58" },
  { id: 6, title: "Starboy", artist: "The Weeknd", duration: "3:50" },
  { id: 7, title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
  { id: 8, title: "Save Your Tears", artist: "The Weeknd", duration: "3:35" },
  { id: 9, title: "Bad Habits", artist: "Ed Sheeran", duration: "3:51" },
  {
    id: 10,
    title: "Happier Than Ever",
    artist: "Billie Eilish",
    duration: "4:58",
  },
  { id: 11, title: "Peaches", artist: "Justin Bieber", duration: "3:18" },
  { id: 12, title: "As It Was", artist: "Harry Styles", duration: "2:47" },
  { id: 13, title: "Stay", artist: "The Kid LAROI", duration: "2:21" },
  { id: 14, title: "Shivers", artist: "Ed Sheeran", duration: "3:27" },
  { id: 15, title: "Industry Baby", artist: "Lil Nas X", duration: "3:32" },
  {
    id: 16,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    duration: "2:54",
  },
  { id: 17, title: "Counting Stars", artist: "OneRepublic", duration: "4:17" },
  {
    id: 18,
    title: "Something Just Like This",
    artist: "The Chainsmokers",
    duration: "4:07",
  },
  { id: 19, title: "Senorita", artist: "Shawn Mendes", duration: "3:11" },
  { id: 20, title: "Uptown Funk", artist: "Mark Ronson", duration: "4:30" },
  { id: 21, title: "Thunder", artist: "Imagine Dragons", duration: "3:07" },
  { id: 22, title: "Lovely", artist: "Billie Eilish", duration: "3:20" },
  { id: 23, title: "Dance Monkey", artist: "Tones and I", duration: "3:29" },
  { id: 24, title: "Closer", artist: "The Chainsmokers", duration: "4:05" },
  { id: 25, title: "Memories", artist: "Maroon 5", duration: "3:09" },
  { id: 26, title: "Lose Yourself", artist: "Eminem", duration: "5:26" },
  { id: 27, title: "Radioactive", artist: "Imagine Dragons", duration: "3:06" },
  { id: 28, title: "Let Me Love You", artist: "DJ Snake", duration: "3:25" },
  { id: 29, title: "See You Again", artist: "Wiz Khalifa", duration: "3:50" },
  { id: 30, title: "Rolling in the Deep", artist: "Adele", duration: "3:48" },
];

/* ---------------- Player Card ---------------- */
function SongPlayerCard({ song }) {
  return (
    <div className="h-full bg-white dark:bg-zinc-800 p-6 shadow-lg flex flex-col justify-center items-center text-center transition-colors">
      {song ? (
        <>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            {song.title}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {song.artist}
          </p>

          {/* Controls */}
          <div className="flex gap-6 mt-8">
            <button className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:scale-110 transition">
              ⏮
            </button>

            <button className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-2xl shadow-xl hover:scale-110 transition">
              ▶
            </button>

            <button className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:scale-110 transition">
              ⏭
            </button>
          </div>
        </>
      ) : (
        <p className="text-zinc-500">Select a song</p>
      )}
    </div>
  );
}

/* ---------------- Song List Card ---------------- */
function SongListCard({ songs, currentSong, onSelect }) {
  return (
    <div className="h-full bg-white dark:bg-zinc-800 shadow-lg flex flex-col transition-colors">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Song List
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 custom-scrollbar">
        <ul className="space-y-2">
          {Array.isArray(songs) && songs.map((song) => {
            console.log(song);
            const active = currentSong?.id === song.id;

            return (
              <li
                key={song.id}
                onClick={() => onSelect(song)}
                className={`p-3 rounded-xl cursor-pointer flex  items-center transition
                  ${
                    active
                      ? "bg-emerald-500 text-white"
                      : "bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                  }`}
              >
                <div className="py-3 px-4 rounded-lg mr-4 border-2">
                  {song.title[0]}
                </div>
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-xs opacity-80">{song.singerName}</p>
                </div>
                {/* <span className="text-xs ml-auto">{song.duration}</span> */}
                <span class="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white dark:text-black bg-zinc-900 dark:bg-zinc-100 rounded-full ml-auto">
                  3:20
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- Layout ---------------- */
function SongPlayer2() {
  const [currentSong, setCurrentSong] = useState(mockSongs[0]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songRes = await getAllSongs();
        setSongs(songRes);
      } catch (err) {
        console.error("Failed to fetch songs", err);
        setSongs(mockSongs); // fallback
      }
    };

    fetchSongs();
  }, []);

  return (
    <MainContent>
      <div
        className="h-[calc(100vh-3rem)] w-full p-4
        bg-linear-to-br 
        from-zinc-100 to-zinc-200 
        dark:from-zinc-950 dark:to-zinc-900
        transition-colors"
      >
        <div className="h-full flex gap-4">
          {/* Player */}
          <div className="flex-1 h-full">
            {/* <SongPlayerCard song={currentSong} /> */}
          </div>

          {/* List */}
          <div className="w-80 h-full">
            <SongListCard
              songs={songs}
              currentSong={currentSong}
              onSelect={setCurrentSong}
            />
          </div>
        </div>
      </div>
    </MainContent>
  );
}

export default SongPlayer2;
