import React from 'react';
import { Contact } from '../types';
import { ContactCard } from './ContactCard';
import { EmptyState } from './EmptyState';

export interface ContactListProps {
  contacts: Contact[];
  onDeleteContact: (id: string) => void;
  onClearFilters?: () => void;
  onAddContact?: () => void;
  isFiltered?: boolean;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onDeleteContact,
  onClearFilters,
  onAddContact,
  isFiltered = false,
}) => {
  if (contacts.length === 0) {
    return (
      <EmptyState
        title={isFiltered ? 'Sin resultados para la búsqueda' : 'No hay contactos registrados'}
        message={
          isFiltered
            ? 'Ningún contacto coincide con los filtros aplicados (nombre o departamento).'
            : 'Tu lista de contactos está vacía. ¡Agrega tu primer contacto!'
        }
        onClearFilters={isFiltered ? onClearFilters : undefined}
        onAddContact={onAddContact}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} onDelete={onDeleteContact} />
      ))}
    </div>
  );
};
