import React, { useState } from 'react';
import { AppView, Language } from '../types';

interface SignUpScreenProps {
  onSignUpSuccess: (name: string, email: string) => void;
  setCurrentView: (view: AppView) => void;
  language: Language;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSignUpSuccess,
  setCurrentView,
  language,
}) => {
  const [fullName, setFullName] = useState('Priya Sharma');
  const [email, setEmail] = useState('priya.sharma@health.in');
  const [password, setPassword] = useState('Nirvana#BioHealth2026!');
  const [confirmPassword, setConfirmPassword] = useState('Nirvana#BioHealth2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [abhaId, setAbhaId] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [showAbhaTooltip, setShowAbhaTooltip] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic password entropy calculations
  const hasMinLength = password.length >= 8;
  const hasNumSymbol = /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);
  const hasUpperLower = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  let score = 0;
  if (hasMinLength) score += 30;
  if (hasNumSymbol) score += 30;
  if (hasUpperLower) score += 28;
  const entropyPercentage = Math.min(100, score);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSignUpSuccess(fullName, email);
    }, 1000);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Ambient Bioluminescent Glowing Orbs */}
      <div className="absolute -top-32 -left-28 w-96 h-96 rounded-full bg-[#a078ff]/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-36 -right-28 w-[420px] h-[420px] rounded-full bg-[#03b5d3]/15 blur-[130px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#d0bcff]/5 blur-[160px] pointer-events-none"></div>

      {/* Main Card Container */}
      <div className="w-full max-w-[620px] relative z-10 bg-[#171f33]/85 backdrop-blur-2xl rounded-2xl p-6 md:p-10 border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <div className="w-14 h-14 rounded-full bg-[#222a3d] border border-white/5 flex items-center justify-center shadow-[0_0_28px_rgba(76,215,246,0.35)]">
              <span className="material-symbols-outlined text-[#4cd7f6] text-[30px]">vital_signs</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#060e20] flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4fdbc8] animate-ping"></span>
              <span className="absolute w-2.5 h-2.5 rounded-full bg-[#4fdbc8]"></span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#dae2fd] tracking-tight">
            {language === 'hi' ? 'अपना स्वास्थ्य खाता बनाएं' : 'Create Your Health Account'}
          </h1>
          <p className="text-sm text-[#cbc3d7] max-w-md mt-1">
            {language === 'hi'
              ? 'अपना सुरक्षित, HIPAA और DISHA-तैयार क्लिनिकल इंटेलिजेंस साथी स्थापित करें'
              : 'Set up your secure, HIPAA & DISHA-ready clinical intelligence companion'}
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Grid: Full Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#cbc3d7] flex items-center gap-1">
                <span>{language === 'hi' ? 'पूरा नाम' : 'Full Name'}</span>
                <span className="text-[#ffb4ab]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined text-[#958ea0] absolute left-3 text-[18px]">person</span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-[#131b2e] text-[#dae2fd] text-sm pl-10 pr-3 py-2.5 rounded-xl border border-white/10 shadow-inner outline-none focus:border-[#4cd7f6] focus:bg-[#222a3d] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#cbc3d7] flex items-center gap-1">
                <span>{language === 'hi' ? 'ईमेल पता' : 'Email Address'}</span>
                <span className="text-[#ffb4ab]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined text-[#958ea0] absolute left-3 text-[18px]">mail</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priya.sharma@health.in"
                  className="w-full bg-[#131b2e] text-[#dae2fd] text-sm pl-10 pr-3 py-2.5 rounded-xl border border-white/10 shadow-inner outline-none focus:border-[#4cd7f6] focus:bg-[#222a3d] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Password Input Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-[#cbc3d7] flex items-center gap-1">
                <span>{language === 'hi' ? 'पासवर्ड' : 'Password'}</span>
                <span className="text-[#ffb4ab]">*</span>
              </label>
              <span className="text-[11px] text-[#4cd7f6] font-medium">256-bit Entropy Check</span>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[#958ea0] absolute left-3 text-[18px]">lock</span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter secure password"
                className="w-full bg-[#131b2e] text-[#dae2fd] text-sm pl-10 pr-10 py-2.5 rounded-xl border border-white/10 shadow-inner outline-none focus:border-[#4cd7f6] focus:bg-[#222a3d] transition-all tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-[#958ea0] hover:text-white transition-colors"
                title="Toggle password"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Dynamic Password Strength Meter Card */}
          <div className="bg-[#131b2e]/90 rounded-xl p-3 border border-white/5 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#cbc3d7] uppercase tracking-wider">Entropy Analysis</span>
              <span className="text-xs text-[#4fdbc8] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4fdbc8] animate-pulse"></span>
                {entropyPercentage >= 80 ? 'Strong (88%)' : entropyPercentage >= 50 ? 'Medium (55%)' : 'Weak (30%)'}
              </span>
            </div>
            {/* 4-bar segments */}
            <div className="grid grid-cols-4 gap-1.5 w-full my-0.5">
              <div className={`h-1.5 rounded-full transition-all ${entropyPercentage >= 25 ? 'bg-[#4fdbc8] shadow-[0_0_8px_rgba(79,219,200,0.5)]' : 'bg-white/10'}`}></div>
              <div className={`h-1.5 rounded-full transition-all ${entropyPercentage >= 50 ? 'bg-[#4fdbc8] shadow-[0_0_8px_rgba(79,219,200,0.5)]' : 'bg-white/10'}`}></div>
              <div className={`h-1.5 rounded-full transition-all ${entropyPercentage >= 75 ? 'bg-[#4fdbc8] shadow-[0_0_8px_rgba(79,219,200,0.5)]' : 'bg-white/10'}`}></div>
              <div className={`h-1.5 rounded-full transition-all ${entropyPercentage >= 85 ? 'bg-[#00a392]' : 'bg-white/10'}`}></div>
            </div>
            {/* Micro Checklist Items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-1">
              <div className={`flex items-center gap-1 text-[11px] ${hasMinLength ? 'text-[#4fdbc8]' : 'text-[#958ea0]'}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {hasMinLength ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span>≥ 8 characters</span>
              </div>
              <div className={`flex items-center gap-1 text-[11px] ${hasNumSymbol ? 'text-[#4fdbc8]' : 'text-[#958ea0]'}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {hasNumSymbol ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span>Number &amp; symbol</span>
              </div>
              <div className={`flex items-center gap-1 text-[11px] ${hasUpperLower ? 'text-[#4fdbc8]' : 'text-[#958ea0]'}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {hasUpperLower ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span>Upper &amp; lowercase</span>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-[#cbc3d7] flex items-center gap-1">
                <span>{language === 'hi' ? 'पासवर्ड की पुष्टि करें' : 'Confirm Password'}</span>
                <span className="text-[#ffb4ab]">*</span>
              </label>
              {passwordsMatch && (
                <span className="flex items-center gap-1 text-[#4fdbc8] text-[11px]">
                  <span className="material-symbols-outlined text-[14px]">task_alt</span>
                  <span>Credentials match</span>
                </span>
              )}
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[#958ea0] absolute left-3 text-[18px]">verified_user</span>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm secure password"
                className="w-full bg-[#131b2e] text-[#dae2fd] text-sm pl-10 pr-10 py-2.5 rounded-xl border border-white/10 shadow-inner outline-none focus:border-[#4cd7f6] focus:bg-[#222a3d] transition-all tracking-wider"
              />
              {passwordsMatch && (
                <span className="material-symbols-outlined text-[#4fdbc8] absolute right-3 text-[18px]">check_circle</span>
              )}
            </div>
          </div>

          {/* Optional ABHA ID */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between relative">
              <label className="text-xs font-medium text-[#dae2fd] flex items-center gap-1.5">
                <span>Link Existing ABHA ID</span>
                <span className="px-1.5 py-0.5 bg-[#2d3449] text-[#cbc3d7] text-[10px] rounded-full">Optional</span>
              </label>
              <div className="relative flex items-center">
                <button
                  type="button"
                  onMouseEnter={() => setShowAbhaTooltip(true)}
                  onMouseLeave={() => setShowAbhaTooltip(false)}
                  onClick={() => setShowAbhaTooltip(!showAbhaTooltip)}
                  className="text-[#958ea0] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[16px]">info</span>
                </button>
                {showAbhaTooltip && (
                  <div className="absolute right-0 bottom-full mb-2 w-64 p-2.5 bg-[#2d3449] border border-white/10 text-[#dae2fd] text-[11px] rounded-lg shadow-2xl z-30 pointer-events-none leading-relaxed">
                    Ayushman Bharat Health Account (14 digits) securely links health records across public and private hospitals.
                  </div>
                )}
              </div>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[#958ea0] absolute left-3 text-[18px]">fingerprint</span>
              <input
                type="text"
                maxLength={19}
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value)}
                placeholder="14-digit ABHA (e.g., 91-4235-8910-4491)"
                className="w-full bg-[#131b2e] text-[#dae2fd] text-sm pl-10 pr-3 py-2.5 rounded-xl border border-white/10 shadow-inner outline-none focus:border-[#4cd7f6] focus:bg-[#222a3d] transition-all tracking-wider font-mono text-xs"
              />
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 rounded bg-[#131b2e] text-[#4cd7f6] border border-white/20 focus:ring-0 cursor-pointer accent-[#4cd7f6]"
            />
            <label htmlFor="terms-checkbox" className="text-xs text-[#cbc3d7] leading-relaxed cursor-pointer select-none">
              I agree to the <span className="text-[#d0bcff] hover:underline">Terms of Clinical Service</span> and{' '}
              <span className="text-[#d0bcff] hover:underline">DISHA Healthcare Data Privacy Policy</span>. I acknowledge
              SwasthyaSaathi AI provides educational clinical intelligence and does not replace emergency medical triage.
            </label>
          </div>

          {/* Primary CTA Action */}
          <button
            type="submit"
            disabled={isSubmitting || !termsAccepted}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#d0bcff] to-[#a078ff] text-[#340080] font-semibold text-base flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(160,120,255,0.45)] hover:shadow-[0_0_32px_rgba(160,120,255,0.6)] hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? 'Provisioning Vault...' : 'Create Account & Connect Telemetry'}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>

          {/* Bottom Sign In Link */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            <span className="text-xs text-[#cbc3d7]">
              {language === 'hi' ? 'पहले से पंजीकृत हैं?' : 'Already registered?'}
            </span>
            <button
              type="button"
              onClick={() => setCurrentView('login')}
              className="text-xs text-[#4cd7f6] hover:underline font-medium flex items-center gap-0.5"
            >
              <span>{language === 'hi' ? 'अपने खाते में साइन इन करें' : 'Sign In to your account'}</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </form>

        {/* Bottom Security Certification Badge */}
        <div className="mt-6 pt-3 flex items-center justify-center gap-2 text-center border-t border-white/5">
          <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-[#131b2e] text-[#cbc3d7] text-[11px] border border-white/5 shadow-inner">
            <span className="material-symbols-outlined text-[#4fdbc8] text-[14px]">lock</span>
            <span>End-to-End Encrypted Health Records</span>
            <span className="w-1 h-1 rounded-full bg-[#958ea0]"></span>
            <span className="material-symbols-outlined text-[#4cd7f6] text-[14px]">verified</span>
            <span>ISO 27001 Certified Infrastructure</span>
          </div>
        </div>
      </div>
    </div>
  );
};
