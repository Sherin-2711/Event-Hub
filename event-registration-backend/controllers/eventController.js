const Event = require('../models/Event');
const Registration = require('../models/Registration');
const { cloudinary } = require('../config/cloudinaryConfig');



exports.createEvent = async (req, res) => {
  try {
    const {
      eventName,
      college,
      description,
      minTeam,
      maxTeam,
      deadline,
      startDate,
      endDate,
      mode,
      prize,
      judgingCriteria,
      contactEmail,
      category,
    } = req.body;

    // Store Cloudinary URL instead of local file path
    const image = req.file ? req.file.path : "";

    const newEvent = new Event({
      eventName,
      college,
      description,
      minTeam,
      maxTeam,
      deadline,
      startDate,
      endDate,
      mode,
      prize,
      judgingCriteria,
      contactEmail,
      category,

      createdBy: req.user.id,

      image,
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// Register a user for an event
exports.registerForEvent = async (req, res) => {
  const { userEmail, eventId } = req.body;

  try {
    const existing = await Registration.findOne({ userEmail, eventId });
    if (existing) {
      return res.status(400).json({ message: "Already registered" });
    }

    const reg = new Registration({ userEmail, eventId });
    await reg.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get events registered by a user
exports.getRegisteredEvents = async (req, res) => {
  const { email } = req.params;

  try {
    const regs = await Registration.find({ userEmail: email }).populate('eventId');
    const events = regs.map((reg) => reg.eventId);
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not fetch registrations" });
  }
};

// Get events hosted by admin
exports.getEventsByHost = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch hosted events" });
  }
};


// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this event" });
    }

    const updatableFields = [
      "eventName",
      "description",
      "college",
      "mode",
      "startDate",
      "endDate",
      "deadline",
      "prize",
      "judgingCriteria",
      "minTeam",
      "maxTeam",
      "category",
      "contactEmail",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        event[field] = req.body[field];
      }
    });

    if (req.file) {
      // Delete old image from Cloudinary if exists (non-blocking)
      if (event.image) {
        // Extract public_id from Cloudinary URL
        const urlParts = event.image.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = `event-hub/events/${publicIdWithExtension.split('.')[0]}`;

        // Fire and forget - don't wait for deletion to complete
        cloudinary.uploader.destroy(publicId).catch((err) => {
          console.warn("Failed to delete old image from Cloudinary:", err.message);
        });
      }

      // Save new Cloudinary URL
      event.image = req.file.path;
    }

    await event.save();

    res.json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({ message: "Failed to update event" });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    if (event.image) {
      // Extract public_id from Cloudinary URL
      const urlParts = event.image.split('/');
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId = `event-hub/events/${publicIdWithExtension.split('.')[0]}`;

      // Fire and forget - don't wait for deletion to complete
      cloudinary.uploader.destroy(publicId).catch((err) => {
        console.warn("Failed to delete image from Cloudinary:", err.message);
      });
    }

    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete event error:", err);
    res.status(500).json({ message: "Failed to delete event" });
  }
};


// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch event" });
  }
};

