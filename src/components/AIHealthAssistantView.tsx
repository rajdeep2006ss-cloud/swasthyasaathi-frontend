import React, { useState } from 'react';
import { ClinicalMessage, Language } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000';


interface AIHealthAssistantViewProps {
  language: Language;
  onTriggerEmergency: () => void;
  onShowToast?: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const AIHealthAssistantView: React.FC<AIHealthAssistantViewProps> = ({
  language,
  onTriggerEmergency,
  onShowToast,
}) => {
  
const [messages, setMessages] = useState<ClinicalMessage[]>([
  {
    id: 'welcome',
    sender: 'assistant',
    content:
      language === 'hi'
        ? 'नमस्ते! मैं स्वास्थ्य संबंधी शैक्षिक जानकारी और डॉक्टर से पूछने के लिए प्रश्न तैयार करने में सहायता कर सकता हूँ।'
        : 'Welcome to SwasthyaSaathi AI. Ask about a health topic in our curated educational library. This tool does not diagnose conditions or replace a healthcare professional.',
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
]);


  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<'triage' | 'medication' | 'nutrition'>('triage');

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onShowToast?.('Message Copied', 'Clinical response copied to clipboard.', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'assistant',
        content:
          language === 'hi'
            ? 'बातचीत रीसेट कर दी गई है। आप किस स्वास्थ्य विषय पर चर्चा करना चाहते हैं?'
            : 'Conversation history reset. What health inquiry or symptom would you like to explore?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        icdCode: 'ICMR Reference Protocol',
      },
    ]);
    onShowToast?.('Conversation Reset', 'Clinical triage dialogue history has been cleared.', 'info');
  };

  
