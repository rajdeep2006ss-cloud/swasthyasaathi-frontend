import React, { useState, useEffect } from 'react';
import { AppView, Language } from '../types';

interface PasswordRecoveryScreenProps {
  setCurrentView: (view: AppView) => void;
  language: Language;
}

export const PasswordRecoveryScreen: React.FC<PasswordRecoveryScreenProps> = ({
  setCurrentView,
  language,
}) => {
  const [email, setEmail] = useState('priya.sharma@domain.in');
  const [isSent, setIsSent] = useState(true);
  const [countdown, setCountdown] = useState(42);
  const [showOtpOption, setShowOtpOption] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleSendReset = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setCountdown(45);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Subtle Ambient Glow Orbs */}
      <div className="absolute -top-16 left-1/4 w-96 h-96 bg-[#a078ff]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#4cd7f6]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="w-full max-w-5xl mx-auto py-2">
        {/* Breadcrumb & Node Telemetry Line */}
        <div className="flex items-center justify-between mb-6 px-1">
          <button
            onClick={() => setCurrentView('login')}
            className="inline-flex items-center gap-2 text-[#4cd7f6] hover:text-white transition-colors text-sm group"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span>{language === 'hi' ? 'क्लिनिकल पोर्टल लॉगिन पर वापस जाएं' : 'Back to Clinical Portal Login'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#958ea0]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#222a3d] text-[#4fdbc8] border border-[#4fdbc8]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4fdbc8] animate-pulse"></span>
              Zero-Trust Auth Node #82
            </span>
            <span className="hidden sm:inline text-[#494454]">TLS 1.3 / E2EE</span>
          </div>
        </div>

        {/* Main Recovery Stage: Asymmetric 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT PANEL: Active Input Form Card (7 Cols) */}
          <div className="lg:col-span-7 bg-[#171f33]/90 backdrop-blur-2xl rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Glow Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d0bcff] to-transparent opacity-80"></div>

            <div>
              {/* Security Header Emblem */}
              <div className="flex items-start justify-between mb-6">
                <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#222a3d] border border-white/10 shadow-lg">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#4cd7f6]/20 via-[#d0bcff]/10 to-transparent blur-[6px]"></div>
                  <div className="relative z-10 w-10 h-10 rounded-xl bg-[#2d3449] flex items-center justify-center text-[#4cd7f6]">
                    <span className="material-symbols-outlined text-[26px]">lock_reset</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#060e20] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#4fdbc8] text-[14px]">verified</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#060e20] text-[#cbc3d7] text-xs uppercase tracking-wider border border-white/5">
                  Step 1 of 2
                </span>
              </div>

              {/* Typography Heading */}
              <h1 className="text-2xl md:text-3xl font-bold text-[#dae2fd] mb-1.5 tracking-tight">
                {language === 'hi' ? 'अपना पासवर्ड रीसेट करें' : 'Reset Your Password'}
              </h1>
              <p className="text-sm text-[#cbc3d7] mb-6">
                {language === 'hi'
                  ? 'सत्यापित क्लिनिकल रीसेट लिंक प्राप्त करने के लिए अपने खाते से संबद्ध ईमेल दर्ज करें।'
                  : 'Enter the email associated with your SwasthyaSaathi account to receive a verified clinical reset link.'}
              </p>

              {/* Recovery Input Form */}
              <form onSubmit={handleSendReset} className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-[#dae2fd] flex items-center gap-1.5">
                      <span>{language === 'hi' ? 'चिकित्सक / संस्थागत ईमेल' : 'Practitioner / Institutional Email'}</span>
                      <span className="text-[#ffb4ab]">*</span>
                    </label>
                    <span className="text-[11px] text-[#4fdbc8] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">verified_user</span>
                      ABHA / NBE Linked
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[#4cd7f6] text-[20px] pointer-events-none">
                      alternate_email
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priya.sharma@domain.in"
                      className="w-full h-12 pl-11 pr-10 rounded-xl bg-[#060e20]/80 text-[#dae2fd] text-sm border border-white/10 shadow-inner focus:outline-none focus:ring-1 focus:ring-[#d0bcff] transition-all"
                    />
                    <span className="material-symbols-outlined absolute right-3.5 text-[#4fdbc8] text-[18px]">
                      check_circle
                    </span>
                  </div>
                </div>

                {/* Security Callout Banner */}
                <div className="rounded-xl bg-[#060e20]/70 border border-white/5 p-3 flex gap-3 items-start">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-[20px] shrink-0 mt-0.5">info</span>
                  <p className="text-xs text-[#cbc3d7] leading-relaxed">
                    For your safety, password reset links expire after{' '}
                    <span className="text-[#dae2fd] font-medium">15 minutes</span> and require secondary device authorization
                    on your registered mobile terminal.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#a078ff] via-[#6d3bd7] to-[#d0bcff] text-white font-semibold text-base flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.99] transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>{language === 'hi' ? 'रीसेट निर्देश भेजें' : 'Send Reset Instructions'}</span>
                </button>
              </form>
            </div>

            {/* Footer Micro-Metadata */}
            <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-[#958ea0]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">speed</span>
                Avg. Delivery: &lt; 8 seconds
              </span>
              <span className="text-[#cbc3d7] font-mono text-[11px]">Auth Ref: REC-9920-IN</span>
            </div>
          </div>

          {/* RIGHT PANEL: Confirmation / Live Success State Preview (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Interactive Showcase Badge */}
            <div className="bg-[#131b2e]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fdbc8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4fdbc8]"></span>
                </span>
                <span className="text-xs font-medium text-[#dae2fd]">Telemetry State: Live Simulation</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#4fdbc8]/10 text-[#4fdbc8] text-[10px] font-semibold">
                Active Preview
              </span>
            </div>

            {/* Glowing Glassmorphic Success Alert Card */}
            <div className="flex-1 bg-[#222a3d]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-40 h-40 bg-[#4cd7f6]/15 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-[#a078ff]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                {/* Status Indicator */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#4fdbc8]/15 text-[#4fdbc8] shadow-inner">
                    <span className="material-symbols-outlined text-[28px]">check_circle</span>
                    <span className="absolute inset-0 rounded-full bg-[#4fdbc8]/20 animate-ping pointer-events-none"></span>
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2d3449] text-[#4cd7f6] text-[10px] font-semibold uppercase tracking-wider block w-fit mb-0.5">
                      Dispatch Verified
                    </span>
                    <p className="text-xs text-[#cbc3d7]">Server Response 200 OK</p>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-[#dae2fd] mb-1.5 tracking-tight">
                  {language === 'hi' ? 'रीसेट निर्देश भेजे गए!' : 'Reset Instructions Dispatched!'}
                </h2>
                <p className="text-xs text-[#cbc3d7] mb-4 leading-relaxed">
                  We've sent a secure one-time verification link to{' '}
                  <span className="text-[#4cd7f6] font-medium font-mono">
                    {email ? email.replace(/(.{3})(.*)(@.*)/, '$1****$3') : 'priya.sh****@domain.in'}
                  </span>
                  . Check your inbox and spam folder.
                </p>

                {/* Delivery Telemetry Snippet */}
                <div className="bg-[#060e20]/80 border border-white/5 rounded-xl p-3 space-y-2 mb-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#958ea0]">Token Validity Window</span>
                    <span className="text-[#4fdbc8] font-mono font-medium">14:59 remaining</span>
                  </div>
                  <div className="w-full bg-[#171f33] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#4cd7f6] to-[#4fdbc8] h-full w-[96%] rounded-full transition-all"></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#958ea0] pt-0.5">
                    <span>Relay: in-hyd-node-04</span>
                    <span className="text-[#4fdbc8] flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[12px]">done_all</span> Delivered
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  disabled={countdown > 0}
                  onClick={() => setCountdown(45)}
                  className={`w-full h-10 rounded-xl text-xs flex items-center justify-center gap-2 transition-all ${
                    countdown > 0
                      ? 'bg-[#2d3449]/60 text-[#958ea0] cursor-not-allowed'
                      : 'bg-[#2d3449] hover:bg-[#31394d] text-[#4cd7f6] cursor-pointer'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {countdown > 0 ? 'schedule' : 'refresh'}
                  </span>
                  <span>{countdown > 0 ? `Resend Code in ${countdown}s` : 'Resend Clinical Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowOtpOption(!showOtpOption)}
                  className="w-full h-10 rounded-xl bg-[#060e20]/80 hover:bg-[#060e20] text-[#4cd7f6] hover:text-white text-xs flex items-center justify-center gap-2 border border-white/5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">phonelink_ring</span>
                  <span>Didn't receive email? Check alternate mobile OTP</span>
                </button>

                {showOtpOption && (
                  <div className="p-3 rounded-xl bg-[#060e20] border border-[#4cd7f6]/30 text-xs text-[#cbc3d7] space-y-2">
                    <p className="text-[11px]">
                      SMS dispatch linked to UIDAI: +91 98*** ***12. SMS code: <strong className="text-white">883194</strong>.
                    </p>
                    <button
                      onClick={() => setCurrentView('login')}
                      className="w-full py-1.5 rounded-lg bg-[#4cd7f6]/20 text-[#4cd7f6] hover:bg-[#4cd7f6]/30 font-medium"
                    >
                      Authenticate with SMS OTP
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Security Compliance Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#131b2e]/60 border border-white/5 text-xs text-[#958ea0]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4fdbc8] text-[16px]">verified</span>
            <span>DISHA Compliant Recovery Vault • SwasthyaSaathi Security Protocol v3.4</span>
          </div>
          <div className="flex items-center gap-4 text-[#cbc3d7]">
            <button className="hover:text-[#d0bcff] transition-colors">Audit Certificate</button>
            <span className="text-[#494454]">•</span>
            <button className="hover:text-[#d0bcff] transition-colors">NHA Guidelines</button>
            <span className="text-[#494454]">•</span>
            <button className="hover:text-[#d0bcff] transition-colors">Emergency Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};
