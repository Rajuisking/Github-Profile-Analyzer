import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./index.css";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Home />
    </>
  );
}
