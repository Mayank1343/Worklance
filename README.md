# 🚀 Worklance

> **A Production-Ready MERN Freelance Marketplace connecting Clients and Freelancers through secure project management, proposal workflows, and role-based collaboration.**

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Redux Toolkit](https://img.shields.io/badge/State-Redux%20Toolkit-764ABC?logo=redux)

---

## 📌 Overview

Worklance is a full-stack freelance marketplace inspired by modern freelancing platforms where **clients can post projects** and **freelancers can discover opportunities, submit proposals, and manage their professional profiles**.

The application demonstrates production-ready development practices including secure authentication, role-based authorization, scalable RESTful APIs, cloud deployment, and state management.

The project was built to strengthen full-stack engineering skills while following real-world software architecture principles.

---

## 🌐 Live Demo

**Frontend**

https://theworklance.vercel.app

**Backend API**

https://worklance-0d0y.onrender.com

---

# ✨ Features

## 🔐 Authentication & Authorization

* Secure JWT Authentication
* Refresh Token support
* Protected Routes
* Persistent Login Sessions
* Role-Based Access Control (RBAC)
* Client & Freelancer authorization

---

## 👨‍💼 Client Features

* Register/Login
* Create Projects
* Edit Projects
* Delete Projects
* View Own Projects
* Receive Freelancer Proposals
* Accept Proposal
* Reject Proposal
* Mark Project as Completed
* View Assigned Freelancer

---

## 👨‍💻 Freelancer Features

* Register/Login
* Browse Projects
* View Project Details
* Submit Proposal
* Track Proposal Status
* Edit Professional Profile
* Add Skills
* Portfolio Information
* Hourly Rate Management

---

## 👤 Profile Management

Users can maintain professional profiles including:

* Bio
* Skills
* Hourly Rate
* GitHub
* LinkedIn
* Location
* Professional Title

---

## 📂 Project Management

Clients can:

* Create projects
* Update project information
* Manage budgets
* Define required skills
* Track project status
* Assign freelancers through proposal approval

---

## 📨 Proposal Workflow

A complete proposal lifecycle has been implemented.

```
Client creates project
        │
        ▼
Freelancer submits proposal
        │
        ▼
Client reviews proposal
        │
 ┌──────┴──────┐
 │             │
 ▼             ▼
Accept      Reject
 │
 ▼
Project moves to In Progress
 │
 ▼
Mark Completed
```

---

# 🏗️ Tech Stack

## Frontend

* React.js
* Redux Toolkit
* React Router
* Axios
* Tailwind CSS
* React Hot Toast

---

## Backend

* Node.js
* Express.js
* JWT Authentication
* RESTful APIs

---

## Database

* MongoDB
* Mongoose ODM

---

## Deployment

* Vercel
* Render

---

## Version Control

* Git
* GitHub

---

# 📁 Project Structure

```
Worklance
│
├── client
│   ├── components
│   ├── pages
│   ├── routes
│   ├── redux
│   ├── api
│   └── layouts
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── utils
│
└── README.md
```

---

# 🔑 Core Functionalities

## Authentication

* Register
* Login
* Refresh Tokens
* Protected APIs
* Persistent Sessions

---

## Authorization

Role-based access for

* Client
* Freelancer

Every protected API validates:

* JWT Token
* User Identity
* User Role

---

## REST APIs

The backend exposes **15+ RESTful APIs** covering:

* Authentication
* Profile Management
* Project CRUD
* Proposal Management
* Status Updates

---

## State Management

Redux Toolkit is used for

* Authentication State
* User Profile
* Projects
* Selected Project
* Proposals
* Loading & Error States

---

# 📊 Database Design

Main Collections

```
Users

Profiles

Projects

Proposals
```

Relationships

```
Client
   │
   ├──── Projects
   │
   └──── Receives Proposals

Freelancer
   │
   ├──── Profile
   │
   └──── Sends Proposals
```

---

# 🔒 Security Features

* JWT Authentication
* Protected Routes
* Password Hashing
* Role-Based Authorization
* Token Verification
* Request Validation

---

# 💡 Highlights

* Production-ready MERN Architecture
* Modular Folder Structure
* Clean REST API Design
* Secure Authentication
* Responsive UI
* Cloud Deployment
* Reusable Components
* Centralized Redux Store
* Role-Based Dashboards

---

# 📈 Resume Highlights

* Built and deployed a production-ready MERN freelance marketplace.

* Designed and implemented **15+ RESTful APIs** supporting authentication, project lifecycle, proposal management, and profile management.

* Implemented secure JWT authentication with role-based access control for Clients and Freelancers.

* Developed scalable Redux Toolkit architecture for centralized application state.

* Integrated cloud deployment using **Vercel** and **Render**.

* Designed MongoDB data models supporting projects, proposals, user profiles, and workflow management.

---

# 🚀 Future Improvements

* Google OAuth Login

* Real-time Chat using Socket.IO

* Payment Gateway Integration

* File Uploads

* Ratings & Reviews

* Freelancer Search & Filters

* Notifications

* Admin Dashboard

* Project Bookmarking

* Email Notifications

* Dark Mode

---

# 🧑‍💻 Author

**Mayank Sharma**

* GitHub: https://github.com/Mayank1343
* Portfolio: https://mayanksharma-portfolio.vercel.app
* LinkedIn: https://www.linkedin.com/in/mayanksharmaa13/

---

## ⭐ If you found this project interesting, consider giving it a star!
