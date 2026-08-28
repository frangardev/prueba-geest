import { useState, useEffect, useMemo } from "react";
import initialContactsData from "./data.json";
import { Contact, FilterDepartment } from "./types";
import { Button } from "./components/ui";
import { ContactFilters } from "./components/ContactFilters";
import { ContactList } from "./components/ContactList";
import { ContactSkeleton } from "./components/ContactSkeleton";
import { AddContactModal } from "./components/AddContactModal";

export function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState<FilterDepartment>("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Simulated 1-second initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts(initialContactsData as Contact[]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show temporary toast message
  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Add contact
  const handleAddContact = (newContact: Contact) => {
    setContacts((prev) => [newContact, ...prev]);
    showToast(`Contacto "${newContact.name}" agregado con éxito`);
  };

  // Delete contact
  const handleDeleteContact = (id: string) => {
    const contactToDelete = contacts.find((c) => c.id === id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if (contactToDelete) {
      showToast(`Contacto "${contactToDelete.name}" eliminado`);
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("Todos");
  };

  // Real-time combined filtering
  const filteredContacts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return contacts.filter((contact) => {
      const matchesText =
        query === "" ||
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query);
      const matchesDept =
        selectedDepartment === "Todos" ||
        contact.department === selectedDepartment;
      return matchesText && matchesDept;
    });
  }, [contacts, searchQuery, selectedDepartment]);

  const isFiltered =
    searchQuery.trim() !== "" || selectedDepartment !== "Todos";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700 font-['Segoe_UI',_sans-serif]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg border border-gray-700 flex items-center gap-3 font-['Gotham',_sans-serif] text-sm animate-fadeIn">
          <svg
            className="w-5 h-5 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{notification}</span>
        </div>
      )}

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
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 4v16m8-8H4"
                />
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
