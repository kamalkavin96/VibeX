import { useState } from "react";
import Header from "./components/Header";
import SideDrawer from "./components/SideDrawer";
import MainContent from "./components/MainContent";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      <Header setOpen={setOpen}></Header>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      <SideDrawer open={open} setOpen={setOpen}></SideDrawer>
      <MainContent></MainContent>
      

    </div>
  );
}
