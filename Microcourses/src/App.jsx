import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import StudentSignup from './pages/StudentSignup';
import SponsorSignup from './pages/SponsorSignup';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import ScholarshipApplication from './pages/student/ScholarshipApplication';
import StudentApplications from './pages/student/StudentApplications';
import SponsorDashboard from './pages/sponsor/SponsorDashboard';
import SponsorProfile from './pages/sponsor/SponsorProfile';
import CreateScholarship from './pages/sponsor/CreateScholarship';
import ManageScholarships from './pages/sponsor/ManageScholarships';
import ApplicationsManagement from './pages/sponsor/ApplicationsManagement';
import LandingPage from './pages/LandingPage';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';

// Dashboard imports
import NGODashboard from './pages/dashboards/NGODashboard';
import StudentProgressView from './pages/dashboards/StudentProgressView';
import AdminView from './pages/dashboards/AdminView';

// Institutional Partnership imports
import CollegePortal from './pages/institutional/CollegePortal';
import CSRPortal from './pages/institutional/CSRPortal';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student/signup" element={<StudentSignup />} />
            <Route path="/sponsor/signup" element={<SponsorSignup />} />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/applications" element={<StudentApplications />} />
            <Route path="/student/apply/:id" element={<ScholarshipApplication />} />
            
            {/* Sponsor Routes */}
            <Route path="/sponsor/dashboard" element={<SponsorDashboard />} />
            <Route path="/sponsor/profile" element={<SponsorProfile />} />
            <Route path="/sponsor/create" element={<CreateScholarship />} />
            <Route path="/sponsor/scholarships" element={<ManageScholarships />} />
            <Route path="/sponsor/applications/:id" element={<ApplicationsManagement />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboards/ngo" element={<NGODashboard />} />
            <Route path="/dashboards/student-progress" element={<StudentProgressView />} />
            <Route path="/dashboards/admin" element={<AdminView />} />
            
            {/* Institutional Partnership Routes */}
            <Route path="/institutional/college" element={<CollegePortal />} />
            <Route path="/institutional/csr" element={<CSRPortal />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;