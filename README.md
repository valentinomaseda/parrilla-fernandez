## Parrilla Fernandez

Pequeño sitio web informativo para la Parrilla "Fernandez" en Arrecifes — proyecto demo construido con React + Vite y Tailwind CSS. Incluye secciones de menú, turismo local, galería y reseñas con animaciones y lightbox.

Características destacadas
- Sección de Turismo con acordeón interactivo y mapas embebidos (Google Maps).
- Galería con lightbox animado (click en miniaturas para ver imagen grande, navegación y teclado).
- Sección de Reseñas con animaciones y control de enfoque accesible.
- Componentes responsivos diseñados con Tailwind CSS y animados con Framer Motion.

Tech stack
- React (JSX)
- Vite (dev server y build)
- Tailwind CSS (estilos)
- Framer Motion (animaciones)
- Lucide React (íconos)

Instalación y desarrollo
Requisitos: Node.js 16+ y npm o yarn.

1. Instalar dependencias

```bash
npm install
# o: yarn
```

2. Levantar servidor de desarrollo

```bash
npm run dev
```

3. Build de producción

```bash
npm run build
npm run preview
```

Estructura relevante
- `index.html` — entrada HTML.
- `src/main.jsx` — punto de arranque React.
- `src/App.jsx` — layout y ensamblado de secciones.
- `src/components/` — componentes principales:
	- `TourismSection.jsx` — acordeón de lugares, galería y lightbox.
	- `GallerySection.jsx` — galería global con lightbox.
	- `ReviewsSection.jsx` — tarjetas de reseñas animadas.
	- `ValueInfoSection.jsx` — características del local (chimenea, parrilla, bodega).

Assets
- Coloca imágenes en la carpeta `public/` y referencia desde los arrays de imágenes con rutas relativas (ej: `/mi-foto.jpg`). El código normaliza automáticamente rutas que inician con `public/`.

Notas para desarrollo
- Las iframes de mapas usan `title` descriptivos para accesibilidad y SEO (p. ej. "Ubicación de Plaza Mitre en Arrecifes").
- El lightbox soporta cierre por `Esc` y navegación con ← / →.
- Para cambiar íconos o animaciones, revisar imports en `src/components/*` y los componentes de Framer Motion.

Contribuciones
- Fork, branch y PR. Mantener consistencia con Tailwind y las utilidades existentes.

Licencia
- (Opcional) Agregar licencia si corresponde.

Contacto
- Autor / mantenedor: -- (añadir datos de contacto si lo deseas)

---
Pequeñas mejoras sugeridas: añadir pruebas visuales (Cypress/Playwright), optimizar imágenes y añadir un script para validar rutas de `public/` en build.
