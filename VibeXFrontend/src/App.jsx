import Header from "./components/Header";
import SideDrawer from "./components/SideDrawer";
import MainContent from "./components/MainContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
    <AppRoutes></AppRoutes>
    </>
  )
}
