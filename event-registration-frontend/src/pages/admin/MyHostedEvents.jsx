import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Eye, X } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import EventLoader from "@/components/EventLoader";

export default function MyHostedEvents() {
  const [events, setEvents] = useState(null);
  const [selectedEventRegistrations, setSelectedEventRegistrations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchHostedEvents = async () => {
      try {
        const res = await api.get("/events/hosted");
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch hosted events", error);
        setEvents([]);
      }
    };

    if (user) fetchHostedEvents();
  }, [user]);

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setIsLoading(true);

    try {
      await api.delete(`/events/${eventId}`);
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (err) {
      console.error("Failed to delete event", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (event) => {
    navigate("/admin/host", { state: { eventToEdit: event } });
  };

  const handleViewRegistrations = async (eventId, eventName) => {
    try {
      const res = await api.get(`/register/event/${eventId}`);
      setSelectedEventRegistrations(res.data);
      setSelectedEventName(eventName);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch registrations", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-400 relative overflow-hidden">
      <AdminNavbar />

      <motion.div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
        <motion.h2 className="text-4xl font-bold mb-8 text-purple-900">
          My Hosted Events
        </motion.h2>

        {events === null ? (
          <div className="flex justify-center items-center h-64">
            <div className="purple-gradient p-4 rounded-xl animate-pulse">
              Loading hosted events...
            </div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-purple-300 rounded-2xl shadow-lg">
                <img
                  src={event.image}
                  alt={event.eventName}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-bold">{event.eventName}</h3>
                  <p>{event.college}</p>
                  <p className="text-sm mt-2">{event.description}</p>

                  <div className="mt-6 flex gap-3 flex-wrap">
                    <button onClick={() => handleUpdate(event)}>
                      <Edit size={16} /> Edit
                    </button>
                    <button onClick={() => handleDelete(event._id)}>
                      <Trash2 size={16} /> Delete
                    </button>
                    <button
                      onClick={() =>
                        handleViewRegistrations(event._id, event.eventName)
                      }
                    >
                      <Eye size={16} /> Registrations
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-purple-200 rounded-2xl p-8 text-center">
            <p>You haven't hosted any events yet.</p>
            <button onClick={() => navigate("/admin/host")}>
              Host Your First Event
            </button>
          </div>
        )}
      </motion.div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-purple-400 p-6 rounded-2xl max-w-3xl w-full">
            <h2 className="text-xl mb-4">
              Registrations for {selectedEventName}
            </h2>
            {selectedEventRegistrations.length > 0 ? (
              selectedEventRegistrations.map((reg, i) => (
                <div key={i}>
                  <strong>{reg.teamName}</strong>
                </div>
              ))
            ) : (
              <p>No registrations found.</p>
            )}
          </div>
        </div>
      )}

      <EventLoader isOpen={isLoading} message="Deleting Event..." />
    </div>
  );
}
