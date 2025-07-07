const http = require('http');
const app = require('./app'); // Import the Express app configuration

// 🚀 Server Configuration
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0'; // ✅ Changed from 'localhost' to '0.0.0.0'

// Create HTTP server using Express app
const server = http.createServer(app);

// 🎯 Start the server
server.listen(port, host, () => {
  console.log(`🚀 ScholarBEE Backend Server is running!`);
  console.log(`📍 URL: http://${host}:${port}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log(`📊 Health Check: http://${host}:${port}/api/health`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🗄️  Database: ${process.env.MONGODB_URI ? '✅ MongoDB Connected' : '❌ No MongoDB URI found'}`);
  console.log('');
  console.log('📝 Available API Endpoints:');
  console.log('   • GET  /api/health - Health check');
  console.log('   • POST /api/auth/login - User login');
  console.log('   • POST /api/auth/register/student - Student registration');
  console.log('   • POST /api/auth/register/sponsor - Sponsor registration');
  console.log('   • GET  /api/users/profile - Get user profile');
  console.log('   • GET  /api/students/dashboard - Student dashboard');
  console.log('   • GET  /api/sponsors/dashboard - Sponsor dashboard');
  console.log('');
});

// 🚨 Handle server errors
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(`❌ ${bind} requires elevated privileges`);
      console.error('💡 Try running with sudo or use a different port');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`❌ ${bind} is already in use`);
      console.error('💡 Try stopping other services or use a different port');
      console.error('   To kill process on this port: lsof -ti:3000 | xargs kill');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// 🛑 Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});
