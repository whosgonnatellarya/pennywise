import React from "react";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-xl border border-brand-200/40 bg-white/90 backdrop-blur-sm shadow-card">
          <div className="flex items-center justify-between p-4 border-b border-brand-200/40">
            <h3 className="text-lg font-bold text-brand-700">{title}</h3>
            <button
              className="rounded-full px-3 py-1 text-sm bg-white/80 border border-brand-200 hover:bg-white"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
