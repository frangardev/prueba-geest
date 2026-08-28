# 📋 Gestor de Contactos — Prueba Geest

Aplicación web de gestión de contactos construida con **React 19 + TypeScript + Tailwind CSS v4** y diseñada a partir de un sistema de diseño extraído desde **Figma vía MCP** (Model Context Protocol).

---

## 🖥️ Demo Visual

> La aplicación muestra una lista de tarjetas de contacto con soporte de filtros combinados en tiempo real, skeleton de carga, notificaciones flotantes y persistencia en `localStorage`.

| Feature | Vista |
|---|---|
| **Lista de tarjetas** | Grid responsivo `1 → 2 → 3` columnas con diseño horizontal inspirado en Figma node `129:2488` |
| **Filtros combinados** | Búsqueda por nombre/email + chips de departamento simultáneos |
| **Skeleton loading** | Pantalla de carga animada durante el primer segundo |
| **Modal de agregar** | Formulario Formik + Yup con validación en tiempo real |
| **Modal de confirmar** | Diálogo de confirmación antes de eliminar un contacto |
| **Toast flotante** | Notificaciones de éxito/error con Sonner (`bottom-right`) |

---

## 🏗️ Stack Tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| **React** | `^19.2` | UI library con hooks y composición de componentes |
| **TypeScript** | `^7.0` | Tipado estático end-to-end |
| **Vite** | `^8.2` | Bundler y servidor de desarrollo |
| **Tailwind CSS** | `^4.3` | Utility-first styling con integración vía `@tailwindcss/vite` |
| **Formik** | `^2.4` | Manejo de formularios y estado de campos |
| **Yup** | `^1.7` | Validación declarativa del esquema del formulario |
| **Sonner** | `^2.0` | Notificaciones flotantes (`toast.success`, `toast.error`) |
| **uuid** | `^14.0` | Generación de IDs únicos (`v4`) para cada nuevo contacto |

---

## 🎨 Decisiones de Arquitectura y UI

### Tokens de Diseño desde Figma (vía MCP)

Los tokens de color y tipografía fueron extraídos directamente desde el archivo Figma del reto usando el **Figma MCP server** (`@modelcontextprotocol/server-figma`) configurado en `.vscode/mcp.json`. Los nodos analizados fueron:

- **Node `98:5082`** → Sistema de diseño: paleta de colores, radios y tipografía.
- **Node `129:2488`** → Componente `card-contact`: layout horizontal con bloque de color pastel a la izquierda, círculo con iniciales y área de información derecha.

Los tokens extraídos se definen en `src/index.css` dentro de un bloque `@theme { }` de Tailwind v4:

```css
@theme {
  --color-primary: #2462ec;
  --color-primary-light: #cbeefd;
  --color-alert-success: #1f9334;
  --color-alert-error: #df3f46;
  --color-alert-warning: #dfd23f;
  --color-fondo: #f6f5f5;
  --color-surface: #ffffff;
  --color-text-title: #1a2035;
  --color-text-normal: #48505e;
  --color-text-light: #828d9e;
}
```

### Paleta de Departamentos (de Figma)

| Departamento | Pastel (fondo izq.) | Círculo | Texto |
|---|---|---|---|
| **Ventas** | `#e6eeff` | `#bcc6e7` | `#5475e0` |
| **Desarrollo** | `#e6f9ed` | `#b8e8ca` | `#1f9334` |
| **Marketing** | `#fef9e7` | `#fce59e` | `#857908` |
| **Soporte** | `#fde8e8` | `#f8b1b1` | `#df3f46` |

### Estructura de Componentes

```
src/
├── App.tsx                        # Raíz: estado global, filtros, localStorage
├── types.ts                       # Tipos: Contact, Department, FilterDepartment
├── data.json                      # Datos iniciales de contactos (fallback)
└── components/
    ├── ui/                        # Librería de componentes base
    │   ├── Button.tsx             # Variantes: primary / secondary / ghost
    │   ├── Input.tsx              # Input con label, error, ícono y estado completado
    │   ├── Select.tsx             # Dropdown personalizado con menú flotante upward
    │   ├── Chip.tsx               # Filtro interactivo con estado activo/inactivo
    │   └── index.ts               # Barrel export
    ├── ContactCard.tsx            # Tarjeta replicada de Figma node 129:2488
    ├── ContactList.tsx            # Grid responsivo de tarjetas o EmptyState
    ├── ContactFilters.tsx         # Barra de búsqueda + chips de departamento
    ├── ContactSkeleton.tsx        # Skeleton animado de carga (1 segundo)
    ├── EmptyState.tsx             # Estado vacío cuando no hay resultados
    ├── AddContactModal.tsx        # Modal Formik/Yup para agregar contactos
    └── ConfirmDeleteModal.tsx     # Modal de confirmación de eliminación
```

### Decisiones Clave

- **Tailwind CSS v4**: Se usa `@import "tailwindcss"` en `index.css` y el plugin `@tailwindcss/vite` — sin archivo `tailwind.config.js`.
- **`Select` upward**: El menú desplegable abre hacia arriba (`absolute bottom-full`) para evitar clipping en el modal.
- **`localStorage` sync**: El array de contactos se persiste automáticamente en `localStorage` con la clave `geest_contacts`. Al iniciar, se recupera el estado previo; si está vacío, se carga `data.json`.
- **Filtros combinados**: `useMemo` computa el subconjunto filtrado combinando búsqueda de texto (nombre + email) y chip de departamento en tiempo real.
- **Confirmación antes de eliminar**: Al presionar el ícono de papelera se muestra `ConfirmDeleteModal` antes de ejecutar la eliminación definitiva.
- **IDs únicos**: Cada contacto nuevo recibe un `id` generado con `uuid v4()`.
- **Accesibilidad (a11y)**: `aria-label`, `role="dialog"`, `aria-modal`, `htmlFor` vinculados a `id` en todos los controles interactivos.

---

## 🚀 Instrucciones de Instalación y Uso

### Prerrequisitos

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/prueba-geest.git
cd prueba-geest
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Correr en modo desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### 4. Compilar para producción

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

### 5. Previsualizar el build de producción

```bash
npm run preview
```

---

## 📦 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Previsualiza el build de producción localmente |
| `npm run lint` | Ejecuta ESLint sobre el código fuente |

---

## 📁 Datos Iniciales

El archivo [`src/data.json`](./src/data.json) contiene la lista de contactos que se carga por defecto si `localStorage` está vacío. Puedes modificarlo para cambiar los contactos iniciales:

```json
[
  {
    "id": "...",
    "name": "Ana García",
    "email": "ana.garcia@empresa.com",
    "phone": "555-0100",
    "department": "Desarrollo"
  }
]
```

---

## 🔧 Configuración del entorno Figma MCP

Para reproducir la extracción de tokens desde Figma, configura `.vscode/mcp.json` con tu token personal de Figma:

```json
{
  "servers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-figma"],
      "env": {
        "FIGMA_PERSONAL_ACCESS_TOKEN": "TU_TOKEN_AQUI"
      }
    }
  }
}
```

---

## 📄 Licencia

MIT
