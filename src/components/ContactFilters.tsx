import React from 'react';
import { FilterDepartment, Department } from '../types';
import { Chip } from './ui';

export interface ContactFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDepartment: FilterDepartment;
  onDepartmentChange: (department: FilterDepartment) => void;
  filteredCount: number;
  totalCount: number;
  onClearFilters: () => void;
}

const DEPARTMENTS: Department[] = ['Ventas', 'Desarrollo', 'Marketing', 'Soporte'];

// Representative icons for each department
const departmentIcons: Record<Department, React.ReactNode> = {
  Ventas: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Desarrollo: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  Marketing: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
      />
    </svg>
  ),
  Soporte: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
};

export const ContactFilters: React.FC<ContactFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  filteredCount,
  totalCount,
  onClearFilters,
}) => {
  const isFiltered = searchQuery.trim() !== '' || selectedDepartment !== 'Todos';

  return (
    <div className="space-y-4 text-left font-['Segoe_UI',_sans-serif]">
      {/* Search Bar Section with Label above */}
      <div>
        <label htmlFor="search-contact-input" className="block text-sm font-semibold text-gray-700 mb-1">
          Busca el contacto por su nombre o correo
        </label>
        <div className="flex items-center gap-2 w-full">
          {/* Search Input occupying all available width */}
          <div className="relative w-full flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              id="search-contact-input"
              type="text"
              aria-label="Buscar contacto por nombre o correo"
              placeholder="Buscar contacto por nombre o email..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 bg-gray-100/60 border border-transparent rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-[#2462ec] focus:ring-2 focus:ring-[#2462ec]/20"
            />
          </div>

          {/* Clear Filters Trash Button (only when filters are active) */}
          {isFiltered && (
            <button
              type="button"
              onClick={onClearFilters}
              className="p-3 rounded-lg hover:bg-red-50 hover:text-red-600 border border-gray-200 text-gray-500 transition-colors cursor-pointer shrink-0 outline-none"
              title="Limpiar filtros"
              aria-label="Limpiar filtros"
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
          )}
        </div>
      </div>

      {/* Filters Row & Results Counter Capsule */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        {/* Left-aligned Filter Chips Group */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Label "Filtros:" */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 tracking-wide uppercase mr-1 select-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filtros:</span>
          </div>

          {/* "Ver todo" option with Chip aesthetic (Black bg & white text when active) */}
          <button
            type="button"
            onClick={() => onDepartmentChange('Todos')}
            className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full font-['Segoe_UI',_system-ui,_sans-serif] text-[13px] leading-snug transition-all duration-200 select-none cursor-pointer active:scale-95 outline-none ${
              selectedDepartment === 'Todos'
                ? 'bg-black text-white font-semibold border border-black shadow-xs'
                : 'bg-white text-gray-600 font-normal border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Ver todo
          </button>

          {/* Department Chips with icons */}
          {DEPARTMENTS.map((dept) => {
            const isActive = selectedDepartment === dept;
            return (
              <Chip
                key={dept}
                active={isActive}
                icon={departmentIcons[dept]}
                onClick={() => onDepartmentChange(dept)}
                onClose={isActive ? () => onDepartmentChange('Todos') : undefined}
              >
                {dept}
              </Chip>
            );
          })}
        </div>

        {/* Right-aligned Results Counter Capsule */}
        <div className="ml-auto shrink-0">
          <span className="text-xs font-semibold text-gray-600 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-2xs">
            {filteredCount === totalCount
              ? `${totalCount} contactos`
              : `Mostrando ${filteredCount} de ${totalCount} contactos`}
          </span>
        </div>
      </div>
    </div>
  );
};
