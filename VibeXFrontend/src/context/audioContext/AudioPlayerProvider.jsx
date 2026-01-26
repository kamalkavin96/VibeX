import { useState } from "react";
import AudioPlayerContext from "./AudioPlayerContext";
import { getAllSongsByPlayListId } from "../../services/songService";

export function AudioPlayerProvider({ children }) {
  const [playerSongs, setPlayerSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [play, setPlay] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  /* ▶️ Play single song */
  const setSongFunc = (song) => {
    if (!song) return;
    setPlayerSongs([song]);
    setCurrentIndex(0);
    setPlay(true);
  };

  /* ▶️ Play playlist */
  const setPlayListSongFunc = async (playList) => {
    try {
      if (!playList?.id) return;

      const res = await getAllSongsByPlayListId(playList.id);
      const songs = res?.data || [];

      setPlayerSongs(songs);
      setCurrentIndex(0);
      setPlay(songs.length > 0);
    } catch (error) {
      console.error("Failed to load playlist songs", error);
      setPlayerSongs([]);
      setPlay(false);
    }
  };

  const playNext = () => {
    setCurrentIndex((i) =>
      i < playerSongs.length - 1 ? i + 1 : i
    );
  };

  const playPrev = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : 0));
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        playerSongs,
        setPlayerSongs,
        currentIndex,
        setCurrentIndex,
        play,
        setPlay,
        progress,
        setProgress,
        duration,
        setDuration,
        volume,
        setVolume,
        setSongFunc,
        setPlayListSongFunc,
        playNext,
        playPrev,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
