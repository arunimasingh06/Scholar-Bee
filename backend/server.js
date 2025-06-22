
const http = require('http');
const app = require('./app'); // Import the Express app from app.js
const port = process.env.PORT || 3000;

const server = http.createServer(app); // Create an HTTP server using the Express app

server.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
}); 