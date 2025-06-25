#!/bin/bash

# 🚀 ScholarBEE Development Startup Script
# Beginner-friendly script to start both frontend and backend

echo "🎓 Welcome to ScholarBEE Development Setup!"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Check if MongoDB is running (optional check)
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is not running. You may need to start it manually."
        echo "   On macOS: brew services start mongodb-community"
        echo "   On Windows: Start MongoDB service"
        echo "   On Linux: sudo systemctl start mongod"
    fi
else
    echo "⚠️  MongoDB not found. Make sure MongoDB is installed and running."
fi

# Create .env files if they don't exist
echo ""
echo "📝 Setting up environment files..."

# Backend .env
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env from env.development..."
    cp backend/env.development backend/.env
    echo "✅ Backend .env file created"
else
    echo "✅ Backend .env file already exists"
fi

# Frontend .env
if [ ! -f "frontend/.env" ]; then
    echo "Creating frontend/.env from env.development..."
    cp frontend/env.development frontend/.env
    echo "✅ Frontend .env file created"
else
    echo "✅ Frontend .env file already exists"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."

echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..

echo "✅ All dependencies installed successfully!"

# Start the servers
echo ""
echo "🚀 Starting servers..."
echo "Backend will run on: http://localhost:3000"
echo "Frontend will run on: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait 