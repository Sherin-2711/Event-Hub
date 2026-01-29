import React, { useEffect, useState } from "react";
import { ArrowLeft, Users, Mail, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

const UserMyEvents = () => {
  const [events, setEvents] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const { user } = useAuth();
  const email = user?.email;

  useEffect(() => {
    if (!email) return;

    const fetchEvents = async () => {
      try {
        const res = await api.get("/register/user-events", {
          params: { userEmail: email },
        });

        console.log("Registered events:", res.data);
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to load user events:", err);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [email]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-10 px-4 md:px-10">
      <motion.button
        onClick={() => window.history.back()}
        className="purple-gradient text-purple-600 px-6 py-3 rounded-full mb-8 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </motion.button>

      <h2 className="text-4xl font-bold mb-8 text-purple-900 text-center">
        My Registered Events
      </h2>

      {events.length === 0 ? (
        <div className="bg-purple-300 rounded-2xl p-8 text-center">
          <p className="text-purple-700 text-lg">
            You haven't registered for any events yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="purple-gradient rounded-2xl p-6 text-purple-600 shadow-lg"
              onClick={() =>
                setExpandedIndex(expandedIndex === idx ? null : idx)
              }
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">{event.eventName}</h3>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Team: {event.teamName}</span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-6 h-6 transition-transform ${expandedIndex === idx ? "rotate-180" : ""
                    }`}
                />
              </div>

              <AnimatePresence>
                {expandedIndex === idx && (
                  <motion.div
                    className="mt-6 space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {event.teamMembers?.map((member, i) => (
                      <div
                        key={i}
                        className="bg-white/20 rounded-xl p-4"
                      >
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm flex items-center gap-2">
                          <Mail className="w-4 h-4" /> {member.email}
                        </p>
                        <p className="text-sm flex items-center gap-2">
                          <Phone className="w-4 h-4" /> {member.phone}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMyEvents;
