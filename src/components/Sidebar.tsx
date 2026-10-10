import React from 'react';
import { AppView, Language } from '../types';

interface SidebarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  onOpenEmergency: () => void;
  language: Language;
  onLogout: () => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  onOpenEmergency,
  language,
  onLogout,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const navItems = [
    {
      id: 'overview' as AppView,
      label: language === 'hi' ? 'अवलोकन (Overview)' : 'Overview',
      icon: 'grid_view',
    },
    {
      id: 'assistant' as AppView,
      label: language === 'hi' ? 'AI स्वास्थ्य सहायक' : 'AI Health Assistant',
      icon: 'psychology',
    },
    {
      id: 'doctor-prep' as AppView,
      label: language === 'hi' ? 'डॉक्टर प्रेप स्टूडियो' : 'Doctor Prep Studio',
      icon: 'clinical_notes',
    },
    {
      id: 'health-library' as AppView,
      label: language === 'hi' ? 'स्वास्थ्य पुस्तकालय' : 'Health Library',
      icon: 'menu_book',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-[#131b2e] border-r border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.35)] z-50 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between bg-[#060e20]/60 border-b border-white/5">
            <button
              onClick={() => {
                setCurrentView('overview');
                setIsOpenMobile(false);
              }}
              className="flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d0bcff] to-[#4cd7f6] flex items-center justify-center shadow-[0_0_16px_rgba(208,188,255,0.35)]">
                <span className="material-symbols-outlined text-[#060e20] text-[20px]">neurology</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-[#dae2fd] tracking-tight leading-none">
                  SwasthyaSaathi
                </span>
                <span className="text-[10px] text-[#4cd7f6] tracking-widest uppercase mt-0.5 font-semibold">
                  Clinical AI Core
                </span>
              </div>
            </button>

            {/* Mobile close button */}
            <button
              onClick={() => setIsOpenMobile(false)}
              className="lg:hidden text-[#958ea0] hover:text-white p-1"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Nav Items */}
          <div className="p-4">
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsOpenMobile(false);
                    }}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all group text-left ${
                      isActive
                        ? 'bg-[#a078ff] text-[#340080] font-semibold shadow-[0_0_16px_-2px_rgba(160,120,255,0.4)]'
                        : 'text-[#cbc3d7] hover:bg-[#222a3d] hover:text-[#dae2fd]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                        isActive ? 'text-[#340080]' : 'text-[#958ea0] group-hover:text-[#4cd7f6]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}

              {/* Divider */}
              <div className="my-2 px-2">
                <div className="h-px bg-[#2d3449]"></div>
              </div>

              {/* Emergency SOS Button */}
              <button
                onClick={() => {
                  onOpenEmergency();
                  setIsOpenMobile(false);
                }}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/30 text-[#ffb4ab] hover:bg-[#93000a]/50 hover:text-white transition-all group shadow-[0_0_20px_-2px_rgba(239,68,68,0.35)]"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] animate-pulse text-[#ffb4ab]">
                    e911_emergency
                  </span>
                  <span className="text-sm font-semibold tracking-wide">
                    {language === 'hi' ? 'आपातकालीन एसओएस' : 'Emergency SOS'}
                  </span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab] animate-ping"></span>
              </button>
            </nav>
          </div>
        </div>

        {/* Profile / Account Footer */}
        <div className="p-4 bg-[#060e20]/60 border-t border-white/5">
          <div className="p-3 rounded-xl bg-[#171f33] border border-white/5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#d0bcff] text-[#3c0091] flex items-center justify-center font-bold text-xs shadow-inner">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#dae2fd] leading-tight">Dr. Aarav Patel</span>
                  <span className="text-[10px] text-[#4fdbc8] font-mono">ABHA: 91-4421-8890</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#2d3449]">
              <button
                onClick={() => {
                  setCurrentView('overview');
                  setIsOpenMobile(false);
                }}
                className="text-xs text-[#cbc3d7] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">badge</span>
                Profile
              </button>
              <button
                onClick={onLogout}
                className="text-xs text-[#958ea0] hover:text-[#ffb4ab] flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">logout</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
