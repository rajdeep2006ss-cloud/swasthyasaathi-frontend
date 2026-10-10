import React from 'react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="w-full bg-[#060e20]/90 backdrop-blur-md border-t border-white/5 py-4 px-4 md:px-8 mt-auto text-xs text-[#958ea0]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <div className="flex items-center gap-1.5 text-[#4fdbc8]">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            <span>DISHA &amp; HIPAA Certified</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#4cd7f6]">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>256-bit Biometric Vault Encryption</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#cbc3d7]">
            <span className="material-symbols-outlined text-[14px]">gavel</span>
            <span>Ayushman Bharat Digital Mission (ABDM) Partner</span>
          </div>
        </div>

        <p className="text-[11px] text-[#958ea0] max-w-xl leading-relaxed">
          {language === 'hi'
            ? 'वैधानिक सूचना: स्वास्थ्यसाथी AI केवल चिकित्सीय निर्णय समर्थन और ट्राइएज संश्लेषण प्रदान करता है। यह तीव्र जीवन-धमकाने वाली स्थितियों में पंजीकृत चिकित्सक के निदान का विकल्प नहीं है।'
            : 'Statutory Notice: SwasthyaSaathi AI provides clinical decision support and triage synthesis. Not a substitute for registered medical practitioner diagnosis in acute life-threatening situations.'}
        </p>
      </div>
    </footer>
  );
};
