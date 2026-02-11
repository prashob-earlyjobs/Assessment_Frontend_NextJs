# EarlyJobs Assessment Platform - API Documentation

## Base URL
```
https://earlyjobs.ai/api
```

## Authentication
All authenticated requests require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

---

## 🔐 Authentication APIs

### 1. User Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "emailormobile": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "user@example.com",
      "mobile": "+919876543210",
      "role": "user",
      "isActive": true,
      "profileCompleted": false
    }
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 2. User Registration
**POST** `/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "mobile": "+919876543210",
  "password": "password123",
  "referrerId": "REF123456"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "user@example.com",
      "mobile": "+919876543210",
      "role": "user",
      "isActive": true,
      "profileCompleted": false
    }
  }
}
```

---

### 3. Send OTP
**POST** `/auth/send-otp`

**Request Body:**
```json
{
  "phoneNumber": "+919876543210",
  "email": "user@example.com",
  "franchiseId": "FRANCHISE123",
  "tochangePassword": false
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": {
    "otpId": "64f8a1b2c3d4e5f6a7b8c9d0"
  }
}
```

---

### 4. Verify OTP
**POST** `/auth/verify-otp`

**Request Body:**
```json
{
  "phoneNumber": "+919876543210",
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "verified": true
  }
}
```

---

### 5. Check Login Status
**GET** `/auth/is-logged-in`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "isLoggedIn": true,
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "user"
    }
  }
}
```

---

### 6. Reset Password
**PATCH** `/auth/reset-password/:userId`

**Request Body:**
```json
{
  "newPassword": "newpassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### 7. Complete Profile
**PUT** `/auth/complete-profile`

**Request Body:**
```json
{
  "name": "John Doe",
  "mobile": "+919876543210",
  "college": "MIT",
  "graduationYear": "2023",
  "stream": "Computer Science",
  "currentLocation": "Mumbai",
  "preferredLocation": "Bangalore",
  "experience": "Fresher",
  "skills": ["JavaScript", "React", "Node.js"],
  "resume": "base64_encoded_resume_data",
  "photo": "base64_encoded_photo_data"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Profile completed successfully",
  "data": {
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "profileCompleted": true
    }
  }
}
```

---

### 8. Update Profile
**PUT** `/auth/update-profile`

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "mobile": "+919876543211",
  "currentLocation": "Delhi"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

---

### 9. User Logout
**POST** `/auth/logout`

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 10. Admin Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "admin@earlyjobs.ai",
  "password": "adminpassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Admin User",
      "email": "admin@earlyjobs.ai",
      "role": "admin",
      "isActive": true
    }
  }
}
```

---

## 📚 Assessment APIs

### 11. Get Assessments (with filters)
**GET** `/assessments`

**Query Parameters:**
```
category=Sales%20%26%20Marketing
title=javascript
type=technical
difficulty=Beginner
page=1
limit=10
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "assessments": [
      {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "title": "JavaScript Developer Assessment",
        "description": "Comprehensive JavaScript assessment for developers",
        "category": "IT & Technical Support",
        "difficulty": "Beginner",
        "timeLimit": 30,
        "questions": 25,
        "pricing": {
          "basePrice": 999,
          "discountedPrice": 499
        },
        "isPremium": false,
        "tags": ["JavaScript", "Frontend", "Web Development"]
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  }
}
```

---

### 12. Get Assessment by ID
**GET** `/assessments/:assessmentId`

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "assessment": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "JavaScript Developer Assessment",
      "description": "Comprehensive JavaScript assessment for developers",
      "category": "IT & Technical Support",
      "difficulty": "Beginner",
      "timeLimit": 30,
      "questions": 25,
      "pricing": {
        "basePrice": 999,
        "discountedPrice": 499
      },
      "isPremium": false,
      "tags": ["JavaScript", "Frontend", "Web Development"],
      "questions": [
        {
          "question": "What is JavaScript?",
          "options": ["Programming Language", "Markup Language", "Style Sheet"],
          "correctAnswer": 0
        }
      ]
    }
  }
}
```

---

## 💳 Payment APIs

### 13. Create Payment Order
**POST** `/payments/create-order`

**Request Body:**
```json
{
  "assessmentId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
  "amount": 499,
  "currency": "INR"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "orderId": "order_123456789",
    "amount": 499,
    "currency": "INR"
  }
}
```

---

### 14. Verify Payment
**POST** `/payments/verify`

**Request Body:**
```json
{
  "orderId": "order_123456789",
  "paymentId": "pay_123456789",
  "signature": "generated_signature"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Payment verified successfully"
}
```

---

## 📊 Transaction APIs

### 15. Get User Transactions
**GET** `/transactions/user/:userId`

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "userId": "64f8a1b2c3d4e5f6a7b8c9d1",
        "assessmentId": "64f8a1b2c3d4e5f6a7b8c9d2",
        "assessmentTitle": "JavaScript Developer Assessment",
        "transactionAmount": 499,
        "transactionStatus": "success",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

## 🏢 Franchise APIs

### 16. Add Franchise
**POST** `/franchises`

**Request Body:**
```json
{
  "name": "Mumbai Franchise",
  "email": "mumbai@earlyjobs.ai",
  "password": "franchise123",
  "street": "123 Main Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "mobile": "+919876543210",
  "zipCode": "400001",
  "franchiseId": "FRANCHISE123"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Franchise added successfully",
  "data": {
    "franchise": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Mumbai Franchise",
      "franchiseId": "FRANCHISE123"
    }
  }
}
```

---

## 📈 Statistics APIs

### 17. Get User Stats
**GET** `/stats/user/:userId`

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "totalAssessments": 15,
    "completedAssessments": 12,
    "averageScore": 85.5,
    "certificatesEarned": 8,
    "skillsVerified": 6
  }
}
```

---

## 🎁 Offer APIs

### 18. Get Offers
**GET** `/offers`

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "offers": [
      {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "title": "New Year Special",
        "description": "50% off on all assessments",
        "code": "NEWYEAR50",
        "discount": 50,
        "type": "percentage",
        "validUntil": "2024-02-01T00:00:00Z",
        "isActive": true
      }
    ]
  }
}
```

---

## 📝 Common Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Account is deactivated"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 🔧 Environment Variables

```env
NEXT_PUBLIC_BACKEND_URL=https://earlyjobs.ai/api
NEXT_PUBLIC_RAZORPAY_KEY=rzp_test_your_razorpay_key
```

---

## 📋 Testing Notes

1. **Authentication**: Always include Bearer token for protected routes
2. **Rate Limiting**: API has rate limiting (100 requests per minute)
3. **File Uploads**: Use multipart/form-data for file uploads
4. **Pagination**: Use page and limit parameters for paginated responses
5. **Error Handling**: Always check the success field in responses

---

## 🚀 Postman Collection

You can import this documentation into Postman by:
1. Creating a new collection
2. Adding the base URL: `https://earlyjobs.ai/api`
3. Setting up environment variables for tokens
4. Adding each API endpoint with sample data 