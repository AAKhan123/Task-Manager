MY PROJECT: TASK MANAGER

# Task Manager - Do What You Like!

A simple Task Manager web application built with React, Node.js, and MongoDB, allowing users to create, edit, and manage tasks with authentication (signup/login). Deployed on Vercel for easy access and scalability. This project evolved from a basic task list to a fully functional app with user authentication and task management features, reflecting a hands-on learning experience.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Overview](#project-overview)
  - [Development Journey](#development-journey)
  - [Challenges Faced](#challenges-faced)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
  - [Available Scripts](#available-scripts)
- [How to Use](#how-to-use)
  - [Getting Started](#getting-started)
  - [Managing Tasks](#managing-tasks)
  - [Authentication](#authentication)
- [Deployment on Vercel](#deployment-on-vercel)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)


## Features
- User authentication (Signup and Login) with JWT.
- Create, edit, delete, and mark tasks as completed/pending.
- Task categorization and prioritization.
- Responsive design with Tailwind CSS.
- Real-time task management with MongoDB.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: bcryptjs, jsonwebtoken
- **Deployment**: Vercel
- **Other**: Axios, Mongoose

## Project Overview

### Development Journey
This project started as a personal experiment to build a task management tool, inspired by the need to organize daily activities. I began with a React frontend, gradually adding Tailwind CSS for styling to make it visually appealing. The backend came next with Node.js and Express, connecting to a local MongoDB instance to store tasks. Authentication was a big step, implementing signup and login features using JWT tokens, which allowed users to secure their task lists. Along the way, I’ve been tweaking the UI, like adding background images to the login page and centering titles, which made the app feel more polished. It’s been a fun ride figuring out how to tie everything together!

### Challenges Faced
I’ve hit a few bumps along the way. Early on, I struggled with server errors on `localhost:3000`, which turned out to be port conflicts or missing dependencies—I had to restart the server and clear the cache a few times. More recently, deleting tasks was tricky; the button would throw a "Server error" even though creating and updating worked fine. I spent time debugging the DELETE route and network requests, suspecting issues with task IDs or the backend. Authentication also caused headaches, especially when the JWT secret was missing, leading to those pesky 500 errors. Each challenge pushed me to learn more about logging errors and testing with tools like Postman.


## Installation

### Prerequisites
- Node.js (v14.x or later)
- npm or yarn
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Git

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Install Dependencies**
   - For the client (React app):
     ```bash
     cd client
     npm install
     ```
   - For the server:
     ```bash
     cd server
     npm install
     ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the `server` directory with the following:
     ```
     MONGO_URI=mongodb://localhost:27017/taskmanager
     PORT=5000
     JWT_SECRET=your-secure-secret-key-here
     ```
   - Replace `your-secure-secret-key-here` with a strong, unique string.

4. **Start MongoDB**
   - Run MongoDB locally:
     ```bash
     mongod
     ```

5. **Run the Application**
   - Start the server:
     ```bash
     cd server
     node server.js
     ```
   - In a new terminal, start the client:
     ```bash
     cd client
     npm start
     ```
   - Open `http://localhost:3000` in your browser.

### Available Scripts
In the project directory (client), you can run the following scripts:

- **`npm start`**
  - Runs the app in development mode.
  - Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
  - The page will reload when you make changes.
  - You may also see lint errors in the console.

- **`npm test`**
  - Launches the test runner in interactive watch mode.
  - See the [Create React App documentation on running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- **`npm run build`**
  - Builds the app for production to the `build` folder.
  - Correctly bundles React in production mode and optimizes the build for best performance.
  - The build is minified, and filenames include hashes.
  - Your app is ready to be deployed!
  - See the [Create React App deployment guide](https://facebook.github.io/create-react-app/docs/deployment) for more information.

- **`npm run eject`**
  - **Note**: This is a one-way operation. Once you `eject`, you can't go back!
  - If unsatisfied with the build tool and configuration choices, `eject` copies all configuration files (webpack, Babel, ESLint, etc.) into your project for full control.
  - All commands except `eject` will still work, pointing to the copied scripts.
  - You don’t have to use `eject`; the curated feature set suits small and middle deployments.

## How to Use

### Getting Started
To begin using the Task Manager, set up the application locally as outlined in the Installation section. Once the server is running on `http://localhost:3000`, navigate to the login page. If you’re a new user, sign up first. The interface features a dark-themed background (which I’ve been experimenting with, like adding ocean images), a centered login form, and a responsive layout that works on both desktop and mobile.

### Managing Tasks
After logging in, you’ll land on the tasks page where you can:
- **Create a Task**: Click the "Create Task" button, fill in the title, description, category (e.g., General), priority (e.g., Medium), and submit. The task will appear in the list.
- **Edit a Task**: Click "Edit" on a task card to modify its details, then save changes.
- **Delete a Task**: Use the "Delete" button to remove a task. (Note: I’ve been working on fixing delete issues, so it might need a server restart if it fails.)
- **Mark Status**: Toggle tasks between "Pending" and "Completed" using the respective buttons, which update in real-time.
- The task list is searchable by title and filterable by category or status, making it easy to find what you need.

### Authentication
- **Signup**: Visit `/signup`, enter your name, a unique email, and a password. The app hashes your password securely and creates an account. You’ll receive a JWT token to access protected routes.
- **Login**: Go to `/login`, input your email and password. If successful, you’ll be redirected to `/tasks`. I’ve added a background image here to make it visually appealing, though we’ve been troubleshooting login server errors lately.
- **Logout**: Click "Logout" in the navbar to clear your token and return to the login page.
- Ensure your credentials match a user in the `users` collection in MongoDB for a smooth experience.

## Deployment on Vercel
This project is deployed on Vercel. Access the live application here: [https://your-task-manager.vercel.app](https://your-task-manager.vercel.app).

## Environment Variables
| Variable       | Description                        | Example Value                              |
|----------------|------------------------------------|--------------------------------------------|
| `MONGO_URI`    | MongoDB connection string          | `mongodb://localhost:27017/taskmanager`     |
| `PORT`         | Server port                        | `5000`                                     |
| `JWT_SECRET`   | Secret key for JWT tokens          | `X7k9P2mQ8jL5vR4nY6tH3wE1zA8xC2bF`        |

## API Endpoints
- `POST /auth/signup`: Create a new user.
- `POST /auth/login`: Authenticate and get a JWT token.
- `GET /tasks`: Fetch all tasks (protected route).
- `POST /tasks`: Create a task.
- `PUT /tasks/:id`: Update a task.
- `DELETE /tasks/:id`: Delete a task.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.



