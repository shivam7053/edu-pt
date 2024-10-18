const express = require('express');
const Course = require('../models/Course');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role'); // Ensure this middleware is correctly implemented

// Create a new course (only for instructors and admins)
router.post('/create', [authMiddleware, checkRole(['instructor', 'admin'])], async (req, res) => {
  const { title, description, videoId } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      videoId,
      createdBy: req.user.id, // Assuming 'createdBy' is userId
    });

    await newCourse.save();
    res.json({ message: 'Course added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err }); // Include error in response for debugging
  }
});

// Enroll in a course (students only)
router.post('/enroll/:courseId', authMiddleware, async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id; // Get user ID from the auth middleware

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is already enrolled
    if (course.studentsEnrolled.includes(userId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Enroll the user
    course.studentsEnrolled.push(userId);
    await course.save();

    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling in course', error });
  }
});

// Fetch all courses (accessible to everyone)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
});

// GET enrolled courses for the logged-in user
router.get('/my-courses', authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find({ studentsEnrolled: req.user.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err }); // Include error for debugging
  }
});

module.exports = router; // Ensure to export the router
