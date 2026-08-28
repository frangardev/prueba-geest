import { useState, useEffect, useMemo } from 'react';
import initialContactsData from './data.json';
import { Contact, FilterDepartment } from './types';
import { Button } from './components/ui';
import { ContactFilters } from './components/ContactFilters';
import { ContactList } from './components/ContactList';
import { ContactSkeleton } from './components/ContactSkeleton';
import { AddContactModal } from './components/AddContactModal';

export function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<FilterDepartment>('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Load initial contacts with simulated 1-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts(initialContactsData as Contact[]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show temporary notification toast
  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handler to add a new contact
  const handleAddContact = (newContact: Contact) => {
    setContacts((prev) => [newContact, ...prev]);
    showToast(`Contacto "${newContact.name}" agregado con éxito`);
  };

  // Handler to delete a contact
  const handleDeleteContact = (id: string) => {
    const contactToDelete = contacts.find((c) => c.id === id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if (contactToDelete) {
      showToast(`Contacto "${contactToDelete.name}" eliminado`);
    }
  };

  // Clear filters handler
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('Todos');
  };

  // Real-time combined filtering (Name/Email AND Department)
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
    <div className="min-h-screen bg-[#f6f5f5] text-[#48505e] font-['Segoe_UI',_sans-serif] p-4 sm:p-8 md:p-12">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1a2035] text-white px-5 py-3 rounded-xl shadow-lg border border-[#828d9e]/30 flex items-center gap-3 animate-slideUp font-['Gotham',_sans-serif] text-sm">
          <svg className="w-5 h-5 text-[#1f9334]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>{notification}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top App Bar / Header */}
        <header className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#828d9e]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2462ec] text-white flex items-center justify-center shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-['Gotham',_sans-serif] text-[#1a2035]">
                Gestor de Contactos
              </h1>
            </div>
            <p className="text-sm text-[#828d9e] pl-0.5">
              Administración centralizada de contactos y departamentos
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Agregar Contacto
            </Button>
          </div>
        </header>

        {/* Real-time Combined Filters */}
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

        {/* Main Content Area: Skeleton Loading or Contact Grid */}
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

      {/* Add Contact Modal Portal */}
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddContact={handleAddContact}
      />
    </div>
  );
}

export default App;
