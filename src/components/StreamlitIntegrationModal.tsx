import React, { useState } from 'react';

interface StreamlitIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StreamlitIntegrationModal: React.FC<StreamlitIntegrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'files' | 'fastapi' | 'component'>('architecture');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#171f33] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-[#958ea0] hover:text-white p-1 rounded-full bg-[#222a3d]/60"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a078ff] to-[#4cd7f6] flex items-center justify-center text-[#060e20] shadow-md">
            <span className="material-symbols-outlined text-[26px]">integration_instructions</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Python Streamlit Integration Architecture
            </h2>
            <p className="text-xs text-[#cbc3d7]">
              How to seamlessly bridge this React desktop frontend with your `app.py`, `assistant.py` &amp; `knowledge_base.py`
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-4 shrink-0 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'architecture'
                ? 'bg-[#a078ff] text-[#340080] font-bold'
                : 'text-[#cbc3d7] hover:text-white bg-[#131b2e]'
            }`}
          >
            1. Architecture Overview
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'files'
                ? 'bg-[#a078ff] text-[#340080] font-bold'
                : 'text-[#cbc3d7] hover:text-white bg-[#131b2e]'
            }`}
          >
            2. Generated Frontend Manifest
          </button>
          <button
            onClick={() => setActiveTab('fastapi')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'fastapi'
                ? 'bg-[#a078ff] text-[#340080] font-bold'
                : 'text-[#cbc3d7] hover:text-white bg-[#131b2e]'
            }`}
          >
            3. REST API Adapter (Recommended)
          </button>
          <button
            onClick={() => setActiveTab('component')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'component'
                ? 'bg-[#a078ff] text-[#340080] font-bold'
                : 'text-[#cbc3d7] hover:text-white bg-[#131b2e]'
            }`}
          >
            4. Streamlit Component Option
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-4 text-xs text-[#cbc3d7] leading-relaxed pr-1">
          {activeTab === 'architecture' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#131b2e] border border-white/5 space-y-2">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">account_tree</span>
                  Clean Separation of Concerns
                </h4>
                <p>
                  As requested, this frontend is 100% standalone, keeping the presentation layer completely decoupled
                  from your core algorithmic logic in Python. It provides the exact futuristic glassmorphism theme,
                  bilingual EN/HI interfaces, triage dashboards, and emergency hooks without touching your Python codebase.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#131b2e] border border-white/5 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#4fdbc8] block">Your Python Backend</span>
                  <ul className="list-disc list-inside space-y-1 text-[#dae2fd]">
                    <li><code>assistant.py</code>: Clinical triage NLP, multi-turn dialog</li>
                    <li><code>knowledge_base.py</code>: Medical protocols, ICD-11, ICMR guidelines</li>
                    <li><code>app.py</code>: Core application orchestration</li>
                    <li><code>test_app.py</code>: Automated regression test suites</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#131b2e] border border-white/5 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#d0bcff] block">New React/Vite Frontend</span>
                  <ul className="list-disc list-inside space-y-1 text-[#dae2fd]">
                    <li>Desktop-first responsive viewports with glassmorphism</li>
                    <li>Login, Sign Up, &amp; Password Recovery matching Stitch designs</li>
                    <li>Clinical Command Hub, vitals graphs, SBAR Doctor Prep</li>
                    <li>Priority 1 Critical Emergency SOS 112/108 dispatch modal</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-3">
              <p className="text-white font-medium">Files and components generated in this build:</p>
              <div className="p-3 rounded-xl bg-[#060e20] font-mono text-[11px] text-[#4cd7f6] space-y-1.5 border border-white/5">
                <div>📁 <strong>src/components/</strong></div>
                <div className="pl-4">├── <code>LoginScreen.tsx</code> — Welcome Back, ABDM vault, quick fill, password toggle</div>
                <div className="pl-4">├── <code>SignUpScreen.tsx</code> — 256-bit entropy meter, checklist, DISHA consent</div>
                <div className="pl-4">├── <code>PasswordRecoveryScreen.tsx</code> — 2-column reset with live dispatch simulation</div>
                <div className="pl-4">├── <code>DashboardScreen.tsx</code> — Clinical Hub, vitals pills, 7-day adherence, alerts</div>
                <div className="pl-4">├── <code>Sidebar.tsx</code> — Nav rail, user profile, Emergency SOS button</div>
                <div className="pl-4">├── <code>Header.tsx</code> — ICMR/NABH compliance badges, bilingual EN/HI switcher</div>
                <div className="pl-4">├── <code>AIHealthAssistantView.tsx</code> — Interactive chat triage aligned with assistant.py</div>
                <div className="pl-4">├── <code>DoctorPrepStudioView.tsx</code> — SBAR consultation brief exporter</div>
                <div className="pl-4">├── <code>HealthLibraryView.tsx</code> — ICMR health guides &amp; nutritional optimization</div>
                <div className="pl-4">├── <code>EmergencySOSModal.tsx</code> — Priority 1 112/108 dispatch &amp; GPS telemetry</div>
                <div className="pl-4">└── <code>StreamlitIntegrationModal.tsx</code> — This integration documentation</div>
              </div>
            </div>
          )}

          {activeTab === 'fastapi' && (
            <div className="space-y-3">
              <p>
                <strong>Recommended Approach:</strong> Wrap your existing <code>assistant.py</code> and{' '}
                <code>knowledge_base.py</code> with 3 lightweight REST endpoints using FastAPI or Flask.
              </p>

              <div className="p-3 rounded-xl bg-[#060e20] text-[11px] font-mono text-[#d0bcff] overflow-x-auto border border-white/5">
                <pre>{`# api_server.py (Runs alongside your existing files)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import assistant        # Your existing assistant.py
import knowledge_base   # Your existing knowledge_base.py

app = FastAPI(title="SwasthyaSaathi Clinical API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryPayload(BaseModel):
    query: str
    language: str = "en"
    patient_id: str = "Priya Sharma"

@app.post("/api/triage")
def handle_triage(data: QueryPayload):
    # Calls your existing assistant logic directly!
    reply = assistant.process_query(data.query, lang=data.language)
    is_emergency = assistant.check_emergency_warning(data.query)
    return {"response": reply, "is_emergency": is_emergency}

@app.get("/api/knowledge")
def get_library(topic: str = "all"):
    # Calls your existing knowledge_base logic!
    return knowledge_base.get_articles(topic)`}</pre>
              </div>
            </div>
          )}

          {activeTab === 'component' && (
            <div className="space-y-3">
              <p>
                <strong>Streamlit Custom Component Option:</strong> If you want to keep running <code>streamlit run app.py</code> as a single command, you can mount this build output as a custom bi-directional Streamlit component:
              </p>

              <div className="p-3 rounded-xl bg-[#060e20] text-[11px] font-mono text-[#4cd7f6] overflow-x-auto border border-white/5">
                <pre>{`# In your existing app.py:
import streamlit as st
import streamlit.components.v1 as components

# Declare component pointing to the built React dist/ or dev server
swasthya_ui = components.declare_component(
    "swasthya_saathi_ui",
    path="./dist" # Or url="http://localhost:3000" for dev
)

# Render the futuristic React desktop UI inside Streamlit
ui_event = swasthya_ui(default={"action": "none"})

if ui_event and ui_event.get("action") == "run_assistant":
    # Process event in your assistant.py
    import assistant
    result = assistant.process_query(ui_event["query"])
    st.session_state["last_response"] = result`}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-[#958ea0] shrink-0">
          <span>SwasthyaSaathi AI Frontend Architecture v2.4</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#a078ff] text-[#340080] font-bold hover:bg-[#d0bcff]"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
