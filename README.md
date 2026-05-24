# GrowthDesk

GrowthDesk is a modern, full-stack CRM and sales workflow management platform built to help business development teams track leads, manage pipelines, and close deals efficiently. 

Originally developed as a technical assessment for a MERN Stack Developer Internship, the project has evolved into a production-ready application showcasing clean architecture, responsive UI, and AI-driven productivity tools.

---

## 🚀 Project Overview

Managing a sales cycle requires organization, speed, and strategic follow-ups. GrowthDesk provides a centralized hub where teams can:
- **Track Leads**: Add, edit, and organize client opportunities.
- **Visualize the Pipeline**: Move leads through a Kanban-style board from initial contact to closed deals.
- **Leverage AI (Powered by Gemini)**: Draft cold outreach emails, generate negotiation strategies, and write follow-ups instantly using an integrated AI Assistant.
- **Monitor Analytics**: View real-time dashboards and conversion charts to gauge performance.

The platform is built with a focus on stability, realistic business logic, and a polished user experience.

---

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login using JWT.
- Protected API routes and frontend views.
- Centralized Axios interceptors for automated token handling.

### 📊 Dashboard & Analytics
- Dynamic metric cards (Total Leads, Active Deals, Revenue).
- Recent Leads overview for quick access to active opportunities.
- Interactive charts built with Recharts for visual performance tracking.

### 👥 CRM & Lead Management
- Full CRUD capabilities for client leads.
- Dedicated Lead Details Modal for quick editing and status updates.
- Real-time search functionality.
- Professional UI elements: Skeleton loaders, empty states, and toast notifications.

### 🧠 AI Assistant (Gemini API)
- Built-in AI workspace for sales professionals.
- **Quick Actions**: One-click prompts for Follow-ups, Sales Strategy, Cold Outreach, and Negotiation.
- Conversation history tracking.
- Seamless copy-to-clipboard functionality.

### 📈 Sales Pipeline
- Status-driven pipeline visualization (New Lead → Contacted → Quotation Sent → Negotiation → Closed Won).
- Dynamic lead counts per stage and status-colored indicators.

---

## 🛠 Tech Stack

**Frontend:**
- React.js & Vite
- Tailwind CSS (v4)
- React Router DOM
- Axios & React Hot Toast
- Recharts

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Google Gen AI SDK (`@google/genai`)

---

## 📁 Architecture & Structure

The codebase is strictly separated into a modular `client` and `server` architecture. 

```
GrowthDesk/
├── client/
│   ├── src/
│   │   ├── components/   # Reusable UI elements & charts
│   │   ├── layouts/      # Main sidebar layout wrapper
│   │   ├── pages/        # Route-level components (Dashboard, Leads, AIAssistant, etc.)
│   │   ├── services/     # Centralized api.js instance
│   │   └── App.jsx       # Routing configuration
│
├── server/
│   ├── controllers/      # Business logic (auth, leads, dashboard, ai)
│   ├── middleware/       # JWT verification
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express route definitions
│   └── server.js         # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/javawithaaryan/GrowthDesk.git
cd GrowthDesk
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```
Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```
Run the frontend:
```bash
npm run dev
```

---

## 🔮 Future Improvements

While this version is stable and complete for its scope, future updates could include:
- Drag-and-drop interactions for the Pipeline board.
- Role-based access control (Admin vs. Sales Rep).
- Automated email integrations (e.g., SendGrid/Nodemailer).
- Exportable CSV/PDF reports.

---

*Designed and developed by Aryan as a comprehensive MERN stack showcase.*
