# GrowthDesk

GrowthDesk is a full-stack CRM and sales workflow management platform built for business development and sales teams in manufacturing companies.

The project was developed as part of a MERN Stack Developer Internship technical assessment to simulate a real-world business workflow system similar to platforms like Jira, GoodDay Work, and modern CRM dashboards.

The goal was not just to build static pages, but to create a connected workflow-driven application with authentication, lead tracking, sales pipeline management, reporting dashboards, and protected APIs.

---

# Project Overview

Manufacturing companies often manage client leads, quotations, negotiations, and sales workflows across multiple stages. GrowthDesk helps organize this process in a centralized dashboard where teams can:

- Manage business leads
- Track lead progress
- Visualize sales pipelines
- Monitor analytics
- Handle workflow updates securely

The application follows a modular MERN architecture and focuses on clean structure, reusable components, protected routes, and production-ready practices.

---

# Features

## Authentication System
- User registration and login
- JWT-based authentication
- Protected frontend routes
- Protected backend APIs
- Session handling with localStorage

## Dashboard
- Dynamic analytics cards
- Lead statistics overview
- Active and closed deal tracking
- Revenue summary
- Analytics chart integration

## Lead Management
- Add new leads
- Delete leads
- Search and filter leads
- Update lead statuses
- Persistent MongoDB storage
- Loading and error handling states

## Sales Pipeline
- Dynamic Kanban-style pipeline board
- Automatic grouping by lead status
- Real-time workflow visualization

## Reports & Analytics
- Revenue reporting section
- Deal performance tracking
- Sales insights dashboard

## Production Features
- Environment-based API configuration
- Reusable layout architecture
- Responsive UI design
- Modular folder structure
- Clean API separation
- Git version control workflow

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Recharts

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

# Folder Structure

```bash
GrowthDesk/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/javawithaaryan/GrowthDesk.git
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000
```

---

# Workflow Logic

The application workflow is based on a CRM-style sales lifecycle:

1. New Lead
2. Contacted
3. Quotation Sent
4. Negotiation
5. Closed Won

Leads automatically move through the sales pipeline based on their updated status.

---

# Screenshots

## Dashboard
(Add screenshot here)

## Lead Management
(Add screenshot here)

## Pipeline Board
(Add screenshot here)

## Reports
(Add screenshot here)

---

# Future Improvements

- Drag-and-drop pipeline management
- Role-based access control
- Export reports to PDF/Excel
- Email notifications
- Team collaboration features
- Advanced analytics dashboards

---

# Author

Developed by Aryan as part of a MERN Stack Developer Internship assessment project.
