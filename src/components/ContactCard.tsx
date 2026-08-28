import React from 'react';
import { Contact, Department } from '../types';

export interface ContactCardProps {
  contact: Contact;
  onDelete: (id: string) => void;
}

// Department color styling matching Figma node 129:2488
const departmentStyles: Record<
  Department,
  {
    pastelBg: string;
    circleBg: string;
    initialsColor: string;
    chipBg: string;
    chipText: string;
  }
> = {
  Ventas: {
    pastelBg: 'bg-[#e6eeff]',
    circleBg: 'bg-[#bcc6e7]',
    initialsColor: 'text-[#5475e0]',
    chipBg: 'bg-[#cbeefd]',
    chipText: 'text-[#2462ec]',
  },
  Desarrollo: {
    pastelBg: 'bg-[#e6f9ed]',
    circleBg: 'bg-[#b8e8ca]',
    initialsColor: 'text-[#1f9334]',
    chipBg: 'bg-[#e6f9ed]',
    chipText: 'text-[#1f9334]',
  },
  Marketing: {
    pastelBg: 'bg-[#fef9e7]',
    circleBg: 'bg-[#fce59e]',
    initialsColor: 'text-[#857908]',
    chipBg: 'bg-[#fef9e7]',
    chipText: 'text-[#857908]',
  },
  Soporte: {
    pastelBg: 'bg-[#fde8e8]',
    circleBg: 'bg-[#f8b1b1]',
    initialsColor: 'text-[#df3f46]',
    chipBg: 'bg-[#fde8e8]',
    chipText: 'text-[#df3f46]',
  },
};

// Generate initials for avatar (e.g. "Carlos López" -> "C.L." or "C.M.")
const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}.${parts[1][0]}.`.toUpperCase();
  }
  return `${name.slice(0, 2).toUpperCase()}.`;
};

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete }) => {
  const style = departmentStyles[contact.department] || departmentStyles.Ventas;

  return (
    <div className="bg-[#f6f5f5] rounded-[9px] border border-[#828d9e]/20 overflow-hidden shadow-xs flex flex-row items-stretch transition-all duration-200 hover:shadow-md relative text-left min-h-[141px] group">
      {/* Left Pastel Color Block with Initials Circle */}
      <div className={`w-[103px] shrink-0 ${style.pastelBg} p-3 flex items-center justify-center rounded-l-[8px] transition-colors`}>
        <div className={`w-[59px] h-[59px] rounded-full ${style.circleBg} flex items-center justify-center shadow-2xs`}>
          <span className={`font-['Gotham',_'Figtree',_sans-serif] font-bold text-[18px] tracking-tight ${style.initialsColor}`}>
            {getInitials(contact.name)}
          </span>
        </div>
      </div>

      {/* Right Ultra-Soft Gray Information Area */}
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0 pr-9">
        {/* Top Row: Name and Department Chip */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-['Gotham',_sans-serif] font-bold text-[16px] text-[#48505e] truncate leading-tight group-hover:text-[#2462ec] transition-colors">
              {contact.name}
            </h3>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[14px] text-[11px] font-['Segoe_UI',_sans-serif] font-medium shrink-0 ${style.chipBg} ${style.chipText}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
            {contact.department}
          </span>
        </div>

        {/* Bottom Details: Email & Phone */}
        <div className="space-y-1 pt-2 font-['Gotham',_sans-serif] font-bold text-[11px] text-[#828d9e]">
          <div className="flex items-center gap-2 truncate">
            <svg className="w-3.5 h-3.5 text-[#828d9e] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-[#2462ec] hover:underline truncate transition-colors"
            >
              {contact.email}
            </a>
          </div>

          <div className="flex items-center gap-2 truncate">
            <svg className="w-3.5 h-3.5 text-[#828d9e] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a href={`tel:${contact.phone}`} className="hover:text-[#2462ec] transition-colors">
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Discrete Top Right Trash Icon Button */}
      <button
        type="button"
        onClick={() => onDelete(contact.id)}
        className="absolute top-3 right-3 text-[#828d9e] hover:text-[#df3f46] hover:bg-[#df3f46]/10 p-1.5 rounded-lg transition-colors cursor-pointer outline-none"
        title="Eliminar contacto"
        aria-label="Eliminar contacto"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};
