import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { FloatingElement } from "../components/FloatingElement";
import { motion } from "framer-motion";
import api from "../api/axios";

export const Register = () => {
  const { userType } = useParams();
  const [userTypeState, setUserTypeState] = useState(userType || "user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userType || !["user", "host"].includes(userType)) {
      navigate("/signup/user", { replace: true });
    }
    setUserTypeState(userType || "user");
  }, [userType, navigate]);

  const handleUserTypeChange = (newType) => {
    setUserTypeState(newType);
    navigate(`/signup/${newType}`);
  };

  const handleRegister = async (formData) => {
    try {
      await api.post("/auth/register", {
        ...formData,
        userType: userTypeState,
      });
      console.log("REGISTER AS:", userTypeState);
      navigate(`/login/${userTypeState}`, { replace: true });
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, #310C7E 0%, #9372C1 100%)`,
      }}
    >
      {/* Floating Elements */}
      <FloatingElement className="w-32 h-32 left-[10%] top-[20%]" />
      <FloatingElement className="w-40 h-40 right-[15%] top-[15%]" />
      <FloatingElement className="w-24 h-24 left-[20%] bottom-[20%]" />
      <FloatingElement className="w-36 h-36 right-[20%] bottom-[25%]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          {/* User Type Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 bg-white/10 backdrop-blur-lg rounded-full p-1 flex"
          >
            <button
              onClick={() => handleUserTypeChange("user")}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${userTypeState === "user"
                  ? "bg-purple-200 text-purple-900"
                  : "text-white hover:bg-white/5"
                }`}
            >
              User
            </button>
            <button
              onClick={() => handleUserTypeChange("host")}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${userTypeState === "host"
                  ? "bg-purple-200 text-purple-900"
                  : "text-white hover:bg-white/5"
                }`}
            >
              Host
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <AuthForm
              type="signup"
              userType={userTypeState}
              onRegister={handleRegister}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-white/80 text-center"
          >
            Already have an account?{" "}
            <Link
              to={`/login/${userTypeState}`}
              className="font-semibold text-white underline"
            >
              Log in
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Register;
