import { useState } from 'react';
import { Button, Input, Select, Chip } from './components/ui';

export function App() {
  // State for interactive inputs and form
  const [inputValue, setInputValue] = useState('');
  const [completedInput, setCompletedInput] = useState('Juan Pérez');
  const [errorInput, setErrorInput] = useState('correo@invalido');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedOpt2, setSelectedOpt2] = useState('opt2');
  const [chip1Active, setChip1Active] = useState(false);
  const [chip2Active, setChip2Active] = useState(true);
  const [chip3Active, setChip3Active] = useState(false);

  const selectOptions = [
    { value: 'opt1', label: 'Opción 1' },
    { value: 'opt2', label: 'Opción 2' },
    { value: 'opt3', label: 'Opción 3' },
  ];

  // SVG Icons from Figma Design
  const ChatIcon = () => (
    <svg className="w-4 h-4 currentColor" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
    </svg>
  );

  const PersonIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#f6f5f5] text-[#48505e] font-['Segoe_UI',_sans-serif] p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="bg-white p-8 rounded-2xl shadow-sm border border-[#828d9e]/20 text-left space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2462ec] bg-[#cbeefd] px-3 py-1 rounded-full">
                Design System - Figma
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold font-['Gotham',_sans-serif] text-[#1a2035] mt-2">
                Geest - Componentes Base UI
              </h1>
              <p className="text-[#828d9e] text-sm sm:text-base mt-1">
                Extracción exacta de tokens de diseño, variantes de color y componentes reutilizables desde Figma.
              </p>
            </div>
          </div>

          {/* Color Palette Swatches */}
          <div className="pt-6 border-t border-[#f6f5f5]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#48505e] mb-4 font-['Gotham',_sans-serif]">
              Paleta de Colores Extraída
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {/* Primary */}
              <div className="p-3 bg-[#f6f5f5] rounded-xl text-center space-y-1">
                <div className="h-10 w-full bg-[#2462ec] rounded-lg shadow-inner" />
                <p className="text-xs font-bold text-[#1a2035]">Primary</p>
                <p className="text-[11px] text-[#828d9e]">#2462ec</p>
              </div>
              <div className="p-3 bg-[#f6f5f5] rounded-xl text-center space-y-1">
                <div className="h-10 w-full bg-[#cbeefd] rounded-lg border border-[#828d9e]/20" />
                <p className="text-xs font-bold text-[#1a2035]">Primary Light</p>
                <p className="text-[11px] text-[#828d9e]">#cbeefd</p>
              </div>
              {/* Alerts */}
              <div className="p-3 bg-[#f6f5f5] rounded-xl text-center space-y-1">
                <div className="h-10 w-full bg-[#1f9334] rounded-lg" />
                <p className="text-xs font-bold text-[#1a2035]">Éxito</p>
                <p className="text-[11px] text-[#828d9e]">#1f9334</p>
              </div>
              <div className="p-3 bg-[#f6f5f5] rounded-xl text-center space-y-1">
                <div className="h-10 w-full bg-[#df3f46] rounded-lg" />
                <p className="text-xs font-bold text-[#1a2035]">Error</p>
                <p className="text-[11px] text-[#828d9e]">#df3f46</p>
              </div>
              <div className="p-3 bg-[#f6f5f5] rounded-xl text-center space-y-1">
                <div className="h-10 w-full bg-[#dfd23f] rounded-lg" />
                <p className="text-xs font-bold text-[#1a2035]">Advertencia</p>
                <p className="text-[11px] text-[#828d9e]">#dfd23f</p>
              </div>
              {/* Typography / Fondo */}
              <div className="p-3 bg-[#f6f5f5] rounded-xl text-center space-y-1">
                <div className="h-10 w-full bg-[#1a2035] rounded-lg" />
                <p className="text-xs font-bold text-[#1a2035]">Títulos</p>
                <p className="text-[11px] text-[#828d9e]">#1a2035</p>
              </div>
            </div>
          </div>
        </header>

        {/* Section 1: Buttons */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-[#828d9e]/20 text-left space-y-6">
          <div>
            <h2 className="text-xl font-bold font-['Gotham',_sans-serif] text-[#1a2035]">
              1. Botones (`Button.tsx`)
            </h2>
            <p className="text-sm text-[#828d9e]">
              Variantes: Primary, Secondary, Ghost, con icono y estados hover/foco.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="space-y-1">
              <span className="text-xs text-[#828d9e] block font-semibold">Primary</span>
              <Button variant="primary">Chat</Button>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#828d9e] block font-semibold">Primary + Icon</span>
              <Button variant="primary" icon={<ChatIcon />}>
                Chat
              </Button>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#828d9e] block font-semibold">Secondary</span>
              <Button variant="secondary">Chat</Button>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#828d9e] block font-semibold">Secondary + Icon</span>
              <Button variant="secondary" icon={<ChatIcon />}>
                Chat
              </Button>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#828d9e] block font-semibold">Ghost</span>
              <Button variant="ghost" icon={<ChatIcon />}>
                Chat
              </Button>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#828d9e] block font-semibold">Disabled</span>
              <Button variant="primary" disabled>
                Deshabilitado
              </Button>
            </div>
          </div>
        </section>

        {/* Section 2: Inputs */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-[#828d9e]/20 text-left space-y-6">
          <div>
            <h2 className="text-xl font-bold font-['Gotham',_sans-serif] text-[#1a2035]">
              2. Campos de Texto (`Input.tsx`)
            </h2>
            <p className="text-sm text-[#828d9e]">
              Variantes del lienzos de Figma: Default, Con Icono, Completado (`#f6f5f5`), Error (`#df3f46`).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Input Default */}
            <div>
              <span className="text-xs text-[#828d9e] block font-semibold mb-2">Input Area (Vacío)</span>
              <Input
                label="Nombre completo"
                placeholder="Escriba su nombre"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            {/* Input con Icono */}
            <div>
              <span className="text-xs text-[#828d9e] block font-semibold mb-2">Input Area + Icono</span>
              <Input label="Nombre completo" icon={<PersonIcon />} placeholder="Escriba su nombre" />
            </div>

            {/* Input Complete */}
            <div>
              <span className="text-xs text-[#828d9e] block font-semibold mb-2">Input Area Complete</span>
              <Input
                label="Nombre completo"
                completed
                value={completedInput}
                onChange={(e) => setCompletedInput(e.target.value)}
              />
            </div>

            {/* Input Error */}
            <div>
              <span className="text-xs text-[#828d9e] block font-semibold mb-2">Input Area Error</span>
              <Input
                label="Nombre completo"
                error="Error ..."
                value={errorInput}
                onChange={(e) => setErrorInput(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Select */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-[#828d9e]/20 text-left space-y-6">
          <div>
            <h2 className="text-xl font-bold font-['Gotham',_sans-serif] text-[#1a2035]">
              3. Selectores (`Select.tsx`)
            </h2>
            <p className="text-sm text-[#828d9e]">
              Estados: Default (Placeholder), Seleccionado (`#f6f5f5`), Desplegable abierto con divisores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Select Default */}
            <div>
              <span className="text-xs text-[#828d9e] block font-semibold mb-2">Select Default</span>
              <Select
                label="Selección opción"
                placeholder="Seleccione alguno"
                options={selectOptions}
                value={selectedValue}
                onChange={(val) => setSelectedValue(val)}
              />
            </div>

            {/* Select Active / Selected */}
            <div>
              <span className="text-xs text-[#828d9e] block font-semibold mb-2">Select Activo / Seleccionado</span>
              <Select
                label="Prioridad"
                options={selectOptions}
                value={selectedOpt2}
                onChange={(val) => setSelectedOpt2(val)}
              />
            </div>

            {/* Select con Error */}
            <div>
              <span className="text-xs text-[#828d9e] block font-semibold mb-2">Select con Error</span>
              <Select
                label="Categoría"
                placeholder="Seleccione alguno"
                error="Debe elegir una opción"
                options={selectOptions}
              />
            </div>
          </div>
        </section>

        {/* Section 4: Chips */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-[#828d9e]/20 text-left space-y-6">
          <div>
            <h2 className="text-xl font-bold font-['Gotham',_sans-serif] text-[#1a2035]">
              4. Chips (`Chip.tsx`)
            </h2>
            <p className="text-sm text-[#828d9e]">
              Estados: `off` (inactivo `#f6f5f5`) y `on` (activo `#cbeefd` con icono de remover).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="space-y-1">
              <span className="text-xs text-[#828d9e] block font-semibold">Chip Off (Inactivo)</span>
              <Chip active={false}>Sin prioridad</Chip>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#828d9e] block font-semibold">Chip On (Activo con Cierre)</span>
              <Chip active={true} onClose={() => alert('Chip cerrado')}>
                Sin prioridad
              </Chip>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#828d9e] block font-semibold">Chips Interactivos</span>
              <div className="flex items-center gap-2">
                <Chip active={chip1Active} onClick={() => setChip1Active(!chip1Active)}>
                  Baja Prioridad
                </Chip>
                <Chip
                  active={chip2Active}
                  onClick={() => setChip2Active(!chip2Active)}
                  onClose={() => setChip2Active(false)}
                >
                  Media Prioridad
                </Chip>
                <Chip active={chip3Active} onClick={() => setChip3Active(!chip3Active)}>
                  Alta Prioridad
                </Chip>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Live Form Example */}
        <section className="bg-gradient-to-br from-white to-[#f6f5f5] p-8 rounded-2xl shadow-sm border border-[#2462ec]/30 text-left space-y-6">
          <div>
            <h2 className="text-xl font-bold font-['Gotham',_sans-serif] text-[#1a2035] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2462ec] inline-block" />
              Ejemplo Formulario Integrado
            </h2>
            <p className="text-sm text-[#828d9e]">
              Demostración de los componentes UI trabajando en un formulario interactivo.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('¡Formulario enviado con éxito!');
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <Input label="Nombre de Usuario" icon={<PersonIcon />} placeholder="Ej: Carlos Mendoza" required />
            <Select
              label="Tipo de Consulta"
              options={[
                { value: 'soporte', label: 'Soporte Técnico' },
                { value: 'ventas', label: 'Ventas y Planes' },
                { value: 'general', label: 'Información General' },
              ]}
            />

            <div className="md:col-span-2 space-y-2">
              <label className="font-['Gotham',_sans-serif] font-bold text-[14px] text-[#48505e] block">
                Etiquetas / Categorías
              </label>
              <div className="flex flex-wrap gap-2">
                <Chip active={true}>Urgente</Chip>
                <Chip active={false}>Frontend</Chip>
                <Chip active={true}>UI/UX Figma</Chip>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-[#828d9e]/20">
              <Button variant="secondary" type="button">
                Cancelar
              </Button>
              <Button variant="primary" type="submit" icon={<ChatIcon />}>
                Enviar Mensaje
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default App;

