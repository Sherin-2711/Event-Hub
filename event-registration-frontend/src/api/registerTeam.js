import { registerTeam } from "@/api/registerTeam";

const handleSubmit = async () => {
  if (!teamName || teamMembers.some(m => !m.name || !m.email)) {
    return alert("Please fill all required fields.");
  }

  try {
    // Example: Pass eventId and eventName from props or context
    await registerTeam({
      eventId: "YOUR_EVENT_ID",
      eventName: "Your Event Name",
      teamName,
      teamMembers
    });

    alert("Team registered successfully!");
    setIsOpen(false);
  } catch (err) {
    console.error("Registration error:", err);
    alert(err.message || "Failed to register");
  }
};
