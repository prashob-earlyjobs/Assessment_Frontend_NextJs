const express = require('express');
const router = express.Router();
const ExamRegistration = require('../models/ExamRegistration');

/**
 * POST /exam/register
 * Register a candidate for exam
 * 
 * Request Body:
 * {
 *   "fullName": "John Doe",
 *   "email": "john@example.com",
 *   "phone": "9876543210",
 *   "college": "ABC University",
 *   "department": "IT & Computer Engineering"
 * }
 */
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, college, department } = req.body;

    // Validation
    if (!fullName || !email || !phone || !college || !department) {
      return res.status(400).json({
        success: false,
        message: 'All fields including department are required'
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Validate phone format (10 digits starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format. Must be 10 digits starting with 6-9'
      });
    }

    // Validate department
    const validDepartments = [
      'IT & Computer Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Human Resources',
      'Civil Engineering',
      'Business Administration'
    ];
    if (!validDepartments.includes(department)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid department. Must be one of: IT & Computer Engineering, Electrical Engineering, Mechanical Engineering, Human Resources, Civil Engineering, or Business Administration'
      });
    }

    // Check if email or phone already registered
    const existingRegistration = await ExamRegistration.findOne({
      $or: [
        { email: email.toLowerCase() },
        { phone: phone }
      ]
    });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: 'Email or phone number already registered for this exam',
        examId: existingRegistration.examId
      });
    }

    // Generate unique exam ID
    const examId = `EXAM-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create new registration
    const newRegistration = new ExamRegistration({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      college: college.trim(),
      department: department.trim(),
      examId: examId,
      status: 'registered'
    });

    await newRegistration.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      examId: examId,
      data: {
        fullName: newRegistration.fullName,
        email: newRegistration.email,
        phone: newRegistration.phone,
        college: newRegistration.college,
        department: newRegistration.department,
        examId: newRegistration.examId,
        registeredAt: newRegistration.registeredAt
      }
    });

  } catch (error) {
    console.error('Exam registration error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Registration already exists'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

/**
 * GET /exam/:examId
 * Get exam registration details by examId
 */
router.get('/:examId', async (req, res) => {
  try {
    const { examId } = req.params;

    const registration = await ExamRegistration.findOne({ examId });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Exam registration not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        fullName: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        college: registration.college,
        department: registration.department,
        examId: registration.examId,
        status: registration.status,
        registeredAt: registration.registeredAt,
        createdAt: registration.createdAt,
        updatedAt: registration.updatedAt
      }
    });

  } catch (error) {
    console.error('Get exam registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

/**
 * GET /exam/list
 * Get all exam registrations with optional filters
 * Query params: page, limit, department, college, status
 */
router.get('/list', async (req, res) => {
  try {
    const { page = 1, limit = 10, department, college, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build filter object
    const filter = {};
    if (department) filter.department = department;
    if (college) filter.college = { $regex: college, $options: 'i' };
    if (status) filter.status = status;

    // Get total count
    const total = await ExamRegistration.countDocuments(filter);

    // Get registrations
    const registrations = await ExamRegistration.find(filter)
      .sort({ registeredAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    res.status(200).json({
      success: true,
      data: {
        registrations,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });

  } catch (error) {
    console.error('Get exam registrations list error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

module.exports = router;

