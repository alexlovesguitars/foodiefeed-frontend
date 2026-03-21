import "./header.css";
import FoodieFeedLogo from "../assets/FoodieFeedHeaderLogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
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

      {/* Sliding Panel */}
      <div className={`sliding-panel ${isPanelOpen ? "open" : ""}`}>
        <FontAwesomeIcon
          icon={faXmark}
          className="panel-close"
          onClick={() => setIsPanelOpen(false)}
        />
        <nav className="panel-nav">
          <Link to="/account" onClick={() => setIsPanelOpen(false)}>My Account</Link>
          <Link to="/cookbooks" onClick={() => setIsPanelOpen(false)}>Cookbooks</Link>
          <Link to="/recipes" onClick={() => setIsPanelOpen(false)}>Recipes</Link>
          <Link to="/messages" onClick={() => setIsPanelOpen(false)}>Messages</Link>
          {isLoggedIn
            ? <span onClick={handleLogout}>Logout</span>
            : <Link to="/login" onClick={() => setIsPanelOpen(false)}>Login</Link>
          }
        </nav>
        <div className="avatar">
          <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Avatar" />
        </div>
      </div>
    </div>
  );
}
