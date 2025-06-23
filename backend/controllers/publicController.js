// Dummy content: In a real app, fetch this from CMS or database if dynamic

exports.getLandingPage = (req, res) => {
  res.json({
    message: 'Welcome to ScholarBEE!',
    features: [
      'Find micro-scholarships',
      'Apply easily',
      'Track progress',
      'Sponsor directly to students'
    ]
  });
};

exports.getCourses = (req, res) => {
  res.json({
    courses: [
      {
        title: 'How to Write Scholarship Essays',
        level: 'Beginner',
        link: '/courses/essay-writing'
      },
      {
        title: 'Financial Literacy for Students',
        level: 'Intermediate',
        link: '/courses/finance-basics'
      }
    ]
  });
};

exports.getAbout = (req, res) => {
  res.json({
    organization: 'ScholarBEE',
    mission:
      'We connect underrepresented students with sponsors to fund education through micro-scholarships.',
    values: ['Transparency', 'Equity', 'Empowerment']
  });
};

exports.getContact = (req, res) => {
  res.json({
    email: 'support@scholarbee.org',
    phone: '+91 99999 88888',
    address: '123, Knowledge Street, Delhi, India'
  });
};
