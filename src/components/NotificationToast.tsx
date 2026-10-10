import React, { useEffect } from 'react';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-[#4fdbc8]/40 shadow-[0_0_20px_rgba(79,219,200,0.25)]';
      case 'warning':
        return 'border-[#ffb4ab]/40 shadow-[0_0_20px_rgba(255,180,171,0.25)]';
      case 'error':
        return 'border-[#ff5449]/40 shadow-[0_0_20px_rgba(255,84,73,0.3)]';
      default:
        return 'border-[#a078ff]/40 shadow-[0_0_20px_rgba(160,120,255,0.25)]';
    }
  };

  const getIconColor = () => {
    switch (toast.type) {
      case 'success':
        return 'text-[#4fdbc8]';
      case 'warning':
        return 'text-[#ffb4ab]';
      case 'error':
        return 'text-[#ff5449]';
      default:
        return 'text-[#d0bcff]';
    }
  };

  return (
    <div
      role="status"
      className={`pointer-events-auto p-4 rounded-2xl bg-[#171f33]/95 backdrop-blur-xl border ${getBorderColor()} text-[#dae2fd] shadow-2xl flex items-start justify-between gap-3 transition-all animate-fadeIn`}
    >
      <div className="flex items-start gap-3">
        <span className={`material-symbols-outlined text-[22px] mt-0.5 ${getIconColor()}`}>
          {getIcon()}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white tracking-tight">{toast.title}</span>
          {toast.message && (
            <span className="text-xs text-[#cbc3d7] mt-0.5 leading-relaxed">{toast.message}</span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="text-[#958ea0] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
