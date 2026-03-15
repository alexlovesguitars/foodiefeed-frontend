import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


export default function App() {
  const location = useLocation();
  // const isProjectPage = location.pathname.startsWith("/projects/");




  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
