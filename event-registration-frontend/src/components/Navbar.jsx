import React, { useState, useRef, useEffect } from "react";
import { X, LogOut } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { NotificationIcon } from "./NotificationIcon";
import { NotificationCenter } from "./NotificationCenter";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, logout } = useAuth();

  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const notificationRef = useRef(null);

  const isAuthPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup");

  const isHost = user?.userType === "host";

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotificationCenter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // if (loading || isAuthPage) return null;

  const handleLogout = () => {
    logout();
    navigate("/login/user");
  };

  return (
    <>
      <nav className="py-4 px-6 w-full backdrop-blur-md bg-white/90 fixed top-0 z-50 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center relative">
          {/* Brand */}
          <h1
            className="text-2xl font-bold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-[#310C7E] to-[#9372C1]"
            onClick={() => navigate("/")}
          >
            EventHub
          </h1>

          {/* Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {/* USER NAV */}
            {user && !isHost && (
              <>
                <NavLink to="/" label="Home" />
                <NavLink to="/user-home" label="Dashboard" />
                <NavLink to="/events" label="Events" />
                <NavLink to="/user/my-events" label="My Events" />
                <NavLink to="/help" label="Help" />
                <NavLink to="/contact" label="Contact" />
              </>
            )}

            {/* GUEST NAV */}
            {!user && (
              <>
                <NavLink to="/" label="Home" />
                <NavLink to="/events" label="Events" />
                <NavLink to="/help" label="Help" />
                <NavLink to="/contact" label="Contact" />
              </>
            )}


            {isHost && (
              <>
                <NavLink to="/admin" label="Dashboard" />
                <NavLink to="/admin/host" label="Host Event" />
                <NavLink to="/admin/my-events" label="My Hosted Events" />
              </>
            )}
          </div>

          {/* Right */}
          <div
            className="hidden md:flex items-center space-x-4 relative"
            ref={notificationRef}
          >
            {user && (
              <NotificationIcon
                onViewAll={() => setShowNotificationCenter(true)}
              />
            )}

            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                 👤 {user.name}
                </span>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-red-50 rounded-full flex space-x-1"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/login/user")} variant="ghost">
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup/user")}
                  className="bg-gradient-to-r from-[#310C7E] to-[#9372C1] text-white"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Notification Center */}
      {showNotificationCenter && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Notification Center</h2>
              <Button
                variant="ghost"
                onClick={() => setShowNotificationCenter(false)}
              >
                <X />
              </Button>
            </div>
            <NotificationCenter />
          </div>
        </div>
      )}
    </>
  );
}

const NavLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`font-medium transition-colors ${isActive
          ? "text-[#310C7E]"
          : "text-gray-700 hover:text-gray-900"
        }`}
    >
      {label}
    </Link>
  );
};
