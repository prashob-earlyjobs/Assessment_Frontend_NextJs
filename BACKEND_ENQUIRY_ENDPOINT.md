# Backend API Endpoint for Enquiry Form

This document provides the backend code for storing enquiry form data. You can add this to your existing backend server.

## Option 1: Node.js/Express with MongoDB (Mongoose)

### Route: `POST /api/enquiry/submit`

```javascript
// routes/enquiry.js or routes/enquiry.ts
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Enquiry Schema
const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  expectations: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one expectation is required'
    }
  },
  remarks: {
    type: String,
    trim: true,
    default: null
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    default: 'website'
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'resolved', 'closed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Create index for email and mobile for faster queries
enquirySchema.index({ email: 1 });
enquirySchema.index({ mobile: 1 });
enquirySchema.index({ submittedAt: -1 });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

// POST /api/enquiry/submit
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
    } else if (!mobile.startsWith('+91')) {
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

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: {
        id: enquiry._id,
        name: enquiry.name,
        email: enquiry.email,
        mobile: enquiry.mobile,
        expectations: enquiry.expectations,
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
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// GET /api/enquiry/list - Get all enquiries (for admin)
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
      data: enquiries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
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

// PATCH /api/enquiry/:id/status - Update enquiry status
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

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
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

module.exports = router;
```

### Usage in your main server file:

```javascript
// server.js or app.js
const express = require('express');
const mongoose = require('mongoose');
const enquiryRoutes = require('./routes/enquiry');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/earlyjobs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/api/enquiry', enquiryRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Option 2: Node.js/Express with PostgreSQL (using pg or Prisma)

```javascript
// routes/enquiry.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Create table (run this once)
/*
CREATE TABLE enquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  expectations TEXT[] NOT NULL,
  remarks TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  source VARCHAR(50) DEFAULT 'website',
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_enquiries_email ON enquiries(email);
CREATE INDEX idx_enquiries_mobile ON enquiries(mobile);
CREATE INDEX idx_enquiries_submitted_at ON enquiries(submitted_at DESC);
*/

router.post('/submit', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { name, mobile, email, expectations, remarks } = req.body;

    // Validation
    if (!name || !mobile || !email || !expectations || !Array.isArray(expectations) || expectations.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Format mobile
    const cleanMobile = mobile.replace(/\D/g, '');
    const formattedMobile = cleanMobile.length === 10 ? `+91${cleanMobile}` : mobile;

    // Insert enquiry
    const result = await client.query(
      `INSERT INTO enquiries (name, mobile, email, expectations, remarks, submitted_at, source, status)
       VALUES ($1, $2, $3, $4, $5, NOW(), 'website', 'pending')
       RETURNING *`,
      [name.trim(), formattedMobile, email.trim().toLowerCase(), expectations, remarks?.trim() || null]
    );

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error submitting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  } finally {
    client.release();
  }
});

module.exports = router;
```

---

## Option 3: Simple JSON File Storage (for testing/development)

```javascript
// routes/enquiry.js
const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const ENQUIRIES_FILE = path.join(__dirname, '../data/enquiries.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(ENQUIRIES_FILE);
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

router.post('/submit', async (req, res) => {
  try {
    await ensureDataDir();
    
    const { name, mobile, email, expectations, remarks } = req.body;

    // Validation
    if (!name || !mobile || !email || !expectations || !Array.isArray(expectations) || expectations.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Read existing enquiries
    let enquiries = [];
    try {
      const data = await fs.readFile(ENQUIRIES_FILE, 'utf8');
      enquiries = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, start with empty array
      enquiries = [];
    }

    // Create new enquiry
    const enquiry = {
      id: Date.now().toString(),
      name: name.trim(),
      mobile: mobile.startsWith('+91') ? mobile : `+91${mobile.replace(/\D/g, '')}`,
      email: email.trim().toLowerCase(),
      expectations: expectations,
      remarks: remarks?.trim() || null,
      submittedAt: new Date().toISOString(),
      source: 'website',
      status: 'pending'
    };

    enquiries.push(enquiry);

    // Write back to file
    await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2));

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry
    });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
```

---

## Environment Variables

Add these to your `.env` file:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/earlyjobs

# OR PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/earlyjobs

# Backend URL (for Next.js API route)
NEXT_PUBLIC_BACKEND_URL=https://earlyjobs.ai/api
```

---

## Testing the Endpoint

You can test the endpoint using curl:

```bash
curl -X POST http://localhost:3000/api/enquiry/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "mobile": "+919876543210",
    "email": "john@example.com",
    "expectations": ["Looking for job", "Company Tie-ups"],
    "remarks": "Looking for opportunities in IT sector"
  }'
```

---

## Next Steps

1. Choose the database option that fits your backend (MongoDB, PostgreSQL, or JSON file for testing)
2. Add the route to your existing Express server
3. Update the frontend to use the correct API endpoint
4. Optionally add email/WhatsApp notification functionality
5. Add authentication middleware if you want to protect the admin routes

