Personal Finance Tracker

A full-stack web application that helps users manage their personal finances by tracking expenses, budgets, and overall balance in a structured way.

Live Demo

🔗 Frontend: https://personal-finance-trackerkb.netlify.app/

Features
Authentication
User Registration
User Login
JWT-based Authentication
Protected Routes
User-specific data isolation
Expense Management
Add expenses
Categorize expenses
Track total spending
Recent transactions overview
Budget Management
Set Monthly Budget
Set Yearly Budget
Set Total Income
Automatic balance calculation
Dashboard
Total Income
Total Expenses
Remaining Balance
Budget Summary
Recent Transactions
Reports
Expense visualization using charts
Category-wise expense analysis
Tech Stack
Frontend
HTML
CSS
TypeScript
Chart.js
Backend
Node.js
Express.js
Database
MongoDB Atlas
Mongoose
Authentication
JSON Web Tokens (JWT)
Deployment
Frontend: Netlify
Backend: Render
Project Structure
personal-finance-tracker/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── db/
│
├── src/
├── dist/
│
├── login.html
├── register.html
├── dashboard.html
├── budget.html
├── reports.html
│
├── app.js
├── package.json
└── README.md
Installation
Clone Repository
git clone https://github.com/kamranbb-29/personal-finance-tracker.git
cd personal-finance-tracker
Install Dependencies
npm install
Environment Variables

Create a .env file in the root directory:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Run Development Server
nodemon app.js
Compile TypeScript
npm run build
API Endpoints
Authentication
POST /register
POST /login
Expenses
GET /expense
POST /expense
Budget
GET /budget
POST /budget
PATCH /budget
What I Learned
Designing REST APIs using Express.js
Working with MongoDB and Mongoose
JWT Authentication and Protected Routes
Middleware Architecture
Frontend ↔ Backend Integration
TypeScript for client-side development
Error Handling and Validation
Deployment using GitHub, Render, and Netlify
Future Improvements
Edit/Delete Expenses
Dark Mode
Advanced Analytics
Monthly Reports
Budget Alerts
Responsive UI Enhancements
Author

Kamran Bhat

GitHub: https://github.com/kamranbb-29

Feedback and suggestions are always welcome.
