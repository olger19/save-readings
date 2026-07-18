# Save-Readings Tracker

Lleva el control de todas tus lecturas en un solo lugar. Save-Readings es una aplicación web interactiva de alto rendimiento diseñada para registrar, organizar y hacer un seguimiento del progreso de tus mangas, manhwas y manhuas favoritos.

Desarrollada bajo una arquitectura limpia en React con Vite, estilizada con el nuevo Tailwind CSS v4 y potenciada por Supabase en tiempo real.

---

## Tecnologías Usadas

<div align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Lucide_Icons-FF6F61?style=for-the-badge&logo=react&logoColor=white" alt="Lucide Icons" />
</div>

---

## Características Principales

*   **Diseño Premium Modo Oscuro:** Interfaz inmersiva con fondos profundos, gradientes radiales dinámicos y acabados elegantes de Glassmorphism.
*   **Gestión por Categorías:** Estilos y colores diferenciados automáticamente según el formato (Manga, Manhwa, Manhua).
*   **Actualización Instantánea (Optimistic UI):** Botón incrementador rápido de capítulos en la misma tarjeta que actualiza visualmente la interfaz de inmediato antes de confirmar la petición al servidor.
*   **Componentes de Selección Premium:** Reemplazo de los selectores HTML nativos por un componente CustomSelect animado con menú flotante translúcido al estilo de Material UI.
*   **Filtros y Búsqueda en Tiempo Real:** Busca por títulos y notas, y filtra instantáneamente por tipo o estado de lectura sin recargas de página.
*   **Dashboard de Estadísticas:** Panel superior interactivo con contadores del total de títulos, total de capítulos leídos e indicadores de progreso general.

---

## Arquitectura del Proyecto

El proyecto está organizado en una estructura limpia por capas para máxima mantenibilidad y escalabilidad:

```
src/
├── components/           # Componentes puros de UI (Header, Stats, Cards, Modales)
├── hooks/                # Custom Hooks para el manejo del estado del negocio (useReadings)
├── services/             # Integración con APIs externas (supabaseClient y readingsService)
├── App.jsx               # Coordinador principal de vistas
├── index.css             # Estilos globales y variables de tema centralizadas
└── main.jsx              # Punto de entrada
```

---

## Guía de Configuración Local

### 1. Requisitos Previos
*   Tener instalado Node.js y el gestor de paquetes pnpm (o npm/yarn).

### 2. Configurar la Base de Datos
Crea una tabla en tu SQL Editor de Supabase con el siguiente script:

```sql
create table readings (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text not null check (type in ('manga', 'manhwa', 'manhua')),
  status text not null default 'reading' check (status in ('reading', 'completed', 'on_hold', 'plan_to_read', 'dropped')),
  current_chapter integer not null default 0,
  total_chapters integer,
  rating integer check (rating >= 1 and rating <= 10),
  cover_url text,
  notes text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar acceso de lectura y escritura anónimo/público (RLS)
alter table readings enable row level security;
create policy "Allow public read access" on readings for select using (true);
create policy "Allow public insert access" on readings for insert with check (true);
create policy "Allow public update access" on readings for update using (true);
create policy "Allow public delete access" on readings for delete using (true);
```

### 3. Instalar e Iniciar
Clona el repositorio, crea un archivo .env en la raíz guiándote por el .env.example y rellena tus credenciales. Luego ejecuta:

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor local
pnpm dev
```

---

## Proyecciones a Futuro (Roadmap)

Con el fin de expandir y profesionalizar la aplicación, se proyectan las siguientes características:

*   [ ] **Sistema de Autenticación de Usuarios (Supabase Auth):** Implementar login/registro seguro para que múltiples usuarios puedan mantener listas de lectura individuales, privadas e intransferibles.
*   [ ] **Modo Lectura Offline (PWA):** Convertir el sitio en una aplicación web progresiva para poder actualizar lecturas sin conexión a internet y sincronizar los datos al volver a tener señal.
*   [ ] **Aplicacion movil:** Convertir el sitio en una aplicacion movil con las mismas características de la web.

