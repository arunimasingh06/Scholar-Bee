# Payment-Required Scholarship Flow

## Overview

This document describes the updated scholarship creation flow that ensures scholarships are only activated after successful payment. This prevents the creation of unpaid scholarships and maintains data integrity.

## Flow Changes

### 1. Scholarship Creation Process

**Before:**
- Scholarship created with status 'active'
- Payment processed separately
- Unpaid scholarships could exist

**After:**
- Scholarship created with status 'draft' and paymentStatus 'pending'
- Payment required to activate scholarship
- Only paid scholarships become active

### 2. Backend Changes

#### Scholarship Model
- All new scholarships start with `status: 'draft'`
- All new scholarships start with `paymentStatus: 'pending'`
- Only scholarships with `status: 'active'` AND `paymentStatus: 'paid'` are shown to students

#### Sponsor Controller (`backend/controllers/sponserController.js`)
- `createScholarship()`: Creates scholarship as draft with pending payment
- `deleteDraftScholarship()`: New endpoint to delete unpaid draft scholarships

#### Payment Controller (`backend/controllers/paymentController.js`)
- Payment processing updates scholarship status to 'active' and paymentStatus to 'paid'
- Failed payments keep scholarship as draft

#### Public Controller (`backend/controllers/publicController.js`)
- `getAvailableScholarships()`: Only shows scholarships with `status: 'active'` AND `paymentStatus: 'paid'`

### 3. Frontend Changes

#### CreateScholarship Component
- Updated success message to indicate draft creation
- Redirects to payment page after draft creation

#### ManageScholarships Component
- Shows draft scholarships with payment status
- Provides "Pay Now" button for draft scholarships
- Provides "Delete" button for draft scholarships
- Uses real API data instead of mock data

#### Sponsor Dashboard
- Displays draft scholarships separately
- Shows payment status for each scholarship

### 4. API Endpoints

#### New Endpoints
```
DELETE /api/sponsors/scholarships/:id/draft
```
- Deletes unpaid draft scholarship
- Requires sponsor authentication
- Only works for scholarships with status 'draft' and paymentStatus 'pending'

#### Updated Endpoints
```
POST /api/sponsors/scholarships/create
```
- Creates scholarship as draft
- Returns scholarship with draft status
- Requires payment to activate

```
GET /api/scholarships
```
- Only returns active and paid scholarships
- Students cannot see unpaid drafts

## User Experience

### For Sponsors

1. **Create Scholarship**
   - Fill out scholarship form
   - Submit creates draft scholarship
   - Redirected to payment page

2. **Payment Process**
   - Complete payment to activate scholarship
   - Scholarship becomes visible to students
   - Can delete draft if payment not completed

3. **Manage Scholarships**
   - View all scholarships (active, draft, completed)
   - Delete unpaid drafts
   - Pay for pending drafts

### For Students

1. **Browse Scholarships**
   - Only see active and paid scholarships
   - No visibility of unpaid drafts
   - Clean, filtered experience

2. **Apply for Scholarships**
   - All visible scholarships are guaranteed to be funded
   - No risk of applying to unpaid scholarships

## Benefits

1. **Data Integrity**: No unpaid scholarships in the system
2. **User Experience**: Students only see funded opportunities
3. **Sponsor Accountability**: Payment required before activation
4. **Clean Database**: No orphaned unpaid scholarships
5. **Transparency**: Clear payment status for all scholarships

## Testing

### Test Scenarios

1. **Create Scholarship Without Payment**
   - Create scholarship → Should be draft
   - Don't pay → Should remain draft
   - Students shouldn't see it

2. **Create Scholarship With Payment**
   - Create scholarship → Should be draft
   - Complete payment → Should become active
   - Students should see it

3. **Delete Draft Scholarship**
   - Create draft scholarship
   - Delete draft → Should be removed
   - No payment required

4. **Payment Failure**
   - Create scholarship
   - Payment fails → Should remain draft
   - Can retry payment or delete

### Test Commands

```bash
# Test scholarship creation
curl -X POST http://localhost:3000/api/sponsors/scholarships/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Scholarship","amount":1000,"numberOfAwards":5}'

# Test payment creation
curl -X POST http://localhost:3000/api/payments/create \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"scholarshipId":"SCHOLARSHIP_ID","paymentMethod":"upi","paymentDetails":{"upiId":"test@upi"}}'

# Test draft deletion
curl -X DELETE http://localhost:3000/api/sponsors/scholarships/SCHOLARSHIP_ID/draft \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test public scholarship listing (should only show active+paid)
curl http://localhost:3000/api/scholarships
```

## Migration Notes

- Existing scholarships with status 'active' but no paymentStatus will need to be updated
- Consider adding a migration script to set paymentStatus for existing scholarships
- Monitor for any scholarships that might be in inconsistent states

## Future Enhancements

1. **Payment Gateway Integration**: Replace simulated payments with real payment gateway
2. **Partial Payments**: Support for partial scholarship funding
3. **Payment Plans**: Allow sponsors to pay in installments
4. **Refund System**: Handle scholarship cancellations and refunds
5. **Payment Analytics**: Track payment success rates and patterns 