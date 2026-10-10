# 🩺 SwasthyaSaathi AI — Frontend

**Making healthcare information more accessible, understandable, and inclusive through AI.**

SwasthyaSaathi AI is a healthcare education application designed to help users access understandable health information through an interactive interface. This repository contains the frontend, built with React and TypeScript, and connected to a separately deployed FastAPI backend.

🌐 **Live Application:** https://swasthyasaathi-frontend.vercel.app

---

## ✨ Features

- **AI Health Assistant:** Ask health-related questions and receive educational information through the backend API.
- **Multilingual Accessibility:** Designed to support English, Hindi, and Kannada, subject to backend capabilities.
- **Simple Health Information:** Helps make health education easier to understand.
- **API Integration:** Connects to the FastAPI backend for health-topic searches and related functionality.
- **Responsive Interface:** Built for convenient interaction across supported screen sizes.
- **Privacy-Conscious Design:** Intended to support responsible handling of health-related queries.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type-safe frontend development |
| Vite | Development server and production builds |
| CSS | Styling and visual presentation |
| Fetch API | Communication with the backend |
| Vercel | Frontend hosting and deployment |
| FastAPI | Backend API, maintained in a separate repository |

## 🏗️ Application Architecture

```text
User
  │
  ▼
React + TypeScript Frontend
  │
  │ HTTPS API Request
  ▼
FastAPI Backend on Render
  │
  ▼
Health Information Processing
  │
  ▼
API Response to Frontend
```

## 🚀 Live Deployment

- **Frontend:** https://swasthyasaathi-frontend.vercel.app
- **Backend Health Check:** https://swasthyasaathi-ai.onrender.com/health

The frontend and backend are deployed independently. The frontend uses the `VITE_API_BASE_URL` environment variable to identify the backend API.

## 💻 Run Locally

### Prerequisites

- Node.js and npm
- Git
- Access to the SwasthyaSaathi AI backend, locally or through its deployed API

### 1. Clone the repository

```bash
git clone https://github.com/rajdeep2006ss-cloud/swasthyasaathi-frontend.git
cd swasthyasaathi-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend URL

Create a `.env` file in the frontend project root:

```env
VITE_API_BASE_URL=https://swasthyasaathi-ai.onrender.com
```

For local backend development, use the local API address instead:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Keep `.env` files containing private credentials out of version control. The backend URL itself is not a secret.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal, usually `http://localhost:5173`.

### 5. Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## ⚙️ Environment Configuration

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the FastAPI backend |

For Vercel, configure `VITE_API_BASE_URL` under **Project Settings → Environment Variables** and redeploy after changing it.

## 🔗 Backend Repository

The backend is maintained separately:

https://github.com/rajdeep2006ss-cloud/swasthyasaathi-ai

It provides the API endpoints used by the frontend, including health-topic search and doctor-preparation functionality.

## 🩺 Responsible Use

SwasthyaSaathi AI is intended for **health education and information**, not as a replacement for professional medical advice, diagnosis, or treatment.

- Seek qualified medical care for personal health concerns.
- For emergencies, contact your local emergency services.
- Do not submit unnecessary personal or sensitive medical information.

## 🔮 Future Improvements

Potential areas for future development include:

- Expanded multilingual health education.
- Improved accessibility and responsive design.
- Additional interactive educational resources.
- Further usability and API error-handling improvements.
- Expanded automated frontend testing.

## 👨‍💻 Author

**Rajdeep Singh**

Electronics and Communication Engineering student interested in software development, AI/ML, and technology for social impact.

## 📄 License

Add a license file if you intend to distribute this project under an open-source license. Until then, no particular open-source license is implied.
