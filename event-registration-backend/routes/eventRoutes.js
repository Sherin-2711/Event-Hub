const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig');

const {
  createEvent,
  getAllEvents,
  getEventsByHost,
  registerForEvent,
  getRegisteredEvents,
  updateEvent,
  deleteEvent,
  getEventById,
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

// Upload config - now using Cloudinary storage
const upload = multer({ storage });


// Routes
router.post('/create', upload.single('image'), protect, createEvent);
router.get('/all', getAllEvents);
router.get('/hosted', protect, getEventsByHost);
router.post('/register', registerForEvent);
router.get('/registered/:email', getRegisteredEvents);

// Add this route BEFORE the put/delete
router.get('/:id', getEventById);

router.put(
  '/:id',
  protect,
  upload.single('image'),
  updateEvent
);

router.delete(
  "/:id",
  protect,
  deleteEvent
);


module.exports = router;
