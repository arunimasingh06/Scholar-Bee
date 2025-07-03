const mongoose = require('mongoose');
const Course = require('./models/courseModel');
const Scholarship = require('./models/scholarshipModel');
const User = require('./models/userModel');
const Application = require('./models/applicationModel');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scholarbee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Course.deleteMany({});
    await Scholarship.deleteMany({});
    await Application.deleteMany({});

    // Create sample courses
    const courses = [
      {
        title: 'Complete Python Programming Bootcamp',
        description: 'Master Python from basics to advanced concepts including web development, data science, and automation.',
        instructor: 'Dr. Rajesh Kumar',
        duration: '12 weeks',
        level: 'Beginner',
        category: 'programming',
        rating: 4.8,
        students: 15420,
        price: 'Free',
        image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        tags: ['Python', 'Programming', 'Web Development'],
        scholarshipAvailable: true,
        scholarshipAmount: 1000,
        link: '/courses/python-bootcamp',
        status: 'active'
      },
      {
        title: 'Data Science with Machine Learning',
        description: 'Learn data analysis, visualization, and machine learning using Python and popular libraries.',
        instructor: 'Prof. Priya Sharma',
        duration: '16 weeks',
        level: 'Intermediate',
        category: 'data-science',
        rating: 4.9,
        students: 8750,
        price: 'Free',
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        tags: ['Data Science', 'Machine Learning', 'Python'],
        scholarshipAvailable: true,
        scholarshipAmount: 1500,
        link: '/courses/data-science',
        status: 'active'
      },
      {
        title: 'Full Stack Web Development',
        description: 'Build modern web applications using React, Node.js, and MongoDB from scratch.',
        instructor: 'Amit Patel',
        duration: '20 weeks',
        level: 'Intermediate',
        category: 'web',
        rating: 4.7,
        students: 12300,
        price: 'Free',
        image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        tags: ['React', 'Node.js', 'MongoDB'],
        scholarshipAvailable: true,
        scholarshipAmount: 1200,
        link: '/courses/web-development',
        status: 'active'
      },
      {
        title: 'UI/UX Design Fundamentals',
        description: 'Learn design principles, user research, prototyping, and create stunning user interfaces.',
        instructor: 'Sneha Gupta',
        duration: '10 weeks',
        level: 'Beginner',
        category: 'design',
        rating: 4.6,
        students: 9800,
        price: 'Free',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        tags: ['UI Design', 'UX Research', 'Figma'],
        scholarshipAvailable: true,
        scholarshipAmount: 800,
        link: '/courses/ui-ux-design',
        status: 'active'
      },
      {
        title: 'Digital Marketing Mastery',
        description: 'Master SEO, social media marketing, content strategy, and analytics for business growth.',
        instructor: 'Vikram Singh',
        duration: '8 weeks',
        level: 'Beginner',
        category: 'business',
        rating: 4.5,
        students: 11200,
        price: 'Free',
        image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        tags: ['SEO', 'Social Media', 'Analytics'],
        scholarshipAvailable: true,
        scholarshipAmount: 750,
        link: '/courses/digital-marketing',
        status: 'active'
      },
      {
        title: 'Mobile App Development with React Native',
        description: 'Build cross-platform mobile apps for iOS and Android using React Native framework.',
        instructor: 'Arjun Mehta',
        duration: '14 weeks',
        level: 'Advanced',
        category: 'mobile',
        rating: 4.8,
        students: 6500,
        price: 'Free',
        image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
        tags: ['React Native', 'Mobile Development', 'JavaScript'],
        scholarshipAvailable: true,
        scholarshipAmount: 1300,
        link: '/courses/mobile-development',
        status: 'active'
      }
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ Created ${createdCourses.length} courses`);

    // Get or create a sponsor user
    let sponsor = await User.findOne({ email: 'sponsor@example.com' });
    const hashedPassword = await bcrypt.hash('password123', 10);
    if (!sponsor) {
      sponsor = await User.create({
        fullname: 'Tech Foundation',
        email: 'sponsor@example.com',
        password: hashedPassword,
        role: 'sponsor',
        phone: '+91 9876543210',
        organization: 'Tech Foundation',
        city: 'Mumbai'
      });
    } else {
      sponsor.fullname = 'Tech Foundation';
      sponsor.password = hashedPassword;
      sponsor.role = 'sponsor';
      sponsor.phone = '+91 9876543210';
      sponsor.organization = 'Tech Foundation';
      sponsor.city = 'Mumbai';
      await sponsor.save();
    }

    // Create sample scholarships
    const scholarships = [
      {
        title: 'Complete Python Programming Course',
        description: 'Complete a comprehensive Python programming course and submit your final project.',
        amount: 1000,
        category: 'Programming',
        difficulty: 'Beginner',
        deadline: new Date('2025-02-15'),
        sponsorId: sponsor._id,
        requirements: [
          'Complete at least 40 hours of Python programming coursework',
          'Submit a final project demonstrating core Python concepts',
          'Provide certificates or proof of course completion',
          'Write a 500-word essay on what you learned'
        ],
        tags: ['Python', 'Programming', 'Beginner'],
        status: 'active',
        numberOfAwards: 5,
        totalBudget: 5000,
        applicants: 23,
        approved: 3,
        rejected: 2,
        pending: 18
      },
      {
        title: 'Community Service Project',
        description: 'Organize and execute a community service project that benefits at least 50 people.',
        amount: 750,
        category: 'Social Impact',
        difficulty: 'Intermediate',
        deadline: new Date('2025-02-28'),
        sponsorId: sponsor._id,
        requirements: [
          'Plan and execute a community service project',
          'Benefit at least 50 people directly',
          'Document the project with photos and testimonials',
          'Write a detailed impact report'
        ],
        tags: ['Community', 'Social Impact', 'Leadership'],
        status: 'active',
        numberOfAwards: 8,
        totalBudget: 6000,
        applicants: 15,
        approved: 2,
        rejected: 1,
        pending: 12
      },
      {
        title: 'Data Science Certification',
        description: 'Complete a recognized data science certification and submit a capstone project.',
        amount: 1200,
        category: 'Data Science',
        difficulty: 'Advanced',
        deadline: new Date('2025-01-30'),
        sponsorId: sponsor._id,
        requirements: [
          'Complete a recognized data science certification',
          'Submit a capstone project using real data',
          'Present findings in a clear, professional manner',
          'Include code repository and documentation'
        ],
        tags: ['Data Science', 'Analytics', 'Certification'],
        status: 'active',
        numberOfAwards: 3,
        totalBudget: 3600,
        applicants: 8,
        approved: 3,
        rejected: 2,
        pending: 0
      },
      {
        title: 'Web Development Bootcamp',
        description: 'Learn full-stack web development and build a complete web application.',
        amount: 1500,
        category: 'Programming',
        difficulty: 'Intermediate',
        deadline: new Date('2025-03-15'),
        sponsorId: sponsor._id,
        requirements: [
          'Complete HTML, CSS, and JavaScript fundamentals',
          'Build a responsive web application',
          'Deploy the application to a live server',
          'Write documentation for your project'
        ],
        tags: ['Web Development', 'JavaScript', 'Full Stack'],
        status: 'active',
        numberOfAwards: 6,
        totalBudget: 9000,
        applicants: 31,
        approved: 4,
        rejected: 3,
        pending: 24
      },
      {
        title: 'Digital Marketing Project',
        description: 'Create and execute a digital marketing campaign for a local business.',
        amount: 800,
        category: 'Marketing',
        difficulty: 'Beginner',
        deadline: new Date('2025-02-20'),
        sponsorId: sponsor._id,
        requirements: [
          'Develop a marketing strategy for a local business',
          'Create social media content and campaigns',
          'Track and analyze campaign performance',
          'Present results and recommendations'
        ],
        tags: ['Marketing', 'Social Media', 'Analytics'],
        status: 'active',
        numberOfAwards: 10,
        totalBudget: 8000,
        applicants: 18,
        approved: 5,
        rejected: 2,
        pending: 11
      },
      {
        title: 'UI/UX Design Portfolio',
        description: 'Create a professional UI/UX design portfolio with 3 complete projects.',
        amount: 1100,
        category: 'Design',
        difficulty: 'Intermediate',
        deadline: new Date('2025-03-01'),
        sponsorId: sponsor._id,
        requirements: [
          'Design 3 complete user interfaces',
          'Create wireframes and prototypes',
          'Conduct user research and testing',
          'Present your design process and decisions'
        ],
        tags: ['UI Design', 'UX Research', 'Prototyping'],
        status: 'active',
        numberOfAwards: 4,
        totalBudget: 4400,
        applicants: 12,
        approved: 2,
        rejected: 1,
        pending: 9
      },
      {
        title: 'Business Plan Competition',
        description: 'Develop a comprehensive business plan for a startup idea.',
        amount: 2000,
        category: 'Business',
        difficulty: 'Advanced',
        deadline: new Date('2025-01-25'),
        sponsorId: sponsor._id,
        requirements: [
          'Research and validate your business idea',
          'Create financial projections and market analysis',
          'Develop a marketing and sales strategy',
          'Present your business plan to a panel'
        ],
        tags: ['Business', 'Entrepreneurship', 'Strategy'],
        status: 'active',
        numberOfAwards: 2,
        totalBudget: 4000,
        applicants: 6,
        approved: 1,
        rejected: 1,
        pending: 4
      },
      {
        title: 'Mobile App Development',
        description: 'Build a functional mobile app using React Native or Flutter.',
        amount: 1800,
        category: 'Programming',
        difficulty: 'Advanced',
        deadline: new Date('2025-03-10'),
        sponsorId: sponsor._id,
        requirements: [
          'Choose a mobile app framework (React Native/Flutter)',
          'Build a complete mobile application',
          'Test on both iOS and Android devices',
          'Publish to app stores or provide APK/IPA files'
        ],
        tags: ['Mobile Development', 'React Native', 'Flutter'],
        status: 'active',
        numberOfAwards: 3,
        totalBudget: 5400,
        applicants: 9,
        approved: 2,
        rejected: 1,
        pending: 6
      }
    ];

    const createdScholarships = await Scholarship.insertMany(scholarships);
    console.log(`✅ Created ${createdScholarships.length} scholarships`);

    // Get or create a student user
    let student = await User.findOne({ email: 'student@example.com' });
    const hashedStudentPassword = await bcrypt.hash('password123', 10);
    if (!student) {
      student = await User.create({
        fullname: 'Amritansh',
        email: 'student@example.com',
        password: hashedStudentPassword, // password123
        role: 'student',
        phone: '+91 9876543211',
        institution: 'IIT Delhi',
        course: 'Computer Science',
        year: '3rd Year',
        gpa: '8.7',
        city: 'Delhi'
      });
    } else {
      student.fullname = 'Amritansh';
      student.password = hashedStudentPassword;
      student.role = 'student';
      student.phone = '+91 9876543211';
      student.institution = 'IIT Delhi';
      student.course = 'Computer Science';
      student.year = '3rd Year';
      student.gpa = '8.7';
      student.city = 'Delhi';
      await student.save();
    }

    // Create sample applications
    const applications = [
      {
        studentId: student._id,
        scholarshipId: createdScholarships[0]._id,
        status: 'pending',
        essay: 'I am passionate about learning Python programming because it opens up countless opportunities in software development, data science, and automation. Through this scholarship, I aim to build a strong foundation in Python that will help me contribute to open-source projects and eventually develop applications that solve real-world problems in my community.',
        motivation: 'Python is essential for modern software development and I want to master it to advance my career.',
        projectPlan: 'I plan to create a web-based expense tracker application using Python Flask framework. The project will include user authentication, expense categorization, budget tracking, and visual reports using charts.',
        timeline: 'Week 1-2: Python basics and syntax, Week 3-4: Data structures and algorithms, Week 5-6: Web development with Flask, Week 7-8: Final project development and testing.',
        documents: ['Python_Basics_Certificate.pdf', 'Previous_Projects_Portfolio.pdf'],
        amount: 1000
      },
      {
        studentId: student._id,
        scholarshipId: createdScholarships[1]._id,
        status: 'approved',
        essay: 'I want to make a positive impact in my community through meaningful service projects.',
        motivation: 'Community service is important for personal growth and social responsibility.',
        projectPlan: 'I will organize a digital literacy workshop for underprivileged children in my neighborhood.',
        timeline: 'Week 1: Planning and coordination, Week 2-3: Workshop execution, Week 4: Documentation and reporting.',
        documents: ['Project_Proposal.pdf', 'Community_Support_Letters.pdf'],
        amount: 750,
        reviewNotes: 'Excellent project proposal with clear social impact. Strong academic background and relevant experience.',
        reviewedAt: new Date(),
        reviewedBy: sponsor._id
      }
    ];

    const createdApplications = await Application.insertMany(applications);
    console.log(`✅ Created ${createdApplications.length} applications`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • Courses: ${createdCourses.length}`);
    console.log(`   • Scholarships: ${createdScholarships.length}`);
    console.log(`   • Applications: ${createdApplications.length}`);
    console.log(`   • Sponsor: ${sponsor.fullname} (${sponsor.email})`);
    console.log(`   • Student: ${student.fullname} (${student.email})`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding
seedData(); 