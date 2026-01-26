import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import PlaylistsView from "../pages/playlist/PlaylistsView";
import AppLayout from "../layouts/AppLayout";
import SongsView from "../pages/song/SongsView";
import AdminPage from "../pages/adminPages/AdminPage";
import BucketManager from "../pages/adminPages/BucketManager";
import SongPlayer2 from "../pages/SongPlayer2";
import TestPage from "../pages/TestPage";
import NotFoundPage from "../pages/NotFoundPage";
import SongHome from "../pages/SongHome";
import { useState } from "react";

export default function AppRoutes() {
  const [playerOpen, setPLayerOpen] = useState(true);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AppLayout playerOpen={playerOpen} setPLayerOpen={setPLayerOpen}></AppLayout>}>
        <Route path="/" element={<SongHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/playlist" element={<PlaylistsView />} />
        <Route path="/songs" element={<SongHome />} />
        <Route path="/discover-songs" element={<SongsView playerOpen={playerOpen}/>} />
        <Route path="/test" element={<TestPage></TestPage>}/>

        <Route path="song-player">
          <Route index element={<SongPlayer2 />} />
          <Route path="playlist/:playlistId/:playlistName" element={<SongPlayer2 />} />
          <Route path="song/:songId" element={<SongPlayer2 />} />
        </Route>


        <Route path="/admin">
          <Route index element={<AdminPage />}></Route>
          <Route path="bucket-management" element={<BucketManager />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage></NotFoundPage>} />
    </Routes>
  );
}
