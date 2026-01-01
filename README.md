# ProjectFlow Backend

ProjectFlow is a RESTful backend API for managing projects and tasks with secure JWT-based authentication.

## Project Purpose

This project was built as a portfolio and internship-level backend to demonstrate:
- Secure authentication and authorization
- REST API design using Express
- MongoDB data modeling with relationships
- Ownership-based access control
- Backend architecture suitable for a React frontend

## Features
- User registration & login
- JWT authentication & protected routes
- Project CRUD with ownership checks
- Task management within projects
- MongoDB Atlas integration
- Frontend-ready (CORS enabled)

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- CORS

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Projects
- POST /api/projects
- GET /api/projects
- DELETE /api/projects/:id

### Tasks
- POST /api/projects/:projectId/tasks
- GET /api/projects/:projectId/tasks
- PATCH /api/tasks/:id
- DELETE /api/tasks/:id

## Future Improvements
- Role-based access control (admin / user)
- Project member collaboration
- Pagination and filtering
- React frontend integration
- Deployment
