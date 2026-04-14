import "./header.css";
import FoodieFeedLogo from "../assets/FoodieFeedHeaderLogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./loginModal";
import SlidingPanel from "./slidingPanel";

export default function Header() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsPanelOpen(false);
    window.location.href = "/";
  };

  return (
    <div className="wrapper">
      <div className="header-row">
        <div className={`burger-menu ${isPanelOpen ? "open" : ""}`}>
          <FontAwesomeIcon icon={faBars} onClick={() => setIsPanelOpen(true)} />
        </div>

        <Link to="/" className="header-brand">
          <img src={FoodieFeedLogo} alt="FoodieFeed" />
        </Link>

      <div className="spacer" />

      </div>

      <div className="searchbar">
        <input type="text" placeholder="Search recipes & ingredients..." />
      </div>

      <SlidingPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={() => { setIsPanelOpen(false); setIsModalOpen(true); }}
      />

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
