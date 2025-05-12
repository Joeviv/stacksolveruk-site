// @ts-check
import { defineConfig } from 'astro/config';
import { defineConfig } from 'astro/config';
import image from '@astrojs/image'; // <-- Add this line
// https://astro.build/config
export default defineConfig({
    integrations: [
      image(), // <-- Add image() here
    ],
    // Puedes añadir configuración adicional para la integración de imágenes aquí si es necesario
    // image: {
    //    service: { entrypoint: 'astro/assets/services/sharp' }, // Sharp es el servicio por defecto
    // },
  });
