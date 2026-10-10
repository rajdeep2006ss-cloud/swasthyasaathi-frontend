/**
 * SwasthyaSaathi AI - Clinical Intelligence Frontend
 * Responsive desktop-first web application matching Stitch designs.
 */

import React, { useState } from 'react';
import { AppView, Language } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { LoginScreen } from './components/LoginScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { PasswordRecoveryScreen } from './components/PasswordRecoveryScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { AIHealthAssistantView } from './components/AIHealthAssistantView';
import { DoctorPrepStudioView } from './components/DoctorPrepStudioView';
import { HealthLibraryView } from './components/HealthLibraryView';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { StreamlitIntegrationModal } from './components/StreamlitIntegrationModal';
import { DossierModal } from './components/DossierModal';
import { NotificationToast, ToastMessage } from './components/NotificationToast';

export default function App() {
  // Navigation & Authentication states
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [language, setLanguage] = useState<Language>('en');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  // Modals & Drawers
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isIntegrationOpen, setIsIntegrationOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Accessible Toast Notification System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    title: string,
    message?: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'info'
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Authentication callbacks
  const handleLoginSuccess = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setCurrentView('overview');
    showToast('Signed In', `Welcome back, ${email}`, 'success');
  };

  const handleSignUpSuccess = (name: string, email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setCurrentView('overview');
    showToast('Account Created', `Clinical profile established for ${name}`, 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
    showToast('Logged Out', 'You have been safely signed out of your clinical session.', 'info');
  };

  // Determine if we are rendering an auth view (centered layout without sidebar)
  const isAuthView =
    currentView === 'login' || currentView === 'signup' || currentView === 'recovery';

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1326] text-[#dae2fd] antialiased selection:bg-[#a078ff]/30 selection:text-[#d0bcff]">
      {/* Top Header - Always accessible for brand identity, language switcher, and view exploration */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        language={language}
        setLanguage={setLanguage}
        onOpenIntegrationGuide={() => setIsIntegrationOpen(true)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      {isAuthView ? (
        // Auth Views: Login, Sign Up, Password Recovery (Exact Stitch Recreation)
        <main className="w-full flex-1 flex flex-col items-center justify-center relative">
          {currentView === 'login' && (
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              setCurrentView={setCurrentView}
              language={language}
            />
          )}

          {currentView === 'signup' && (
            <SignUpScreen
              onSignUpSuccess={handleSignUpSuccess}
              setCurrentView={setCurrentView}
              language={language}
            />
          )}

          {currentView === 'recovery' && (
            <PasswordRecoveryScreen
              setCurrentView={setCurrentView}
              language={language}
            />
          )}

          <Footer language={language} />
        </main>
      ) : (
        // Dashboard & Clinic Views: Sidebar + Main Content Layout
        <div className="w-full flex-1 flex relative">
          {/* Left Navigation Sidebar */}
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
            language={language}
            onLogout={handleLogout}
            isOpenMobile={isMobileSidebarOpen}
            setIsOpenMobile={setIsMobileSidebarOpen}
          />

          {/* Main Body Canvas */}
          <div className="w-full lg:pl-72 flex flex-col min-h-[calc(100vh-64px)] transition-all">
            {/* Mobile Sidebar Hamburger Trigger Bar */}
            <div className="lg:hidden px-4 py-3 bg-[#131b2e]/60 border-b border-white/5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="flex items-center gap-2 text-xs font-semibold text-[#4cd7f6] p-2 rounded-xl bg-[#222a3d] border border-white/5 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#4cd7f6]"
                aria-label="Open navigation sidebar"
              >
                <span className="material-symbols-outlined text-[18px]">menu</span>
                <span>Open Navigation Menu</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEmergencyOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#ffb4ab] px-3 py-1.5 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/30 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#ffb4ab]"
                aria-label="Activate Emergency SOS"
              >
                <span className="material-symbols-outlined text-[16px] animate-pulse">emergency</span>
                <span>SOS</span>
              </button>
            </div>

            {/* Viewport Content */}
            <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
              {currentView === 'overview' && (
                <DashboardScreen
                  setCurrentView={setCurrentView}
                  onOpenEmergency={() => setIsEmergencyOpen(true)}
                  language={language}
                  onOpenDossierModal={() => setIsDossierOpen(true)}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'assistant' && (
                <AIHealthAssistantView
                  language={language}
                  onTriggerEmergency={() => setIsEmergencyOpen(true)}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'doctor-prep' && (
                <DoctorPrepStudioView
                  language={language}
                  onShowToast={showToast}
                />
              )}

              {currentView === 'health-library' && (
                <HealthLibraryView
                  language={language}
                  onShowToast={showToast}
                />
              )}
            </main>

            <Footer language={language} />
          </div>
        </div>
      )}

      {/* Modals */}
      <EmergencySOSModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        language={language}
      />

      <StreamlitIntegrationModal
        isOpen={isIntegrationOpen}
        onClose={() => setIsIntegrationOpen(false)}
      />

      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        onSendAbha={() =>
          showToast(
            'ABHA M1 Dispatched',
            'Pre-consult dossier successfully encrypted and broadcast via ABDM M1 gateway.',
            'success'
          )
        }
      />

      {/* Notification Toast Stack */}
      <NotificationToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
