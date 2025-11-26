const mongoose = require('mongoose');

const examRegistrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Invalid phone number format. Must be 10 digits starting with 6-9']
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    maxlength: [200, 'College name cannot exceed 200 characters']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    enum: {
      values: [
        'IT & Computer Engineering',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Human Resources',
        'Civil Engineering',
        'Business Administration'
      ],
      message: 'Department must be one of: IT & Computer Engineering, Electrical Engineering, Mechanical Engineering, Human Resources, Civil Engineering, or Business Administration'
    }
  },
  examId: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['registered', 'in-progress', 'completed'],
    default: 'registered'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create indexes for faster queries
examRegistrationSchema.index({ email: 1 });
examRegistrationSchema.index({ phone: 1 });
examRegistrationSchema.index({ examId: 1 });
examRegistrationSchema.index({ registeredAt: -1 });
examRegistrationSchema.index({ department: 1 }); // Index for department queries
examRegistrationSchema.index({ college: 1 }); // Index for college queries

const ExamRegistration = mongoose.model('ExamRegistration', examRegistrationSchema);

module.exports = ExamRegistration;

