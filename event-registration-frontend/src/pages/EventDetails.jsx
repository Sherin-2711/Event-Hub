import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";
import {
  BookmarkCheck,
  BookmarkPlus,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Users,
  Trophy,
  Info,
  Tag,
} from "lucide-react";
import TeamRegisterModal from "../components/TeamRegisterModal";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";


const InfoBlock = ({ icon, title, children }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-purple-100 rounded-lg text-[#310C7E]">
      {icon}
    </div>
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-600">{children}</p>
    </div>
  </div>
);

const EventDetails = () => {
  const { eventId } = useParams();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  /* ---------- Fetch Event + Registration ---------- */
  useEffect(() => {
    if (!user?.email || !eventId) return;

    const fetchData = async () => {
      try {
        const eventRes = await api.get(`/events/${eventId}`);
        setEvent(eventRes.data);

        const regRes = await api.get("/register/user-events", {
          params: { userEmail: user.email.toLowerCase() },
        });

        const registered = regRes.data.some(
          (r) => r.eventId === eventId || r.eventId === eventRes.data._id
        );

        setIsRegistered(registered);
      } catch (err) {
        console.error("Failed to load event details", err);
      }
    };

    fetchData();
  }, [eventId, user?.email]);

  /* ---------- Register ---------- */
  const handleRegistration = async ({ teamName, teamMembers }) => {
    if (!event || isRegistered) return;

    const payload = {
      eventId: event._id,
      eventName: event.eventName,
      teamName,
      teamMembers,
      userEmail: user.email.toLowerCase(),
    };

    try {
      await api.post("/register", payload);
      setIsRegistered(true);
      alert("Registration successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  if (!event) return <div className="p-10">Loading...</div>;

  /* ======================= UI ======================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="relative h-[400px]">
        <img
          src={event.image}
          className="w-full h-full object-cover"
          alt={event.eventName}
        />
        <div className="absolute inset-0 bg-black/50 flex items-end px-6 py-10 text-white">
          <div>
            <h1 className="text-4xl font-bold">{event.eventName}</h1>
            <div className="flex gap-4 mt-2 text-sm">
              <span>{event.college}</span>
              <span>{event.mode}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            {["description", "timeline", "rules", "prizes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium ${activeTab === tab
                  ? "text-[#310C7E] border-b-2 border-[#310C7E]"
                  : "text-gray-500"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* DESCRIPTION */}
          {activeTab === "description" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-semibold text-[#310C7E] mb-4">
                  About Event
                </h2>
                <p className="text-gray-700 mb-4">
                  {event.description ||
                    "Join us for an exciting event designed to challenge and inspire participants."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <InfoBlock icon={<Calendar />} title="Date & Time">
                    {event.startDate}, 10:00 AM
                  </InfoBlock>
                  <InfoBlock icon={<MapPin />} title="Location">
                    {event.mode === "Online"
                      ? "Online - Link will be shared"
                      : event.college}
                  </InfoBlock>
                  <InfoBlock icon={<Users />} title="Team Size">
                    {event.minTeam} - {event.maxTeam} members
                  </InfoBlock>
                  <InfoBlock icon={<Tag />} title="Registration Fee">
                    ₹ {event.price || 0}
                  </InfoBlock>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-semibold text-[#310C7E] mb-4">
                  Contact Information
                </h2>

                {event.contacts?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.contacts.map((contact, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="font-medium">{contact.name}</span>
                        <span className="text-sm text-gray-600">
                          {contact.email}
                        </span>
                        <span className="text-sm text-gray-600">
                          {contact.phone}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Contact details will be updated.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TIMELINE */}
          {activeTab === "timeline" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-semibold text-[#310C7E] mb-4">
                Event Timeline
              </h2>

              {event.timeline?.length > 0 ? (
                event.timeline.map((item, index) => (
                  <div key={index} className="flex gap-3 mb-5">
                    <div
                      className={`w-3 h-3 rounded-full mt-2 ${item.status === "completed"
                        ? "bg-green-500"
                        : "bg-gray-400"
                        }`}
                    />
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.date}</p>
                      {item.description && (
                        <p className="text-sm text-gray-700 mt-1">
                          {item.description}
                        </p>
                      )}
                      {item.status === "completed" && (
                        <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <CheckCircle size={12} /> Completed
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">
                  Timeline information will be updated soon.
                </p>
              )}
            </div>
          )}

          {/* RULES */}
          {activeTab === "rules" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-semibold text-[#310C7E] mb-4">
                Rules & Guidelines
              </h2>

              {event.rules?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {event.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">
                  Rules will be announced closer to the event.
                </p>
              )}
            </div>
          )}

          {/* PRIZES */}
          {activeTab === "prizes" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-2xl font-semibold text-[#310C7E] mb-4">
                Prizes & Rewards
              </h2>

              {event.prize ? (
                <div className="flex items-start gap-3 mb-4">
                  <Trophy className="text-[#310C7E]" />
                  <div>
                    <h3 className="font-medium"></h3>
                    <p className="text-sm text-gray-600">
                      {event.prize}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  Prize details will be announced soon.
                </p>
              )}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#310C7E]">
              ₹ {event.price || 0}
            </h3>
            <button onClick={() => setIsSaved(!isSaved)}>
              {isSaved ? <BookmarkCheck /> : <BookmarkPlus />}
            </button>
          </div>

          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Team Size:</span>
              <span>
                {event.minTeam}-{event.maxTeam}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Deadline:</span>
              <span>
                <Countdown date={event.deadline} />
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={isRegistered}
            className={`w-full py-2 rounded text-white font-semibold ${isRegistered ? "bg-green-500" : "bg-[#310C7E]"
              }`}
          >
            {isRegistered ? "Registered ✓" : "Register Now"}
          </button>

          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
            <div className="flex gap-2">
              <Calendar size={16} /> <span>{event.startDate}</span>
            </div>
            <div className="flex gap-2">
              <Clock size={16} /> <span>10:00 AM</span>
            </div>
            <div className="flex gap-2">
              <MapPin size={16} /> <span>{event.mode}</span>
            </div>
          </div>
        </div>
      </div>

      <TeamRegisterModal
        isOpen={showModal}
        setIsOpen={setShowModal}
        onSubmit={handleRegistration}
      />
    </div>
  );
};

export default EventDetails;
