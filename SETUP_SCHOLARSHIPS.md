# 🎯 How to Add Scholarships to Student Dashboard

## Simple Steps:

### 1. Add Sample Data to Database
Run this command in your terminal:
```bash
cd backend
npm run seed
```

This will add 8 sample scholarships to your database:
- Python Programming Course (₹1000)
- Community Service Project (₹750) 
- Data Science Certification (₹1200)
- Web Development Bootcamp (₹1500)
- Digital Marketing Project (₹800)
- UI/UX Design Portfolio (₹1100)
- Business Plan Competition (₹2000)
- Mobile App Development (₹1800)

### 2. Start Your Servers
```bash
# Terminal 1 - Start backend
cd backend
npm run dev

# Terminal 2 - Start frontend  
cd frontend
npm run dev
```

### 3. Login as Student
- Go to http://localhost:5173
- Login with: `student@example.com` / `password123`
- Or create a new student account

### 4. View Scholarships
- Go to `/student/dashboard` 
- You should now see all the scholarships listed!

## What You'll See:
- **8 different scholarships** with different amounts
- **Search and filter** options
- **Apply Now** buttons for each scholarship
- **Stats cards** showing your progress

## If Scholarships Don't Show:
1. Make sure MongoDB is running
2. Check that the seed script ran successfully
3. Verify you're logged in as a student
4. Check browser console for any errors

That's it! The scholarships should now appear on your student dashboard. 🎉 