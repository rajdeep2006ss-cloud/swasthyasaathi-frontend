import React from 'react';
import { AppView, Language } from '../types';

interface HeaderProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenIntegrationGuide: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  language,
  setLanguage,
  onOpenIntegrationGuide,
  isAuthenticated,
  onLogout,
}) => {
  return (
    <header className="w-full bg-[#060e20]/85 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <button
          onClick={() => setCurrentView(isAuthenticated ? 'overview' : 'login')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d0bcff] to-[#4cd7f6] flex items-center justify-center shadow-[0_0_20px_-2px_rgba(208,188,255,0.4)] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[#060e20] text-[22px]">neurology</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-lg text-[#dae2fd] tracking-tight">SwasthyaSaathi</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#d0bcff]/15 text-[#d0bcff] text-[10px] font-semibold uppercase tracking-wider">
                AI
              </span>
            </div>
            <span className="text-[11px] text-[#958ea0] tracking-wide">Clinical Intelligence Engine</span>
          </div>
        </button>

        {/* Center / Right Control Cluster */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Quick View Switcher Pill (Helper for seamless screen inspection) */}
          <div className="hidden lg:flex items-center bg-[#131b2e] border border-white/5 rounded-lg p-1 text-xs">
            <button
              onClick={() => setCurrentView('login')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                currentView === 'login' ? 'bg-[#222a3d] text-[#4cd7f6] font-medium' : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentView('signup')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                currentView === 'signup' ? 'bg-[#222a3d] text-[#4cd7f6] font-medium' : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setCurrentView('recovery')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                currentView === 'recovery' ? 'bg-[#222a3d] text-[#4cd7f6] font-medium' : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              Recovery
            </button>
            <button
              onClick={() => setCurrentView('overview')}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                currentView === 'overview' ? 'bg-[#222a3d] text-[#4cd7f6] font-medium' : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              Dashboard
            </button>
          </div>

          {/* Compliance Badges */}
          <div className="hidden xl:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#222a3d]/70 text-[#4fdbc8] text-[11px] font-medium border border-[#4fdbc8]/20">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>ICMR Validated</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#222a3d]/70 text-[#4cd7f6] text-[11px] font-medium border border-[#4cd7f6]/20">
              <span className="material-symbols-outlined text-[14px]">local_hospital</span>
              <span>NABH Standards</span>
            </div>
          </div>

          {/* Streamlit Python Architecture Integration Button */}
          <button
            onClick={onOpenIntegrationGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#a078ff]/15 hover:bg-[#a078ff]/25 text-[#d0bcff] text-xs font-medium border border-[#a078ff]/30 transition-all shadow-[0_0_12px_rgba(160,120,255,0.15)]"
            title="How to integrate with existing Python Streamlit backend"
          >
            <span className="material-symbols-outlined text-[16px]">code</span>
            <span className="hidden sm:inline">Streamlit Integration</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center p-1 rounded-full bg-[#222a3d] border border-white/5">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                language === 'en'
                  ? 'bg-[#d0bcff] text-[#3c0091] shadow-sm'
                  : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                language === 'hi'
                  ? 'bg-[#d0bcff] text-[#3c0091] shadow-sm'
                  : 'text-[#cbc3d7] hover:text-white'
              }`}
            >
              HI (हिं)
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
