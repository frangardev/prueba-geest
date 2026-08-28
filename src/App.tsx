import { useState, useEffect, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import initialContactsData from './data.json';
import { Contact, FilterDepartment } from './types';
import { Button } from './components/ui';

import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { ContactFilters } from './components/ContactFilters';
import { ContactList } from './components/ContactList';
import { ContactSkeleton } from './components/ContactSkeleton';
import { AddContactModal } from './components/AddContactModal';

const LOCAL_STORAGE_KEY = 'geest_contacts';

export function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<FilterDepartment>('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete confirmation modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contactPendingDelete, setContactPendingDelete] = useState<Contact | null>(null);

  // Initial load: Read from localStorage or fallback to data.json with simulated 1-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedContacts) {
          const parsed = JSON.parse(savedContacts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setContacts(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error('Error al leer de localStorage:', error);
      }
      
      // Fallback to data.json if localStorage is empty or invalid
      setContacts(initialContactsData as Contact[]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Sync contacts array to localStorage whenever contacts state changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts, isLoading]);

  // Add contact handler with floating toast notification
  const handleAddContact = (newContact: Contact) => {
    setContacts((prev) => [newContact, ...prev]);
    toast.success('Contacto agregado con éxito');
  };

  // Delete contact - now opens confirmation modal
  const handleDeleteContact = (id: string) => {
    const contact = contacts.find((c) => c.id === id) || null;
    setContactPendingDelete(contact);
    setDeleteModalOpen(true);
  };

  const confirmDeleteContact = () => {
    if (contactPendingDelete) {
      const id = contactPendingDelete.id;
      const name = contactPendingDelete.name;
      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast.error(`Contacto "${name}" eliminado`);
    }
    setDeleteModalOpen(false);
    setContactPendingDelete(null);
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('Todos');
  };

  // Real-time combined filtering
  const filteredContacts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return contacts.filter((contact) => {
      const matchesText =
        query === '' ||
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query);
      const matchesDept =
        selectedDepartment === 'Todos' || contact.department === selectedDepartment;
      return matchesText && matchesDept;
    });
  }, [contacts, searchQuery, selectedDepartment]);

  const isFiltered = searchQuery.trim() !== '' || selectedDepartment !== 'Todos';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 font-['Segoe_UI',_sans-serif]">
      {/* Sonner Floating Toast Notifications */}
      <Toaster position="bottom-right" richColors />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        {/* Modern Clean Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left pb-2">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-['Gotham',_sans-serif] text-gray-900 tracking-tight leading-tight">
              Gestor de <span className="text-[#2462ec]">Contactos</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-['Segoe_UI',_sans-serif]">
              Administración centralizada de contactos y departamentos
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl shadow-xs self-start sm:self-auto"
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Crear contacto
          </Button>
        </header>

        {/* Clean Filter Section */}
        <section>
          <ContactFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            filteredCount={filteredContacts.length}
            totalCount={contacts.length}
            onClearFilters={handleClearFilters}
          />
        </section>

        {/* Contact List Grid or Skeleton */}
        <main>
          {isLoading ? (
            <ContactSkeleton />
          ) : (
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={handleDeleteContact}
              onClearFilters={handleClearFilters}
              onAddContact={() => setIsModalOpen(true)}
              isFiltered={isFiltered}
            />
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && contactPendingDelete && (
        <ConfirmDeleteModal
          isOpen={deleteModalOpen}
          contact={contactPendingDelete}
          onCancel={() => {
            setDeleteModalOpen(false);
            setContactPendingDelete(null);
          }}
          onConfirm={confirmDeleteContact}
        />
      )}

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddContact={handleAddContact}
      />
    </div>
  );
}

export default App;
