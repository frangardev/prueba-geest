import React from 'react';
import { Contact, Department } from '../types';
import { Button } from './ui';

export interface ContactCardProps {
  contact: Contact;
  onDelete: (id: string) => void;
}

// Department badge color mapper based on Figma palette
const departmentBadgeStyles: Record<Department, string> = {
  Ventas: 'bg-[#cbeefd] text-[#2462ec] border-[#2462ec]/30',
  Desarrollo: 'bg-[#1f9334]/15 text-[#1f9334] border-[#1f9334]/30',
  Marketing: 'bg-[#dfd23f]/20 text-[#857908] border-[#dfd23f]/40',
  Soporte: 'bg-[#df3f46]/15 text-[#df3f46] border-[#df3f46]/30',
};

// Generate initials for avatar
const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#828d9e]/20 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group text-left">
      <div className="space-y-4">
        {/* Header: Avatar, Name & Department */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-full bg-[#2462ec] text-white font-['Gotham',_sans-serif] font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
              {getInitials(contact.name)}
            </div>
            <div className="min-w-0">
              <h3 className="font-['Gotham',_sans-serif] font-bold text-[16px] text-[#1a2035] truncate leading-tight group-hover:text-[#2462ec] transition-colors">
                {contact.name}
              </h3>
              <p className="text-[12px] text-[#828d9e] font-['Segoe_UI',_sans-serif] truncate">
                ID: {contact.id.slice(0, 8)}
              </p>
            </div>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[12px] font-medium border font-['Segoe_UI',_sans-serif] shrink-0 ${
              departmentBadgeStyles[contact.department] || 'bg-[#f6f5f5] text-[#828d9e]'
            }`}
          >
            {contact.department}
          </span>
        </div>

        {/* Contact Info (Email & Phone) */}
        <div className="space-y-2 pt-1 font-['Segoe_UI',_sans-serif] text-sm text-[#48505e]">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <svg className="w-4 h-4 text-[#828d9e] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <svg className="w-4 h-4 text-[#828d9e] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Card Action Footer */}
      <div className="pt-4 mt-4 border-t border-[#f6f5f5] flex justify-end">
        <Button
          variant="ghost"
          onClick={() => onDelete(contact.id)}
          className="text-[#df3f46] hover:bg-[#df3f46]/10 hover:text-[#df3f46] text-xs py-1 px-3 border-transparent"
          icon={
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          }
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};
