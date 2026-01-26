import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideDrawer from "../components/SideDrawer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomMusicPlayer from "../components/BottomMusicPlayer";


export default function AppLayout({playerOpen}) {
  const [open, setOpen] = useState(false);

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">

      {/* HEADER */}
      <Header open={open} setOpen={setOpen} dark={dark} setDark={setDark} />

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* SIDEDRAWER */}
      <SideDrawer open={open} setOpen={setOpen} heightReduce={playerOpen ? "10.7" : "4.3"}/>

      <Outlet />
      {playerOpen && <BottomMusicPlayer></BottomMusicPlayer>}
      

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme={dark ? "dark" : "light"}
      />
    </div>
  );
}
