<div align="center">
  <img src="https://via.placeholder.com/150x150/000000/FFFFFF?text=GrowthDesk" alt="GrowthDesk Logo" width="120" height="120" />
  <h1>GrowthDesk CRM</h1>
  <p><b>The AI-enhanced CRM built for modern B2B and manufacturing sales teams.</b></p>
  
  [![Frontend Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://growth-desk-phi.vercel.app)
  [![Backend API](https://img.shields.io/badge/Render-Live-46E3B7?style=for-the-badge&logo=render)](https://growthdesk-backend.onrender.com)
  [![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-v4.3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
  [![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-8E75B2?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
</div>

<br />

## 📖 The Story Behind GrowthDesk

Most CRMs feel like glorified spreadsheets. We built **GrowthDesk** because we noticed manufacturing and B2B sales teams were spending more time updating their pipelines than actually talking to clients. 

GrowthDesk isn't just another dashboard. It's a proactive workspace. We integrated **Google's Gemini AI** deeply into the workflow to help sales reps draft follow-ups, synthesize client history, and suggest negotiation tactics—all without leaving the pipeline view. It feels alive, it's fast, and it respects the user's time.

## ✨ Core Features

GrowthDesk provides a focused, zero-bloat experience tailored to closing deals.

### 🎯 Sales Overview & Pipeline
- **Kanban-style Pipeline**: Drag-and-drop your leads across intuitive stages (Contacted, Quotation Sent, Negotiation, Closed Won).
- **Activity Timeline**: A realistic, real-time feed of what your sales team is doing. 
- **Team Collaboration**: Visibility into who is online, assigned reps, and quick deal assignments.

### 🤖 Sales AI Workspace (Gemini Powered)
- **Contextual Drafting**: Generate highly specific cold outreach or follow-up emails based on lead status.
- **Negotiation Tactics**: Get AI-driven advice on handling objections and discount requests.
- **Tone Control**: Seamlessly switch between professional, friendly, or urgent tones to match the client's vibe.

### 📊 Performance Insights
- **Revenue Analytics**: Track your Monthly Recurring Revenue (MRR) and conversion rates using beautifully integrated Recharts.
- **One-Click Exports**: Export your pipeline to CSV or generate a formatted PDF of your performance reports instantly.
- **Dark Mode**: A meticulously crafted, premium dark theme that saves your eyes during late-night pipeline reviews.

## 📸 Screenshots

| Sales Overview | Sales AI Workspace |
| :---: | :---: |
| <img src="https://via.placeholder.com/500x300/000000/FFFFFF?text=Sales+Overview+Dashboard" alt="Dashboard" /> | <img src="https://via.placeholder.com/500x300/000000/FFFFFF?text=Sales+AI+Workspace" alt="AI Workspace" /> |

| Visual Pipeline | Performance Insights |
| :---: | :---: |
| <img src="https://via.placeholder.com/500x300/000000/FFFFFF?text=Pipeline+Kanban" alt="Pipeline" /> | <img src="https://via.placeholder.com/500x300/000000/FFFFFF?text=Analytics+%26+Reports" alt="Reports" /> |

## 🛠️ Architecture & Tech Stack

GrowthDesk is built on the robust MERN stack, heavily optimized for modern React patterns.

**Frontend:**
- `React 19` (Vite)
- `Tailwind CSS v4` for utility-first styling and native dark mode.
- `Recharts` for performant, responsive data visualization.
- `jsPDF` & `html2canvas` for client-side reporting.

**Backend:**
- `Node.js` & `Express.js`
- `MongoDB` with `Mongoose` ORM
- `JWT` for secure, stateless authentication.
- `@google/genai` for the AI workspace integration.

### Folder Structure
```text
growthdesk/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (Timeline, Team, Charts)
│   │   ├── context/        # Global state (ThemeContext)
│   │   ├── layouts/        # Main layouts (Sidebar, Nav)
│   │   ├── pages/          # Routable views (Pipeline, Leads, Settings)
│   │   └── services/       # Axios API interceptors
├── server/                 # Node/Express backend
│   ├── controllers/        # Route logic (Auth, Leads, AI)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoint definitions
│   └── middleware/         # JWT verification & Error handling
```

## 🚀 Local Setup

Want to run GrowthDesk locally? It takes less than 5 minutes.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/GrowthDesk.git
   cd GrowthDesk
   ```

2. **Setup the Backend:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_key
   ```
   Run the backend:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend:**
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

## 🔮 Future Improvements
While GrowthDesk is production-ready, we have exciting features on the roadmap:
- **Email Inbox Sync:** Two-way sync with Gmail/Outlook to track client replies directly in the timeline.
- **Webhooks:** Trigger external events in Zapier when a lead moves to "Closed Won".
- **Advanced RBAC:** Deeper Role-Based Access Control enforcing read/write permissions at the API level.

---
*Built with passion by the GrowthDesk Team.*
