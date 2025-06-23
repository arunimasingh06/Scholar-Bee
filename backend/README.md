## routes/studentRoutes.js

/student/dashboard → Fetch open scholarships

/student/applications → Fetch logged-in student’s applications

/student/apply/:scholarshipId → Submit a new application
 
## controllers/studentController.js
Implements logic for dashboard, application listing, and applying to scholarships.

## Sponser Routes 

| HTTP Method | Path                         | Purpose                                   |
| ----------- | ---------------------------- | ----------------------------------------- |
| `GET`       | `/dashboard`                 | Returns summary stats for the sponsor     |
| `GET`       | `/scholarships`              | Lists all scholarships created by sponsor |
| `POST`      | `/create`                    | Creates a new scholarship                 |
| `PUT`       | `/scholarships/:id`          | Updates an existing scholarship           |
| `PATCH`     | `/scholarships/:id/close`    | Closes (deactivates) a scholarship        |
| `GET`       | `/applications/:id`          | Lists applications for a scholarship      |
| `PATCH`     | `/applications/:id/decision` | Approves or rejects a student application |

verifyToken: Ensures user is logged in via JWT

requireRole('sponsor'): Ensures user is a sponsor

🔸 getDashboard()
Collects all scholarships created by the sponsor

Calculates:

Total number of scholarships

Total amount offered

Total number of student applicants

🔸 createScholarship()
Creates a new scholarship using request body (title, amountPerStudent, deadline, etc.)

Automatically links it to the logged-in sponsor via req.user.id

🔸 listScholarships()
Returns a list of all scholarships created by the sponsor

🔸 updateScholarship()
Updates a scholarship based on its ID (only if it belongs to the logged-in sponsor)

Example use: Sponsor wants to edit amount or deadline

🔸 closeScholarship()
Updates the status of a scholarship to "closed"

Used when a scholarship is no longer accepting applications

🔸 getApplications()
Lists all student applications for a specific scholarship

Useful for viewing all submissions per scholarship

🔸 decideApplication()
Sponsor can approve or reject an application

The status is updated in the Application model

Example: { status: "approved" }


### auth routes
 Login, signup (student/sponsor)
### authController.js         
 Signup, login, JWT auth


📁 ScholarBEE-Backend
├── config/
│   └── db.js                      // MongoDB connection setup
│
├── controllers/
│   ├── applicationController.js  // Application handling (apply/view/etc)
│   ├── authController.js         // Signup, login, JWT auth
│   ├── publicController.js       // Landing, about, contact, etc.
│   ├── sponsorController.js      // Sponsor dashboard, scholarships, profile
│   ├── studentController.js      // Student dashboard, applications
│   └── userController.js         // Profile management (shared)
│
├── middlewares/
│   └── auth.js                   // verifyToken + role-based middleware
│
├── models/
│   ├── Application.js            // Application schema
│   ├── Scholarship.js            // Scholarship schema
│   └── User.js                   // User schema (student/sponsor/admin)
│
├── routes/
│   ├── applicationRoutes.js      // Application submission/decision
│   ├── authRoutes.js             // Login, signup (student/sponsor)
│   ├── publicRoutes.js           // Landing, about, contact
│   ├── sponsorRoutes.js          // Sponsor dashboard + features
│   ├── studentRoutes.js          // Student dashboard + features
│   └── userRoutes.js             // Shared profile routes + password change
│
├── services/
│   ├── emailService.js           // For forgot password, notifications
│   └── jwtService.js             // JWT sign/verify helpers
│
├── utils/
│   └── sendEmail.js              // Nodemailer config
│
├── .env                          // Environment variables
├── server.js                     // App entry point
└── README.md                     // Documentation


1. 🔐 jwtService.js – handles JWT token creation
2. 📧 emailService.js – handles sending email (e.g., forgot password)