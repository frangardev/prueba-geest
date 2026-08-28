import React from 'react';
import { Contact } from '../types';
import { Button } from './ui';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  contact: Contact;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  contact,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
    >
      <div
        className="bg-white w-full max-w-sm rounded-2xl shadow-xl border border-[#828d9e]/20 overflow-hidden text-left transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start gap-4">
          {/* Warning Icon */}
          <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#df3f46]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>

          <div>
            <h2
              id="confirm-delete-title"
              className="text-base font-bold font-['Gotham',_sans-serif] text-[#1a2035]"
            >
              Eliminar contacto
            </h2>
            <p className="mt-1 text-sm text-[#48505e] font-['Segoe_UI',_sans-serif]">
              ¿Estás seguro de eliminar a{' '}
              <span className="font-semibold text-[#1a2035]">{contact.name}</span>? Esta
              acción no se puede deshacer.
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 pb-5 flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onCancel} type="button">
            Cancelar
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#df3f46] hover:bg-[#c73039] text-white text-sm font-semibold font-['Segoe_UI',_sans-serif] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#df3f46]/50"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
