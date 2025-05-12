# Documentación de Estructura del Proyecto Astro

Este documento describe la estructura y los principios fundamentales utilizados en este proyecto Astro.

## Estructura de Carpetas Clave:

-   `public/`: Contiene recursos estáticos (imágenes, fuentes, archivos directos). Los archivos aquí se copian directamente a la carpeta de salida (`dist/`) y se referencian desde la raíz (ej: `/images/hero/`).
-   `src/`: Contiene el código fuente del proyecto.
    -   `src/components/`: Componentes reutilizables (`.astro` u otros frameworks).
    -   `src/layouts/`: Layouts (plantillas de página) que definen la estructura común (`BaseLayout.astro`).
    -   `src/pages/`: Archivos de página (`.astro`, `.md`, `.html`). Astro crea una ruta para cada archivo aquí (ej: `src/pages/index.astro` -> `/`).
-   `docs/`: Documentación interna del proyecto (este archivo y otros).

## Principios de Desarrollo con Astro:

-   **Island Architecture:** Utilizamos la arquitectura de islas. La mayor parte del sitio es HTML estático. La interactividad (JavaScript) se limita a componentes específicos (Islas) usando directivas `client:`, cargando JS solo donde es necesario.
-   **Componentes Reutilizables:** Dividimos la UI en componentes para modularidad (Header, Footer, FeatureCard, HeroSection, FeaturesGrid).
-   **Layouts:** Usamos layouts para definir la estructura común de las páginas (`BaseLayout.astro`) y evitar la repetición de código HTML boilerplate.
-   **Props:** Pasamos datos de componentes padre a hijos usando props (ej: en `FeatureCard`).

## Gestión de Imágenes:

-   **Ubicación:** Las imágenes optimizadas se guardan en subcarpetas dentro de `public/images/` (ej: `public/images/hero/`).
-   **Formatos:** Priorizamos **WebP** para imágenes fotográficas/complejas y **SVG** para logos/iconos. Usamos JPG/PNG como fallback si es necesario (aunque idealmente se maneja con `<picture>` o la integración de imágenes).
-   **Optimización:** Las imágenes se optimizan (comprimir y redimensionar) ANTES de colocarlas en la carpeta `public/`. (Considerar `@astrojs/image` para automatización futura).
En resumen, para optimizar tus imágenes ahora:
Usa WebP como formato principal.
Comprime tus archivos WebP (ej: 75-85% calidad).
Redimensiona las imágenes a un tamaño razonable para su visualización en el diseño.
Coloca los archivos WebP optimizados en las subcarpetas de public/images/.
Usa rutas como /images/hero/collage/nombre.webp en tus etiquetas <img>.

IMAGENES Tamaño recomendado para imágenes originales
Como regla general, recomiendo subir imágenes JPG con estas características:

Resolución máxima de 1920px de ancho para imágenes de página completa o grandes
Resolución de 1200-1500px para imágenes de tamaño medio
Entre 600-800px para imágenes pequeñas o miniaturas

-   **Referencia en Código:** Las imágenes se referencian usando rutas relativas a `public/` (ej: `<img src="/images/hero/mi-imagen.webp">`).

## Historial Clave de Desarrollo Inicial:

-   Configuración inicial de 5 proyectos Astro con Git, GitHub y AWS Amplify Hosting para despliegue automático.
-   Desarrollo de la estructura base del sitio `stacksolver-site`:
    -   Creación de `BaseLayout.astro`.
    -   Creación de componentes `Header.astro` y `Footer.astro`.
    -   Implementación de navegación responsiva (burger menu) en `Header` y `Navigation.astro` usando Island Architecture (`client:load`).
    -   Creación de componentes `FeaturesGrid.astro` y `FeatureCard.astro`.
    -   Estructura de la página `index.astro` usando `BaseLayout`, `HeroSection` (futuro) y `FeaturesGrid`.
    -   Ajustes de diseño para la cuadrícula (columnas, centrado, tamaño de video).
-   Configuración inicial de la carpeta `public/images/` con subcarpetas para organización.

Este documento sirve como punto de partida y puede ser expandido con más detalles a medida que el proyecto evoluciona.