const handleSendMessage = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();

  const userText = inputVal.trim();
  if (!userText || isTyping) return;

  const isEmergency =
    /chest pain|heart attack|difficulty breathing|shortness of breath|breathless|fainting|stroke|seizure|loss of consciousness|सीने में दर्द|बेहोशी|सांस फूलना|ಉಸಿರಾಟದ ತೊಂದರೆ/i.test(
      userText
    );

  const now = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const userMessage: ClinicalMessage = {
    id: Date.now().toString(),
    sender: 'user',
    content: userText,
    timestamp: now,
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputVal('');
  setIsTyping(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/health/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: userText,
        language,
        reading_level: 'simple',
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed (${response.status})`);
    }

    const data = await response.json();

    let reply = '';

    if (data.is_emergency) {
      const emergency = data.emergency_data;
      reply = emergency?.message
        ? `${emergency.title ?? 'Emergency warning'}\n\n${emergency.message}\n\n${emergency.action ?? 'Seek urgent medical help.'}`
        : 'Your message may describe a medical emergency. Contact local emergency services immediately or go to the nearest emergency department.';
    } else if (data.matched && data.content) {
      reply = `${data.title ?? 'Health information'}\n\n${data.content}`;

      if (Array.isArray(data.questions_for_doctor) && data.questions_for_doctor.length) {
        reply += '\n\nQuestions to discuss with a healthcare professional:\n';
        reply += data.questions_for_doctor.map((q: string) => `• ${q}`).join('\n');
      }

      if (Array.isArray(data.sources) && data.sources.length) {
        reply += '\n\nReferences:\n';
        reply += data.sources
          .map((source: { name?: string; url?: string }) =>
            `${source.name ?? 'Reference'}${source.url ? ` — ${source.url}` : ''}`
          )
          .join('\n');
      }
    } else {
      reply =
        data.message ??
        'I could not find a matching topic in the curated health library. Please try a supported topic or consult a qualified healthcare professional.';
    }

    const assistantMessage: ClinicalMessage = {
      id: `${Date.now()}-reply`,
      sender: 'assistant',
      content: reply,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      ...(data.is_emergency ? { isEmergencyAlert: true } : {}),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    if (data.is_emergency || isEmergency) {
      onTriggerEmergency();
    }
  } catch (error) {
    console.error('Health API error:', error);

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-error`,
        sender: 'assistant',
        content:
          'I could not connect to the health information service. Please check that the Python API is running. If you may be experiencing an emergency, do not wait for this app—contact local emergency services.',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);

    onShowToast?.(
      'API connection failed',
      'Check that the Python backend is running on port 8000.',
      'error'
    );
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 pb-12">
      {/* Top Header Card */}
      <div className="p-5 rounded-2xl bg-[#131b2e] border border-white/5 flex items-center justify-between flex-wrap gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#a078ff]/20 text-[#d0bcff] flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-[26px]">psychology</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#dae2fd]">
                {language === 'hi' ? 'AI स्वास्थ्य सहायक' : 'AI Health Assistant'}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#4fdbc8]/15 text-[#4fdbc8] text-[10px] font-semibold">
                Bio-Saathi v3.4 Active
              </span>
            </div>
            <p className="text-xs text-[#958ea0]">
              ICMR &amp; NABH-aligned diagnostic reasoning engine (Direct integration with Python `assistant.py`)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#060e20] p-1 rounded-xl border border-white/5 text-xs">
            <button
              onClick={() => setActiveMode('triage')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeMode === 'triage' ? 'bg-[#a078ff] text-[#340080] font-semibold' : 'text-[#958ea0] hover:text-white'
              }`}
            >
              Triage
            </button>
            <button
              onClick={() => setActiveMode('medication')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeMode === 'medication' ? 'bg-[#4cd7f6] text-[#003640] font-semibold' : 'text-[#958ea0] hover:text-white'
              }`}
            >
              Rx Safety
            </button>
            <button
              onClick={() => setActiveMode('nutrition')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                activeMode === 'nutrition' ? 'bg-[#4fdbc8] text-[#003731] font-semibold' : 'text-[#958ea0] hover:text-white'
              }`}
            >
              Nutrition
            </button>
          </div>

          <button
            onClick={handleClearHistory}
            className="p-2 rounded-xl bg-[#222a3d] text-[#958ea0] hover:text-[#ffb4ab] border border-white/5 transition-colors"
            title="Clear Chat History"
          >
            <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
          </button>
        </div>
      </div>

      {/* Statutory Disclaimer Strip */}
      <div className="px-4 py-2 rounded-xl bg-[#131b2e]/60 border border-white/5 text-[11px] text-[#958ea0] flex items-center justify-between flex-wrap gap-2">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#4fdbc8] text-[15px]">info</span>
          Educational Simulation: Grounded in ICMR reference clinical protocols. Not a substitute for medical diagnosis.
        </span>
        <span className="text-[#4cd7f6] font-mono">Backend Interface: Python assistant.py</span>
      </div>

      {/* Chat Messages Container */}
      <div className="rounded-2xl bg-[#171f33]/80 border border-white/5 p-4 md:p-6 shadow-xl flex flex-col h-[520px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] md:max-w-[75%] ${isUser ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div
                className={`p-4 rounded-2xl shadow-md text-sm leading-relaxed whitespace-pre-line relative group ${
                  isUser
                    ? 'bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white rounded-br-none'
                    : msg.isEmergencyAlert
                    ? 'bg-[#93000a]/50 border border-[#ffb4ab] text-[#ffdad6] rounded-bl-none shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                    : 'bg-[#131b2e] border border-white/5 text-[#dae2fd] rounded-bl-none'
                }`}
              >
                {msg.content}

                {/* Micro copy button */}
                <button
                  type="button"
                  onClick={() => handleCopyMessage(msg.id, msg.content)}
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-[#060e20]/60 text-[#958ea0] hover:text-white transition-opacity"
                  title="Copy message"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedId === msg.id ? 'check' : 'content_copy'}
                  </span>
                </button>

                {msg.icdCode && (
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#4cd7f6] font-mono">
                    <span>{msg.icdCode}</span>
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-[#958ea0] mt-1 px-1">{msg.timestamp}</span>
            </div>
          );
        })}

        {isTyping && (
          <div className="mr-auto flex items-center gap-2 p-3 rounded-2xl bg-[#131b2e] border border-white/5 text-xs text-[#cbc3d7]">
            <span className="w-2 h-2 rounded-full bg-[#a078ff] animate-ping"></span>
            <span>Bio-Saathi engine synthesizing clinical decision support...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Starters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[#958ea0] shrink-0 text-[11px] uppercase tracking-wider">Quick Inquiries:</span>
        {[
          'Can I take Metformin with coconut water?',
          'How does Bajra roti help reduce post-meal spikes?',
          'What are danger signs in high dengue fever?',
          'सीने में भारीपन के चेतावनी संकेत क्या हैं?',
        ].map((prompt, i) => (
          <button
            key={i}
            onClick={() => {
              setInputVal(prompt);
            }}
            className="px-3 py-1.5 rounded-full bg-[#131b2e] hover:bg-[#222a3d] text-[#cbc3d7] hover:text-white border border-white/5 whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'लक्षण या दवा के बारे में पूछें (उदा. मेटफॉर्मिन साइड इफेक्ट्स)...'
                : 'Ask clinical or medication questions in English or हिंदी...'
            }
            className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-[#131b2e] text-[#dae2fd] placeholder:text-[#958ea0] text-sm border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#a078ff] shadow-inner"
          />
          <button
            type="button"
            onClick={() => setInputVal('Dengue platelet count lower threshold for hospitalization?')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#958ea0] hover:text-[#4cd7f6]"
            title="Auto-fill sample"
          >
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          </button>
        </div>

        <button
          type="submit"
          className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-semibold text-sm flex items-center gap-2 hover:brightness-110 shadow-lg active:scale-95 transition-all"
        >
          <span>Send</span>
          <span className="material-symbols-outlined text-[18px]">send</span>
        </button>
      </form>
    </div>
  );
};
