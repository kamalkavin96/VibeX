import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { AudioPlayerProvider } from "./context/audioContext/AudioPlayerProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AudioPlayerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AudioPlayerProvider>
  </StrictMode>,
);
