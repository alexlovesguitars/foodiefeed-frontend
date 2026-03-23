import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import "./loginModal.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const endpoint = isLogin
      ? "http://localhost:3001/api/v1/login"
      : "http://localhost:3001/api/v1/signup";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");
      localStorage.setItem("token", data.token);
      onClose();
      window.location.reload();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop fades in/out */}
          <motion.div
            className="modal-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />

          {/* Modal scales + fades in from slightly below */}
          <motion.div
          key="modal"
          className="modal"
          initial={{ opacity: 0, scale: 0.85, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.85, y: 40, filter: "blur(12px)" }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          >
            <button className="modal-close" onClick={onClose}>✕</button>

            <h2>{isLogin ? "Welcome back" : "Create account"}</h2>

            {error && <p className="modal-error">{error}</p>}

            <div className="modal-form">
              <AnimatePresence>
                {!isLogin && (
                  <motion.input
                    key="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button className="modal-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
              </button>
            </div>

            <p className="modal-switch">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span onClick={() => { setIsLogin(!isLogin); setError(null); }}>
                {isLogin ? " Sign up" : " Login"}
              </span>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
