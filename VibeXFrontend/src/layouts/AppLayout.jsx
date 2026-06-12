import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideDrawer from "../components/SideDrawer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomMusicPlayer from "../components/BottomMusicPlayer";

export default function AppLayout({ playerOpen }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <header class="h-16 text-white flex items-center lg:hidden">
        <Header open={open} setOpen={setOpen} />
      </header>

      <main class="flex-1 flex overflow-hidden">
        <aside
          className={` lg:w-64 ${open ? "" : " w-0"} py-1.5 text-white overflow-y-auto bg-zinc-100 dark:bg-black`}
        >
          <SideDrawer open={open} setOpen={setOpen} />
        </aside>

        {/* Content */}
        <section className="flex-1 overflow-y-auto sidebar-scroll">
          <Outlet />
        </section>
        {/* <Outlet /> */}
      </main>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* <Outlet /> */}
      {playerOpen && <BottomMusicPlayer></BottomMusicPlayer>}

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        
        // theme={dark ? "dark" : "light"}
      />
    </div>
  );
}
