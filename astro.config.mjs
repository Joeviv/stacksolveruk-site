// @ts-check
import { defineConfig } from 'astro/config';

// No necesitas importar el servicio de imagen aquí directamente

// https://astro.build/config
export default defineConfig({
  // Añade tus integraciones aquí (image() ya NO es una integración)
  integrations: [
    // Si tenías image() o cualquier otra integración, mantenlas
  ],

  // Configuración del servicio de procesamiento de imágenes (Assets)
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp', // <-- Configurar el servicio integrado (Sharp es por defecto)
    },
  },

  // Otras opciones de configuración de Astro
});