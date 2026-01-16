import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import PlaylistsView from "../pages/playlist/PlaylistsView";
import AppLayout from "../layouts/AppLayout";
import SongsView from "../pages/song/SongsView";
import AdminPage from "../pages/adminPages/AdminPage";
import BucketManager from "../pages/adminPages/BucketManager";
import SongPlayer from "../pages/SongPlayer";
import SongPlayer2 from "../pages/SongPlayer2";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AppLayout></AppLayout>}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/playlist" element={<PlaylistsView />} />
        <Route path="/songs" element={<SongsView />} />
        <Route path="/song-player" element={<SongPlayer2 />} />
        <Route path="/admin">
          <Route index element={<AdminPage />}></Route>
          <Route path="bucket-management" element={<BucketManager />} />
        </Route>
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}
