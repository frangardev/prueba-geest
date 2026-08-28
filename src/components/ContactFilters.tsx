import React from 'react';
import { FilterDepartment } from '../types';
import { Input, Chip, Button } from './ui';

export interface ContactFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDepartment: FilterDepartment;
  onDepartmentChange: (department: FilterDepartment) => void;
  filteredCount: number;
  totalCount: number;
  onClearFilters: () => void;
}

const DEPARTMENTS: FilterDepartment[] = ['Todos', 'Ventas', 'Desarrollo', 'Marketing', 'Soporte'];

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
    <div className="bg-white rounded-2xl p-6 border border-[#828d9e]/20 shadow-sm space-y-5 text-left">
      {/* Top row: Search input & Results counter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="w-full md:max-w-md">
          <Input
            placeholder="Buscar contacto por nombre o email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={
              <svg className="w-4 h-4 text-[#828d9e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 text-xs sm:text-sm">
          <span className="bg-[#f6f5f5] text-[#48505e] px-3.5 py-1.5 rounded-full font-['Segoe_UI',_sans-serif] font-semibold border border-[#828d9e]/20 shrink-0">
            {filteredCount === totalCount
              ? `${totalCount} contactos`
              : `Mostrando ${filteredCount} de ${totalCount} contactos`}
          </span>

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              className="text-xs py-1.5 px-3 text-[#df3f46] hover:bg-[#df3f46]/10 border-transparent shrink-0"
            >
              Limpiar Filtros
            </Button>
          )}
        </div>
      </div>

      {/* Bottom row: Department Chips */}
      <div className="pt-3 border-t border-[#f6f5f5] space-y-2">
        <label className="text-xs font-bold font-['Gotham',_sans-serif] text-[#828d9e] tracking-wider uppercase block">
          Filtrar por Departamento
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {DEPARTMENTS.map((dept) => {
            const isActive = selectedDepartment === dept;
            return (
              <Chip
                key={dept}
                active={isActive}
                onClick={() => onDepartmentChange(dept)}
                onClose={isActive && dept !== 'Todos' ? () => onDepartmentChange('Todos') : undefined}
              >
                {dept}
              </Chip>
            );
          })}
        </div>
      </div>
    </div>
  );
};
