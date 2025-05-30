# CSTech - Agent Management System

A full-stack web application for managing agents, distributing tasks via file uploads, and handling secure admin authentication. Built using **React** (client) and **Node.js/Express** (server) with MongoDB for data persistence.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project is an **Agent Management System** designed for admin users to manage agents, upload files to distribute tasks, and monitor agent data. The application is split into two main parts:

- **Frontend:** A React app (bootstrapped with Vite) for the user interface.
- **Backend:** A Node.js/Express API server with MongoDB for user, agent, and task management.

Admins can:
- Register/login securely (JWT authentication with httpOnly cookies)
- Add, view, and manage agents
- Upload CSV files; tasks are parsed and distributed among available agents
- View distributed tasks per agent

## Features

- **Authentication**: Secure JWT-based login for admins
- **Agent Management**: Add, list, and manage agents
- **File Upload & Task Distribution**: Upload CSV files, automatically split and assign tasks to agents
- **Responsive UI**: Built with React and TailwindCSS
- **REST API**: Well-structured Express endpoints for admin, agent, and file operations

## Technology Stack

- **Frontend**: React, Vite, TailwindCSS, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose, bcryptjs, jsonwebtoken, multer
- **Other**: ESLint, dotenv, CORS

## Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)

### Clone the repository

```bash
git clone https://github.com/AaronBiswas/assessment.git
cd assessment
```

### Backend Setup

```bash
cd server
npm install
# Create a .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret
npm start
```

### Frontend Setup

```bash
cd client
npm install
# Create a .env file with:
# VITE_APP_URL=http://localhost:3000/
npm run dev
```

## Usage

- Visit the frontend (default: http://localhost:5173)
- Register or login as an admin
- Add new agents
- Upload a CSV file to distribute tasks among agents
- View and manage agents and assigned tasks

## Project Structure

```
assessment/
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   └── main.jsx
│   ├── index.html
│   └── ...
├── server/               # Express backend
│   ├── Controllers/
│   ├── Middleware/
│   ├── Models/
│   ├── Routes/
│   └── index.js
└── uploads/              # Uploaded files (auto-created)
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
