// @ts-check
import { defineConfig } from 'astro/config'; // <-- Solo DEBE haber UNA línea de este import
import image from '@astrojs/image'; // Importar la integración de imágenes

// https://astro.build/config
export default defineConfig({
    // Añade tus integraciones aquí
    integrations: [
      image(), // Asegúrate de que image() esté en la lista de integraciones
    ],

    // Puedes añadir configuración adicional para la integración de imágenes aquí si es necesario
    // image: {
    //    service: { entrypoint: 'astro/assets/services/sharp' }, // Sharp es el servicio por defecto
    //    // Más opciones de configuración: https://docs.astro.build/en/guides/assets/
    // },

    // Otras opciones de configuración de Astro (si las tuvieras)
    // site: 'https://tudominio.com',
    // base: '/',
});