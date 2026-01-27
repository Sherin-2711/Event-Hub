import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../api/axios";

function UserAllEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events/all");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-10 px-4 md:px-10 relative"
      style={{ perspective: "1500px" }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-purple-300/30 rounded-2xl"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-40 h-40 bg-purple-400/20 rounded-full"
          animate={{ y: [0, -30, 0], rotate: [0, -5, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.button
          onClick={() => navigate("/user-home")}
          className="purple-gradient text-purple-500 px-6 py-3 rounded-full mb-8 flex items-center gap-2 hover:shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </motion.button>

        <h2 className="text-4xl font-bold mb-8 text-purple-900">
          Discover Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              className="bg-white rounded-2xl overflow-hidden relative group shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.eventName}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>


              <div className="p-6 text-purple-900">
                <h3 className="text-xl font-bold mb-2">
                  {event.eventName}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-purple-700">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.college}</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-700">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{event.mode}</span>
                  </div>
                </div>

                <p className="text-sm text-purple-600 mb-4 line-clamp-2">
                  {event.description}
                </p>

                <button
                  onClick={() => navigate(`/event/${event._id}`)}
                  className="w-full purple-gradient text-purple-500 py-2 rounded-xl flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default UserAllEvents;
