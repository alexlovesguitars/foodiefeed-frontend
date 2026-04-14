import "./slidingPanel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

interface SlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function SlidingPanel({ isOpen, onClose, isLoggedIn, onLogout, onLoginClick }: SlidingPanelProps) {
  return (
    <div className={`sliding-panel ${isOpen ? "open" : ""}`}>
      <FontAwesomeIcon
        icon={faXmark}
        className="panel-close"
        onClick={onClose}
      />
      <nav className="panel-nav">
        <Link to="/account" onClick={onClose}>My Account</Link>
        <Link to="/cookbooks" onClick={onClose}>Cookbooks</Link>
        <Link to="/recipes" onClick={onClose}>Recipes</Link>
        <Link to="/messages" onClick={onClose}>Messages</Link>
        {isLoggedIn
        ? <span onClick={onLogout}>Logout</span>
        : <span onClick={() => { onClose(); onLoginClick(); }}>Login</span>
        }
      </nav>
        {isLoggedIn
        ? <div className="avatar">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Avatar" />
          </div>
        : <div className="avatar-placeholder">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Avatar" />
          </div>
        }
    </div>
  );
}
