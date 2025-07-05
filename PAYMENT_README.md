# ScholarBEE Sponsor Payment System

## Overview
The Sponsor Payment system allows sponsors to pay for scholarships when they create them. The system supports multiple payment methods, tracks payment status, and integrates with the scholarship creation workflow. Once payment is completed, the scholarship becomes active and students can apply.

---

## Features
- **Multiple Payment Methods:** UPI, Credit/Debit Card, Net Banking, Digital Wallet
- **Payment Status Tracking:** Pending, Processing, Completed, Failed, Refunded
- **Automatic Scholarship Activation:** Scholarships become active after successful payment
- **Payment History:** Complete transaction history with filtering and pagination
- **Payment Statistics:** Dashboard with payment analytics and insights
- **Secure Processing:** Simulated payment gateway with transaction IDs
- **Integration:** Seamless integration with scholarship creation workflow

---

## Backend Implementation

### 1. **Model**
- **File:** `backend/models/paymentModel.js`
- **Fields:**
  - `sponsorId` (references User)
  - `scholarshipId` (references Scholarship)
  - `amount`, `paymentMethod`, `status`
  - `transactionId` (unique, auto-generated)
  - `upiId`, `cardDetails`, `bankDetails`
  - `description`, `metadata`, `failureReason`
  - `processedAt`, `refundedAt`

### 2. **Controller**
- **File:** `backend/controllers/paymentController.js`
- **Endpoints:**
  - `POST /api/payments/create` — Create payment for scholarship
  - `GET /api/payments/status/:paymentId` — Get payment status
  - `GET /api/payments/history` — Get sponsor's payment history
  - `POST /api/payments/process/:paymentId` — Process payment (simulate gateway)
  - `GET /api/payments/stats` — Get payment statistics

### 3. **Routes**
- **File:** `backend/routes/paymentRoutes.js`
- **Mounted at:** `/api/payments` in `backend/app.js`
- **Middleware:** All routes require authentication and sponsor role

### 4. **Scholarship Integration**
- Updated `backend/models/scholarshipModel.js` to include `paymentStatus` field
- Scholarships start as `draft` status and become `active` after payment
- Payment status tracks: `pending`, `paid`, `failed`

---

## Frontend Implementation

### 1. **Payment Page**
- **File:** `frontend/src/pages/sponsor/PaymentPage.jsx`
- **Features:**
  - Multiple payment method selection (UPI, Card, Net Banking, Wallet)
  - Real-time payment status polling
  - Payment form validation
  - Success/failure handling
  - Automatic redirect after payment

### 2. **Payment History Page**
- **File:** `frontend/src/pages/sponsor/PaymentHistory.jsx`
- **Features:**
  - Complete payment transaction history
  - Payment statistics dashboard
  - Filtering by payment status
  - Pagination support
  - Transaction details and status tracking

### 3. **API Service**
- **File:** `frontend/src/services/api.js`
- **Exported as:** `paymentAPI`
- **Methods:**
  - `createPayment(scholarshipId, paymentMethod, paymentDetails)`
  - `getPaymentStatus(paymentId)`
  - `getPaymentHistory(page, limit, status)`
  - `processPayment(paymentId)`
  - `getPaymentStats()`

### 4. **Integration Points**
- **CreateScholarship:** Redirects to payment after scholarship creation
- **ManageScholarships:** Shows payment status and "Pay Now" buttons
- **Navbar:** Added "Payments" link for sponsors
- **App.jsx:** Added payment routes

---

## API Endpoints

### **Payment Management**
- `POST   /api/payments/create` — Create payment (fields: `scholarshipId`, `paymentMethod`, `paymentDetails`)
- `GET    /api/payments/status/:paymentId` — Get payment status
- `GET    /api/payments/history` — Payment history (pagination, filter by status)
- `POST   /api/payments/process/:paymentId` — Process payment (simulate gateway)
- `GET    /api/payments/stats` — Payment statistics

### **Payment Methods Supported**
- **UPI:** Requires `upiId` (format: username@bank)
- **Card:** Requires `cardNumber`, `expiryMonth`, `expiryYear`, `cvv`
- **Net Banking:** Requires `bankName`, `accountNumber`
- **Digital Wallet:** Placeholder for future integration

---

## Payment Flow

### **1. Scholarship Creation**
1. Sponsor creates scholarship (status: `draft`)
2. System calculates total amount (amount × numberOfAwards)
3. Redirect to payment page

### **2. Payment Process**
1. Sponsor selects payment method
2. Enters payment details
3. System validates input
4. Creates payment record (status: `pending`)
5. Simulates payment processing
6. Updates payment status to `completed`
7. Activates scholarship (status: `active`)

### **3. Payment Status Tracking**
- **Pending:** Payment created, awaiting processing
- **Processing:** Payment being processed by gateway
- **Completed:** Payment successful, scholarship active
- **Failed:** Payment failed, scholarship remains draft
- **Refunded:** Payment refunded (future feature)

---

## Usage

### **For Sponsors:**
1. **Create Scholarship:** Fill out scholarship details
2. **Complete Payment:** Choose payment method and enter details
3. **Monitor Status:** Track payment processing in real-time
4. **View History:** Access complete payment history
5. **Manage Scholarships:** See payment status for each scholarship

### **Payment Methods:**
- **UPI:** Quick and secure, requires UPI ID
- **Card:** Traditional card payment with validation
- **Net Banking:** Direct bank transfer
- **Wallet:** Digital wallet integration (coming soon)

---

## Security Features
- **Input Validation:** All payment details validated
- **XSS Protection:** Input sanitization with `xss` package
- **Authentication:** All endpoints require sponsor authentication
- **Transaction IDs:** Unique identifiers for all payments
- **Status Tracking:** Complete audit trail of payment status

---

## Testing
- **Simulated Gateway:** 90% success rate for testing
- **Status Polling:** Real-time status updates
- **Error Handling:** Comprehensive error messages
- **Validation:** Form validation for all payment methods

---

## Extending/Customizing
- **Real Payment Gateway:** Integrate with Razorpay, Stripe, etc.
- **Additional Methods:** Add more payment options
- **Refund System:** Implement refund functionality
- **Notifications:** Email/SMS notifications for payment status
- **Analytics:** Enhanced payment analytics and reporting
- **Admin Controls:** Admin panel for payment monitoring

---

## File Summary
- `backend/models/paymentModel.js` — Payment schema
- `backend/controllers/paymentController.js` — Payment logic
- `backend/routes/paymentRoutes.js` — Payment API routes
- `backend/models/scholarshipModel.js` — Updated with payment status
- `frontend/src/pages/sponsor/PaymentPage.jsx` — Payment UI
- `frontend/src/pages/sponsor/PaymentHistory.jsx` — Payment history UI
- `frontend/src/services/api.js` — Payment API methods
- `frontend/src/components/Navbar.jsx` — Payment link in navbar
- `frontend/src/pages/sponsor/CreateScholarship.jsx` — Payment integration
- `frontend/src/pages/sponsor/ManageScholarships.jsx` — Payment status display

---

## Integration with Existing Systems
- **Wallet System:** Payments fund student wallets when applications are approved
- **Scholarship System:** Payment required before scholarship activation
- **User System:** Payment history tied to sponsor accounts
- **Application System:** Only active scholarships can receive applications

---

## Questions?
For any questions or further customization, please contact the project maintainer or open an issue. 