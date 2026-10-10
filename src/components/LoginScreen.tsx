import React, { useState } from 'react';
import { AppView, Language } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  setCurrentView: (view: AppView) => void;
  language: Language;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  setCurrentView,
  language,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberBrowser, setRememberBrowser] = useState(false);
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAbdmModal, setShowAbdmModal] = useState(false);
  const [abdmInput, setAbdmInput] = useState('');
  const [abdmOtp, setAbdmOtp] = useState('');
  const [abdmOtpSent, setAbdmOtpSent] = useState(false);

  const handleSimulateQuickFill = () => {
    setEmail('dr.radha.sharma@aiims.gov.in');
    setPassword('VaultProtected#2025');
    setRememberBrowser(true);
    setShowErrorBanner(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowErrorBanner(false);

    // Realistic authentication flow simulation
    setTimeout(() => {
      setIsLoading(false);
      if (email.includes('error')) {
        setShowErrorBanner(true);
      } else {
        onLoginSuccess(email || 'dr.radha.sharma@aiims.gov.in');
      }
    }, 1200);
  };

  const handleAbdmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!abdmOtpSent) {
      setAbdmOtpSent(true);
    } else {
      setShowAbdmModal(false);
      onLoginSuccess('abha.user.91-4421-8890@abdm.in');
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Bioluminescent Ambient Backdrops */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#a078ff]/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#4cd7f6]/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#222a3d]/40 blur-[160px] pointer-events-none"></div>

      <div className="w-full max-w-xl mx-auto z-10">
        {/* Main Glass Card */}
        <div className="relative rounded-2xl bg-[#171f33]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(160,120,255,0.12)] p-6 md:p-10 overflow-hidden transition-all">
          
          {/* Header Card Section */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl bg-[#222a3d] border border-white/5 flex items-center justify-center shadow-[0_0_24px_rgba(76,215,246,0.35)]">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[26px]">shield_with_heart</span>
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#d0bcff] to-[#4cd7f6] opacity-30 blur-sm pointer-events-none"></div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg text-[#dae2fd]">SwasthyaSaathi</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#4cd7f6]/15 text-[#4cd7f6] text-[10px] font-semibold uppercase tracking-wider">
                    v2.4
                  </span>
                </div>
                <span className="text-xs text-[#958ea0]">Neural Triage &amp; Diagnostics</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#060e20]/80 text-[#4cd7f6] text-xs shadow-inner border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#4fdbc8] animate-pulse"></span>
              <span>ABDM &amp; ABHA Integrated Vault</span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#dae2fd] tracking-tight mb-1.5">
              {language === 'hi' ? 'पुनः स्वागत है' : 'Welcome Back'}
            </h1>
            <p className="text-sm text-[#cbc3d7]">
              {language === 'hi'
                ? 'अपने क्लिनिकल डॉसियर और स्वास्थ्य टेलीमेट्री तक पहुँचने के लिए साइन इन करें।'
                : 'Sign in to access your clinical prep dossiers and personalized health telemetry.'}
            </p>
          </div>

          {/* Error Banner Simulation */}
          {showErrorBanner && (
            <div className="mb-4 rounded-xl bg-[#93000a]/40 border border-[#ffb4ab]/30 p-3 flex items-start justify-between shadow-[0_0_16px_rgba(239,68,68,0.25)] transition-all">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#ffb4ab] text-[20px] mt-0.5">error</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#ffb4ab]">Authentication Synchrony Fault</span>
                  <span className="text-xs text-[#ffdad6]">
                    Invalid credentials. Ensure your registered email is verified with ABHA.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowErrorBanner(false)}
                className="text-[#ffb4ab] hover:text-white p-1 transition-colors"
                title="Dismiss"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#cbc3d7] mb-1.5">
                {language === 'hi' ? 'पंजीकृत ईमेल / आयुष्मान आईडी' : 'Registered Email / Ayushman ID'}
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#958ea0] group-focus-within:text-[#4cd7f6] text-[20px] transition-colors">
                  alternate_email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#060e20]/90 text-[#dae2fd] text-sm pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#4cd7f6] focus:border-transparent transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-[#cbc3d7]">
                  {language === 'hi' ? 'क्लिनिकल वॉल्ट पासवर्ड' : 'Clinical Vault Password'}
                </label>
                <button
                  type="button"
                  onClick={() => setCurrentView('recovery')}
                  className="text-xs text-[#d0bcff] hover:text-white hover:underline transition-all"
                >
                  {language === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot password?'}
                </button>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#958ea0] group-focus-within:text-[#4cd7f6] text-[20px] transition-colors">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#060e20]/90 text-[#dae2fd] text-sm pl-11 pr-11 py-3 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#4cd7f6] focus:border-transparent transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#958ea0] hover:text-[#dae2fd] transition-colors"
                  title="Toggle password visibility"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberBrowser}
                  onChange={(e) => setRememberBrowser(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 rounded bg-[#060e20] peer-checked:bg-[#4cd7f6] border border-white/20 peer-checked:border-[#4cd7f6] flex items-center justify-center transition-all shadow-inner">
                  <span className="material-symbols-outlined text-[#060e20] text-[16px] font-bold opacity-0 peer-checked:opacity-100 transition-opacity">
                    check
                  </span>
                </div>
                <span className="text-xs text-[#cbc3d7] peer-checked:text-[#dae2fd] transition-colors">
                  {language === 'hi' ? 'इस ब्राउज़र को 30 दिनों के लिए याद रखें' : 'Remember this browser for 30 days'}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#a078ff] via-[#d0bcff] to-[#6d3bd7] text-[#340080] font-semibold text-base flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(160,120,255,0.4)] hover:shadow-[0_0_36px_rgba(160,120,255,0.6)] active:scale-[0.99] transition-all overflow-hidden group disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
              <span>
                {isLoading
                  ? 'Verifying ABDM Signature...'
                  : language === 'hi'
                  ? 'स्वास्थ्यसाथी में साइन इन करें'
                  : 'Sign In to SwasthyaSaathi'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
            </button>

            {/* Helper Action Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2 text-xs text-[#958ea0]">
              <button
                type="button"
                onClick={() => setShowErrorBanner(!showErrorBanner)}
                className="hover:text-[#4cd7f6] flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">science</span>
                <span>Simulate Error Preview</span>
              </button>
              <span className="text-[#494454]">•</span>
              <button
                type="button"
                onClick={handleSimulateQuickFill}
                className="hover:text-[#d0bcff] flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">magic_button</span>
                <span>Demo Autofill</span>
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full h-px bg-[#2d3449]"></div>
            <span className="absolute bg-[#171f33] px-3 text-[11px] uppercase tracking-wider text-[#958ea0]">
              Or verify with ABDM credentials
            </span>
          </div>

          {/* ABDM Button */}
          <div>
            <button
              type="button"
              onClick={() => setShowAbdmModal(true)}
              className="w-full py-3 px-4 rounded-xl bg-[#222a3d]/70 hover:bg-[#222a3d] text-[#4cd7f6] text-sm font-medium border border-[#4cd7f6]/20 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_0_20px_rgba(76,215,246,0.2)] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">fingerprint</span>
              <span>Authenticate with Aadhaar OTP / ABHA Number</span>
            </button>
          </div>

          {/* Bottom Link */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#cbc3d7]">
              {language === 'hi' ? 'क्या आपके पास खाता नहीं है?' : "Don't have a SwasthyaSaathi clinical account?"}{' '}
              <button
                type="button"
                onClick={() => setCurrentView('signup')}
                className="text-[#4cd7f6] hover:text-[#acedff] hover:underline font-semibold transition-all ml-1"
              >
                {language === 'hi' ? 'खाता बनाएं' : 'Create Account'}
              </button>
            </p>
          </div>
        </div>

        {/* Security & Prototype Notices */}
        <div className="mt-6 flex flex-col items-center justify-center text-center gap-2 px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-[#cbc3d7]">
            <div className="flex items-center gap-1.5 text-[#4fdbc8]">
              <span className="material-symbols-outlined text-[14px]">encrypted</span>
              <span>256-bit AES Clinical Encryption</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#4cd7f6]">
              <span className="material-symbols-outlined text-[14px]">policy</span>
              <span>DISHA &amp; ICMR Compliant</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#d0bcff]">
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              <span>Prototype UI for Python Streamlit Architecture</span>
            </div>
          </div>
          <p className="text-[11px] text-[#958ea0]">
            UI Simulation: No real clinical health records are stored on this interface.
          </p>
        </div>
      </div>

      {/* ABDM OTP Modal */}
      {showAbdmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-[#171f33] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setShowAbdmModal(false);
                setAbdmOtpSent(false);
              }}
              className="absolute right-4 top-4 text-[#958ea0] hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#222a3d] text-[#4cd7f6] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">fingerprint</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">ABDM Gateway Verification</h3>
                <p className="text-xs text-[#958ea0]">Ayushman Bharat Digital Mission</p>
              </div>
            </div>

            <form onSubmit={handleAbdmSubmit} className="space-y-4">
              {!abdmOtpSent ? (
                <div>
                  <label className="block text-xs font-medium text-[#cbc3d7] mb-1.5">
                    14-digit ABHA ID or Linked Aadhaar Number
                  </label>
                  <input
                    type="text"
                    required
                    value={abdmInput}
                    onChange={(e) => setAbdmInput(e.target.value)}
                    placeholder="91-4421-8890-1234"
                    className="w-full bg-[#060e20] text-white text-sm px-3.5 py-2.5 rounded-xl border border-white/10 focus:ring-2 focus:ring-[#4cd7f6] focus:outline-none"
                  />
                  <p className="text-[11px] text-[#958ea0] mt-1.5">
                    A 6-digit OTP will be dispatched to your UIDAI registered mobile number.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="p-3 rounded-lg bg-[#4fdbc8]/10 border border-[#4fdbc8]/20 text-xs text-[#4fdbc8] mb-3">
                    OTP dispatched to mobile linked with {abdmInput || '91-4421-8890-1234'} (Simulation Code: 123456)
                  </div>
                  <label className="block text-xs font-medium text-[#cbc3d7] mb-1.5">Enter 6-digit OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={abdmOtp}
                    onChange={(e) => setAbdmOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-[#060e20] text-white text-center text-lg tracking-widest px-3.5 py-2.5 rounded-xl border border-white/10 focus:ring-2 focus:ring-[#4cd7f6] focus:outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#4cd7f6] to-[#03b5d3] text-[#003640] font-semibold text-sm hover:brightness-105 transition-all shadow-md"
              >
                {!abdmOtpSent ? 'Send Aadhaar OTP' : 'Verify & Enter Clinical Vault'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
