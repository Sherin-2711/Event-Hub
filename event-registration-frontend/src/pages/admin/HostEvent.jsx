import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Trophy,
  ClipboardList,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import EventLoader from "@/components/EventLoader";

export default function HostEvent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const eventToEdit = state?.eventToEdit;

  const { user } = useAuth(); // ✅ ensure authenticated (no direct usage needed)

  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    college: "",
    mode: "",
    startDate: "",
    endDate: "",
    deadline: "",
    prize: "",
    judgingCriteria: "",
    minTeam: "",
    maxTeam: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  // 🔹 Populate form when editing
  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        eventName: eventToEdit.eventName || "",
        description: eventToEdit.description || "",
        college: eventToEdit.college || "",
        mode: eventToEdit.mode || "",
        startDate: eventToEdit.startDate || "",
        endDate: eventToEdit.endDate || "",
        deadline: eventToEdit.deadline || "",
        prize: eventToEdit.prize || "",
        judgingCriteria: eventToEdit.judgingCriteria || "",
        minTeam: eventToEdit.minTeam || "",
        maxTeam: eventToEdit.maxTeam || "",
      });
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setLoadingMessage(eventToEdit ? "Updating Event..." : "Creating Event...");

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (imageFile) payload.append("image", imageFile);

      if (eventToEdit) {
        await api.put(`/events/${eventToEdit._id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/events/create", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/admin/my-events");
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    { name: "eventName", label: "Event Name", icon: Calendar },
    { name: "description", label: "Description", type: "textarea", icon: ClipboardList },
    { name: "college", label: "College", icon: MapPin },
    { name: "mode", label: "Mode", icon: Users },
    { name: "startDate", label: "Start Date", type: "date", icon: Calendar },
    { name: "endDate", label: "End Date", type: "date", icon: Calendar },
    { name: "deadline", label: "Registration Deadline", type: "date", icon: Calendar },
    { name: "prize", label: "Prize Pool", icon: Trophy },
    { name: "judgingCriteria", label: "Judging Criteria", type: "textarea", icon: ClipboardList },
    { name: "minTeam", label: "Minimum Team Size", type: "number", icon: Users },
    { name: "maxTeam", label: "Maximum Team Size", type: "number", icon: Users },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-300 to-purple-500 py-10 px-4 md:px-10 relative"
      style={{ perspective: "1500px" }}
    >
      {/* UI & animations BELOW are untouched */}

      <motion.div className="relative z-10 max-w-4xl mx-auto">
        <motion.button
          onClick={() => navigate(-1)}
          className="purple-gradient text-purple-500 px-6 py-3 rounded-full mb-8 flex items-center gap-2 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <motion.div className="bg-purple-300 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-8 text-purple-900">
              {eventToEdit ? "Edit Event" : "Host New Event"}
            </motion.h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              encType="multipart/form-data"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field) => (
                  <div
                    key={field.name}
                    className={field.type === "textarea" ? "md:col-span-2" : ""}
                  >
                    <label className="block text-purple-900 font-medium mb-2 flex items-center gap-2">
                      <field.icon className="w-4 h-4" />
                      {field.label}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-purple-200 px-4 py-3 rounded-xl"
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full bg-purple-200 px-4 py-3 rounded-xl"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-purple-900 font-medium mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  {eventToEdit ? "Update Event Image (optional)" : "Event Image"}
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-purple-300 px-4 py-3 rounded-xl"
                />

                {eventToEdit && (
                  <p className="text-sm text-purple-700 mt-2">
                    Leave empty to keep existing image
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                className="w-full purple-gradient text-purple-500 py-4 px-6 rounded-xl font-semibold shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {eventToEdit ? "Update Event" : "Host Event"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>

      <EventLoader isOpen={isLoading} message={loadingMessage} />
    </div>
  );
}
