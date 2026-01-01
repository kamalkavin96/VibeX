import { useEffect, useState } from "react";
import Header from "./components/Header";
import SideDrawer from "./components/SideDrawer";
import MainContent from "./components/MainContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";

export default function App() {
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
      <Header setOpen={setOpen} dark={dark} setDark={setDark} />

      <>
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}

        <SideDrawer open={open} setOpen={setOpen} />
        <MainContent />
      </>

     {/* <LoginPage></LoginPage> */}

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
