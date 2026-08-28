import React from "react";
import { Button } from "./ui";

export interface EmptyStateProps {
  title?: string;
  message?: string;
  onClearFilters?: () => void;
  onAddContact?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No se encontraron contactos",
  message = "Intenta cambiar los términos de búsqueda o los filtros por departamento seleccionados.",
  onClearFilters,
  onAddContact,
}) => {
  return (
    <div className=" rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto my-2">
      {/* Icon illustration */}
      <div className="w-16 h-16 rounded-full flex items-center justify-center text-[#2462EC] mb-1">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          />
        </svg>
      </div>

      <h3 className="text-xl font-bold font-['Gotham',_sans-serif] text-[#1a2035]">
        {title}
      </h3>
      <p className="text-sm text-[#828d9e] max-w-sm font-['Segoe_UI',_sans-serif]">
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {onClearFilters && (
          <Button variant="secondary" onClick={onClearFilters}>
            Limpiar Filtros
          </Button>
        )}
        {onAddContact && (
          <Button variant="primary" onClick={onAddContact}>
            Agregar Nuevo Contacto
          </Button>
        )}
      </div>
    </div>
  );
};
