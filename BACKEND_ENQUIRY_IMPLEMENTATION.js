/**
 * Backend Endpoint Implementation for Enquiry Form
 * 
 * This file contains ready-to-use code for your backend server.
 * Add this to your existing Express.js backend.
 * 
 * Route: POST /api/enquiry/submit
 */

// ============================================
// 1. MONGODB SCHEMA (models/Enquiry.js)
// ============================================

const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    match: [/^\+91\d{10}$/, 'Invalid mobile number format. Must be +91XXXXXXXXXX']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    maxlength: [255, 'Email cannot exceed 255 characters']
  },
  expectations: {
    type: [String],
    required: [true, 'At least one expectation is required'],
    validate: {
      validator: function(v) {
        return v && Array.isArray(v) && v.length > 0;
      },
      message: 'At least one expectation is required'
    }
  },
  remarks: {
    type: String,
    trim: true,
    maxlength: [1000, 'Remarks cannot exceed 1000 characters'],
    default: null
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    default: 'website',
    enum: ['website', 'mobile', 'api']
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'resolved', 'closed'],
    default: 'pending'
  },
  contactedAt: {
    type: Date,
    default: null
  },
  resolvedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Create indexes for faster queries
enquirySchema.index({ email: 1 });
enquirySchema.index({ mobile: 1 });
enquirySchema.index({ submittedAt: -1 });
enquirySchema.index({ status: 1 });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;


// ============================================
// 2. ROUTE HANDLER (routes/enquiry.js)
// ============================================

const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

/**
 * POST /api/enquiry/submit
 * Submit a new enquiry
 */
router.post('/submit', async (req, res) => {
  try {
    const { name, mobile, email, expectations, remarks } = req.body;

    // Validation
    if (!name || !mobile || !email || !expectations) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, mobile, email, and expectations are required'
      });
    }

    if (!Array.isArray(expectations) || expectations.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one expectation is required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate and format mobile number
    const cleanMobile = mobile.replace(/\D/g, '');
    let formattedMobile = mobile;
    
    if (cleanMobile.length === 10) {
      formattedMobile = `+91${cleanMobile}`;
    } else if (!mobile.startsWith('+91') || mobile.length !== 13) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mobile number format. Please provide a 10-digit number or +91XXXXXXXXXX format'
      });
    }

    // Create enquiry document
    const enquiry = new Enquiry({
      name: name.trim(),
      mobile: formattedMobile,
      email: email.trim().toLowerCase(),
      expectations: expectations,
      remarks: remarks?.trim() || null,
      submittedAt: new Date(),
      source: 'website',
      status: 'pending'
    });

    // Save to database
    await enquiry.save();

    // Optional: Send notification email or WhatsApp message here
    // await sendNotificationEmail(enquiry);
    // await sendWhatsAppMessage(enquiry);

    // Return success response matching your API pattern
    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: {
        id: enquiry._id,
        name: enquiry.name,
        email: enquiry.email,
        mobile: enquiry.mobile,
        expectations: enquiry.expectations,
        status: enquiry.status,
        submittedAt: enquiry.submittedAt
      }
    });

  } catch (error) {
    console.error('Error submitting enquiry:', error);
    
    // Handle duplicate entry (if unique constraint exists)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An enquiry with this email or mobile already exists'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

/**
 * GET /api/enquiry/list
 * Get all enquiries (for admin - add authentication middleware)
 */
router.get('/list', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query = {};
    
    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Enquiry.countDocuments(query);

    res.json({
      success: true,
      data: {
        enquiries: enquiries,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * PATCH /api/enquiry/:id/status
 * Update enquiry status (for admin - add authentication middleware)
 */
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'contacted', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: pending, contacted, resolved, closed'
      });
    }

    const updateData = { status, updatedAt: new Date() };
    
    if (status === 'contacted') {
      updateData.contactedAt = new Date();
    } else if (status === 'resolved') {
      updateData.resolvedAt = new Date();
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Enquiry status updated successfully',
      data: enquiry
    });
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

/**
 * GET /api/enquiry/:id
 * Get single enquiry by ID (for admin - add authentication middleware)
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id).select('-__v');

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.json({
      success: true,
      data: {
        enquiry: enquiry
      }
    });
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;


// ============================================
// 3. INTEGRATION IN YOUR MAIN SERVER FILE
// ============================================

/**
 * In your main server file (server.js or app.js), add:
 * 
 * const enquiryRoutes = require('./routes/enquiry');
 * app.use('/api/enquiry', enquiryRoutes);
 * 
 * Make sure you have:
 * - Express.js installed
 * - Mongoose installed
 * - MongoDB connection established
 * - Body parser middleware (express.json())
 */

// Example server.js structure:
/*
const express = require('express');
const mongoose = require('mongoose');
const enquiryRoutes = require('./routes/enquiry');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/earlyjobs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/enquiry', enquiryRoutes);

// Other routes...
app.use('/api/auth', authRoutes);
app.use('/api/assessments', assessmentRoutes);
// etc.

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/


// ============================================
// 4. OPTIONAL: WHATSAPP MESSAGE HELPER
// ============================================

/**
 * Optional function to send WhatsApp message after enquiry submission
 * You can integrate with Twilio, WhatsApp Business API, or any other service
 */

async function sendWhatsAppMessage(enquiry) {
  try {
    const message = `Hello *${enquiry.name}* 👋

Thank you for reaching out to EarlyJobs! We've received your enquiry and our team will get back to you soon.

📋 *Your Enquiry Details:*
• Name: ${enquiry.name}
• Mobile: ${enquiry.mobile}
• Email: ${enquiry.email}
• Expectations: ${enquiry.expectations.join(', ')}
${enquiry.remarks ? `• Remarks: ${enquiry.remarks}` : ''}

We'll review your enquiry and contact you within 24-48 hours. If you have any urgent questions, feel free to call us at +91 8217527926.

Looking forward to connecting with you!

Best regards,
EarlyJobs Team`;

    // Example using Twilio (you'll need to install: npm install twilio)
    /*
    const twilio = require('twilio');
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
      to: `whatsapp:${enquiry.mobile}`
    });
    */

    // Or use WhatsApp Business API, or any other service
    console.log('WhatsApp message would be sent:', message);
    
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    // Don't fail the enquiry submission if WhatsApp fails
  }
}

// Uncomment the sendWhatsAppMessage call in the POST /submit route if you want to use it


// ============================================
// 5. INSTALLATION INSTRUCTIONS
// ============================================

/**
 * 1. Copy the Enquiry model to: models/Enquiry.js
 * 2. Copy the route handler to: routes/enquiry.js
 * 3. In your main server file, add:
 *    const enquiryRoutes = require('./routes/enquiry');
 *    app.use('/api/enquiry', enquiryRoutes);
 * 
 * 4. Make sure you have these dependencies:
 *    npm install express mongoose
 * 
 * 5. Ensure MongoDB is running and connected
 * 
 * 6. Test the endpoint:
 *    POST http://localhost:5002/api/enquiry/submit
 *    Body: {
 *      "name": "John Doe",
 *      "mobile": "+919876543210",
 *      "email": "john@example.com",
 *      "expectations": ["Looking for job", "Company Tie-ups"],
 *      "remarks": "Looking for opportunities in IT sector"
 *    }
 */

