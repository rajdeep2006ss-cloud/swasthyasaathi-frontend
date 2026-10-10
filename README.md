<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d9ef3f64-edc1-420f-8dd1-2395e9516e3f

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
# SwasthyaSaathi AI 🩺

**Accessible Healthcare Education | React + TypeScript + Python**

SwasthyaSaathi AI is a healthcare education project designed to make health information easier to access and understand. It combines a modern React frontend with a Python API and a curated health knowledge base to support educational health queries, doctor-visit preparation, and emergency awareness.

> **Important:** This application provides educational information only. It does not diagnose diseases, prescribe treatment, or replace a qualified healthcare professional.

## ✨ Features

- **AI Health Assistant:** Submit health-related questions and retrieve educational information from the project's curated knowledge base.
- **Multilingual interface:** Supports English and Hindi in the current frontend; the Python knowledge base also supports Kannada.
- **Reading-level support:** Designed to make health information more accessible.
- **Doctor Preparation Studio:** Helps users prepare questions to discuss with a healthcare professional.
- **Health Library:** Provides access to educational health topics.
- **Emergency Awareness:** Identifies configured emergency warning signs and encourages users to seek urgent help when appropriate.
- **Interactive Dashboard:** Presents health-education information through a modern interface.
- **Responsive UI:** Built with React, TypeScript, and CSS.
- **Python API:** Connects the frontend to the backend's health-information search functionality.

## 🛠️ Technology Stack

### Frontend
- React
- TypeScript
- Vite
- CSS
- Recharts

### Backend
- Python
- FastAPI
- Uvicorn
- Curated health knowledge base

## 📁 Project Structure

The project is maintained as two separate folders:

```text
swasthyasaathi-frontend/
├── src/
│   ├── components/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── public/
├── package.json
├── package-lock.json
├── .env.example
└── README.md

swasthyasaathi-ai/
├── api.py
├── app.py
├── assistant.py
├── knowledge_base.py
├── requirements.txt
├── test_app.py
└── README.md
```

*The exact files may vary as the project develops.*

## ⚙️ Prerequisites

Install the following before running the project:

- Node.js and npm
- Python 3
- pip

## 🚀 Run Locally

### 1. Start the Python backend

Open a terminal and run:

```powershell
cd C:\Users\user\swasthyasaathi-ai
python -m pip install -r requirements.txt
python -m uvicorn api:app --reload --host 127.0.0.1 --port 8000
```

Keep this terminal open.

Verify that the API is running by opening:

`http://127.0.0.1:8000/health`

The expected response is similar to:

```json
{
  "status": "ok",
  "service": "SwasthyaSaathi AI API"
}
```

### 2. Start the React frontend

Open a second terminal:

```powershell
cd C:\Users\user\Downloads\swasthyasaathi-frontend
npm install
npm run dev
```

Vite will display the local URL. Open that URL in your browser. If port 3000 is already occupied, Vite may use another port, such as 3001.

### 3. Verify the connection

With the backend and frontend running:

1. Open the frontend in your browser.
2. Navigate to **AI Health Assistant**.
3. Ask an educational question, such as `What is diabetes?`.
4. Confirm that the answer comes from the Python API rather than a hard-coded frontend response.

The frontend's API base URL and the backend's CORS configuration must match the local ports and origins being used.

## 🧪 Testing

From the Python backend directory, run:

```powershell
cd C:\Users\user\swasthyasaathi-ai
python -m pytest test_app.py -v
```

To check the frontend production build:

```powershell
cd C:\Users\user\Downloads\swasthyasaathi-frontend
npm run build
```

## 🔒 Privacy and Safety

- Do not submit passwords, personal identification numbers, or unnecessary personal health information.
- Health information is educational and should be reviewed with a qualified healthcare professional.
- Emergency symptoms require appropriate urgent medical attention; do not delay seeking help to use this application.
- Use fictional data for demonstrations and testing.
- Review authentication, data handling, API security, and deployment configuration before making the application publicly accessible.

## 🗺️ Roadmap

Potential future improvements include:

- Additional language support and translation review.
- Improved accessibility and mobile layouts.
- Expanded, medically reviewed educational resources.
- More comprehensive automated tests.
- Secure authentication and privacy-conscious account management.
- Production deployment of the frontend and Python backend.

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome. For substantial changes, create a branch, explain the proposed improvement, and include relevant tests.

## 📄 License

No license has been specified yet. Add a `LICENSE` file before declaring the project open source under a particular license.

---

**SwasthyaSaathi AI — Making healthcare education more accessible.**