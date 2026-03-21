import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Recipe from "./pages/Recipe";
import Navbar from "./components/header";
import "./App.css";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar /> {/* add it here, outside the Routes so it shows on every page */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:slug" element={<Recipe />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
