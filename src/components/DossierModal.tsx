import React from 'react';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendAbha: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  isOpen,
  onClose,
  onSendAbha,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#171f33] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto space-y-4">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-[#958ea0] hover:text-white p-1 rounded-full bg-[#222a3d]/60"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#d0bcff]/20 text-[#d0bcff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[26px]">assignment_turned_in</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Pre-Consult Clinician Dossier Summary</h3>
            <p className="text-xs text-[#958ea0]">Prepared for Dr. Aarav Patel (Endocrinology) • ABHA M1 Ready</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#131b2e] border border-white/5 space-y-3 text-xs text-[#cbc3d7]">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-white font-medium">Patient: Priya Sharma</span>
            <span className="text-[#4cd7f6] font-mono">ABHA: 91-4421-8890</span>
          </div>

          <div>
            <span className="text-[#4fdbc8] font-bold block mb-1">Key Clinical Synopsis:</span>
            <p className="leading-relaxed">
              Patient exhibits stable glycemic control (14-day fasting mean 96 mg/dL) with blood pressure averaging 120/78 mmHg.
              Current prescriptions (Metformin 500mg BD, Telmisartan 40mg OD) have 93% recorded adherence over the 14-day observation window.
            </p>
          </div>

          <div>
            <span className="text-[#d0bcff] font-bold block mb-1">Flagged Inquiries for Consultation:</span>
            <p className="leading-relaxed">
              1. Evaluate mild postprandial dizziness experienced intermittently after morning dosage.
              <br />
              2. Review continuation of ICMR millet dietary swap in place of refined grains.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#222a3d] text-white text-xs font-semibold hover:bg-[#31394d]"
          >
            Close
          </button>
          <button
            onClick={() => {
              onSendAbha();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#a078ff] text-[#340080] text-xs font-bold hover:bg-[#d0bcff] shadow-md flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
            <span>Dispatch via ABHA M1</span>
          </button>
        </div>
      </div>
    </div>
  );
};
