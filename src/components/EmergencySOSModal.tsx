import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [isAlertTriggered, setIsAlertTriggered] = useState(false);
  const [callActive, setCallActive] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Countdown timer for simulated dispatch
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((c) => (c !== null ? c - 1 : null));
      }, 1000);
    } else if (countdown === 0) {
      setIsAlertTriggered(true);
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen) return null;

  const startDispatchCountdown = (number: string) => {
    setCallActive(number);
    setCountdown(5);
  };

  const handleCancelCountdown = () => {
    setCountdown(null);
    setCallActive(null);
    setIsAlertTriggered(false);
  };

  const helplines = [
    { number: '112', title: 'National Emergency', desc: 'Police, Fire, Ambulance', color: 'border-[#4cd7f6]/40 text-[#4cd7f6]' },
    { number: '108', title: 'Medical Ambulance', desc: 'Free 24x7 Paramedic Response', color: 'border-[#ffb4ab]/40 text-[#ffb4ab]' },
    { number: '104', title: 'State Medical Advice', desc: 'Triage & Blood Bank Directory', color: 'border-[#4fdbc8]/40 text-[#4fdbc8]' },
    { number: '14416', title: 'Tele-MANAS', desc: '24x7 Mental Health Helpline', color: 'border-[#d0bcff]/40 text-[#d0bcff]' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 overflow-y-auto"
    >
      <div className="w-full max-w-xl bg-[#171f33] border-2 border-[#ffb4ab]/60 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(239,68,68,0.5)] relative overflow-hidden focus:outline-none">
        {/* Ambient Red Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#93000a]/40 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Emergency Modal"
          className="absolute right-5 top-5 text-[#958ea0] hover:text-white p-2 rounded-full bg-[#222a3d]/70 transition-colors focus-visible:ring-2 focus-visible:ring-[#ffb4ab]"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-[#93000a] text-white flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.6)]">
            <span className="material-symbols-outlined text-[32px] animate-pulse">emergency</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 id="emergency-modal-title" className="text-xl md:text-2xl font-bold text-[#ffb4ab] tracking-tight">
                {language === 'hi' ? 'आपातकालीन एसओएस प्रेषण' : 'Emergency SOS Dispatch'}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#93000a] text-[#ffdad6] text-[10px] font-bold uppercase tracking-wider animate-pulse">
                Priority 1
              </span>
            </div>
            <p className="text-xs text-[#cbc3d7]">
              National Emergency Gateway • Live GPS Telemetry Broadcast Active
            </p>
          </div>
        </div>

        {/* Countdown Interception State */}
        {countdown !== null && (
          <div className="mb-5 p-4 rounded-2xl bg-[#93000a]/70 border border-[#ffb4ab] text-white space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-[#ffdad6]">
                <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                <span>Initiating Test Dispatch to {callActive} in {countdown}s...</span>
              </div>
              <span className="text-xl font-mono font-bold text-[#ffdad6]">{countdown}</span>
            </div>
            <p className="text-xs text-[#ffdad6]">
              Press Cancel immediately to abort this simulated dispatch test.
            </p>
            <button
              type="button"
              onClick={handleCancelCountdown}
              className="w-full py-2.5 rounded-xl bg-white text-[#93000a] font-bold text-xs hover:bg-slate-200 transition-colors shadow-lg"
            >
              Cancel Simulated Dispatch
            </button>
          </div>
        )}

        {/* Active Dispatch State */}
        {isAlertTriggered && countdown === null && (
          <div className="mb-5 p-4 rounded-2xl bg-[#93000a]/60 border border-[#ffb4ab] text-white space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-[#ffdad6]">
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>DISPATCH SIMULATION ACTIVE: {callActive}</span>
              </div>
              <button
                onClick={handleCancelCountdown}
                className="text-xs underline text-[#ffdad6] hover:text-white"
              >
                Reset
              </button>
            </div>
            <p className="text-xs text-[#ffdad6] leading-relaxed">
              Demonstration broadcast transmitted: Patient ABHA medical summary and GPS telemetry routed to the nearest emergency responder gateway.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-mono">
              <span>Simulated Fleet ETA: ~6-8 minutes</span>
              <span className="text-[#4fdbc8]">Status: En Route (AIIMS Zone)</span>
            </div>
          </div>
        )}

        {/* GPS Telemetry Bar */}
        <div className="mb-5 p-3.5 rounded-xl bg-[#060e20] border border-white/5 text-xs text-[#cbc3d7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">location_on</span>
            <span>Simulated Coordinates: 28.5672° N, 77.2100° E (AIIMS Delhi Trauma Center)</span>
          </div>
          <span className="text-[#4fdbc8] text-[11px] font-mono">ABHA Synced</span>
        </div>

        {/* Emergency Triggers (108 & 112) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <button
            onClick={() => startDispatchCountdown('108 - Medical Ambulance')}
            className="p-4 rounded-2xl bg-gradient-to-br from-[#93000a] to-[#690005] hover:brightness-110 text-white flex flex-col items-center justify-center gap-1.5 shadow-[0_0_24px_rgba(239,68,68,0.4)] border border-[#ffb4ab]/30 active:scale-95 transition-all group focus-visible:ring-2 focus-visible:ring-white"
          >
            <span className="material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform">
              ambulance
            </span>
            <span className="text-base font-bold">Call 108 Ambulance</span>
            <span className="text-[11px] text-[#ffdad6] opacity-90">National Emergency Health Fleet</span>
          </button>

          <button
            onClick={() => startDispatchCountdown('112 - Unified Emergency')}
            className="p-4 rounded-2xl bg-[#222a3d] hover:bg-[#2d3449] border border-white/10 text-white flex flex-col items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all group focus-visible:ring-2 focus-visible:ring-[#4cd7f6]"
          >
            <span className="material-symbols-outlined text-[32px] text-[#4cd7f6] group-hover:scale-110 transition-transform">
              emergency_home
            </span>
            <span className="text-base font-bold">Call 112 Police / Fire</span>
            <span className="text-[11px] text-[#cbc3d7]">All-in-One Integrated Response</span>
          </button>
        </div>

        {/* National Emergency Helplines Directory */}
        <div className="mb-4">
          <span className="text-[10px] uppercase tracking-wider text-[#958ea0] font-semibold block mb-2">
            Verified National Helplines Directory (India)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {helplines.map((line) => (
              <div
                key={line.number}
                className={`p-2.5 rounded-xl bg-[#131b2e] border ${line.color} flex flex-col justify-between`}
              >
                <span className="font-mono font-bold text-base">{line.number}</span>
                <span className="text-[11px] font-semibold text-white mt-0.5">{line.title}</span>
                <span className="text-[9px] text-[#958ea0] line-clamp-1">{line.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ICE - In Case of Emergency Contacts */}
        <div className="rounded-xl bg-[#131b2e] border border-white/5 p-3.5 text-xs space-y-1.5 mb-4">
          <span className="text-[10px] uppercase tracking-wider text-[#958ea0] font-semibold block">
            ICE Registered Emergency Kin Contacts [Demo Profile]
          </span>
          <div className="flex items-center justify-between text-[#dae2fd]">
            <span>Rohit Sharma (Spouse)</span>
            <span className="font-mono text-[#4cd7f6]">+91 98110 44219</span>
          </div>
          <div className="flex items-center justify-between text-[#dae2fd]">
            <span>Dr. Aarav Patel (Primary Physician)</span>
            <span className="font-mono text-[#4fdbc8]">+91 11 2658 8500</span>
          </div>
        </div>

        {/* Acute First-Aid Checklist */}
        <div className="p-3.5 rounded-xl bg-[#060e20] border border-white/5 text-xs text-[#958ea0] space-y-1">
          <span className="font-semibold text-white block">Immediate Life-Support Protocols:</span>
          <p>• If unresponsive and not breathing: Commence Hands-Only CPR at 100-120 compressions/min.</p>
          <p>• If severe bleeding: Apply direct continuous pressure with a sterile or clean cloth.</p>
          <p>• Keep airway clear, loosen tight clothing around neck, and stay on the line with 108/112 dispatchers.</p>
        </div>

        {/* Bottom Dismiss */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#222a3d] hover:bg-[#31394d] text-white text-xs font-semibold focus-visible:ring-2 focus-visible:ring-white transition-colors"
          >
            Close Emergency Panel
          </button>
        </div>
      </div>
    </div>
  );
};
