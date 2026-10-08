/* Menú de respaldo de Luna Rosa.
   Es la copia del menú que la página usa SOLO si Supabase no está configurado
   o no responde y no hay una copia guardada en el navegador. La fuente real del
   menú es la base de datos; este archivo es el último recurso para que la
   página nunca quede en blanco. */
window.LR_MENU_EMBEBIDO = {
  "categorias": [
    {
      "id": 1,
      "nombre": "🍦 Conos & Canastas",
      "orden": 1
    },
    {
      "id": 2,
      "nombre": "🍨 Copas & Especiales",
      "orden": 2
    },
    {
      "id": 3,
      "nombre": "🧇 Waffles & Bubbles",
      "orden": 3
    },
    {
      "id": 4,
      "nombre": "🥤 Frappes & Malteadas",
      "orden": 4
    },
    {
      "id": 5,
      "nombre": "🍓 Ensaladas & Frutas",
      "orden": 5
    },
    {
      "id": 6,
      "nombre": "💧 Bebidas",
      "orden": 6
    }
  ],
  "productos": [
    {
      "id": 1,
      "categoria_id": 1,
      "nombre": "Cono Sencillo",
      "precio": 4000,
      "descripcion": "1 bola de helado a tu elección",
      "imagen_url": "Recursos/Nuevas imagenes/Cono sencillo.jpeg",
      "disponible": true,
      "orden": 1,
      "opciones": null
    },
    {
      "id": 2,
      "categoria_id": 1,
      "nombre": "Cono Doble",
      "precio": 7000,
      "descripcion": "2 bolas de helado",
      "imagen_url": "Recursos/Nuevas imagenes/Cono doble.jpeg",
      "disponible": true,
      "orden": 2,
      "opciones": null
    },
    {
      "id": 3,
      "categoria_id": 1,
      "nombre": "Canasta Doble",
      "precio": 8000,
      "descripcion": "Dos bolas de helado con topping",
      "imagen_url": "Recursos/Nuevas imagenes/Canasta doble.jpeg",
      "disponible": true,
      "orden": 3,
      "opciones": null
    },
    {
      "id": 4,
      "categoria_id": 1,
      "nombre": "Canasta Triple",
      "precio": 12000,
      "descripcion": "Tres bolas de helado con topping",
      "imagen_url": "Recursos/Nuevas imagenes/Canasta triple.jpeg",
      "disponible": true,
      "orden": 4,
      "opciones": null
    },
    {
      "id": 5,
      "categoria_id": 1,
      "nombre": "Canasta Luna",
      "precio": 14000,
      "descripcion": "Dos bolas de helado con topping especial",
      "imagen_url": "Recursos/CANASTA ESPECIAL/DSC09919.jpg",
      "disponible": true,
      "orden": 5,
      "opciones": null
    },
    {
      "id": 6,
      "categoria_id": 1,
      "nombre": "Pingui Helado",
      "precio": 7000,
      "descripcion": "Helado en canasta con topping",
      "imagen_url": "Recursos/PINGUINO/DSC00031.jpg",
      "disponible": true,
      "orden": 6,
      "opciones": null
    },
    {
      "id": 7,
      "categoria_id": 2,
      "nombre": "Copa Fresa",
      "precio": 14000,
      "descripcion": "Helado con fresas frescas",
      "imagen_url": "Recursos/COPA FRESA CON QUESO/DSC09882.jpg",
      "disponible": true,
      "orden": 1,
      "opciones": null
    },
    {
      "id": 8,
      "categoria_id": 2,
      "nombre": "Copa Choco Brownie",
      "precio": 13000,
      "descripcion": "Tres bolas de helado con topping de brownie",
      "imagen_url": "Recursos/COPA BROWNIE/DSC09843.jpg",
      "disponible": true,
      "orden": 2,
      "opciones": null
    },
    {
      "id": 9,
      "categoria_id": 2,
      "nombre": "Copa Cítrica",
      "precio": 14000,
      "descripcion": "Helado con topping cítrico fresco",
      "imagen_url": "Recursos/COPA CITRICA/DSC09956.jpg",
      "disponible": true,
      "orden": 3,
      "opciones": null
    },
    {
      "id": 10,
      "categoria_id": 2,
      "nombre": "Araña",
      "precio": 9000,
      "descripcion": "Helado a tu elección con topping especial",
      "imagen_url": "Recursos/ARAÑA/DSC00098.jpg",
      "disponible": true,
      "orden": 4,
      "opciones": null
    },
    {
      "id": 11,
      "categoria_id": 2,
      "nombre": "Bolw Luna Cream",
      "precio": 18000,
      "descripcion": "Helado cremoso para disfrutar a cucharadas",
      "imagen_url": "Recursos/CUCHAREABLE/DSC00067.jpg",
      "disponible": true,
      "orden": 5,
      "opciones": null
    },
    {
      "id": 12,
      "categoria_id": 2,
      "nombre": "Banana Cream",
      "precio": 16000,
      "descripcion": "Banana fresca con helado",
      "imagen_url": "Recursos/BANANA SPLITT/DSC09822.jpg",
      "disponible": true,
      "orden": 6,
      "opciones": null
    },
    {
      "id": 35,
      "categoria_id": 2,
      "nombre": "Brownie con Helado",
      "precio": 10000,
      "descripcion": "Brownie de chocolate tibio con una bola de helado encima y salsa de chocolate — el equilibrio perfecto entre caliente y frío",
      "imagen_url": "Recursos/Nuevas imagenes/Brownie Con Helado.jpeg",
      "disponible": true,
      "orden": 7,
      "opciones": null
    },
    {
      "id": 13,
      "categoria_id": 3,
      "nombre": "Luna Mariposa",
      "precio": 11000,
      "descripcion": "Waffles con helado y topping",
      "imagen_url": "Recursos/MARIPOSA/DSC00005.jpg",
      "disponible": true,
      "orden": 1,
      "opciones": null
    },
    {
      "id": 14,
      "categoria_id": 3,
      "nombre": "Waffle Fruti Luna",
      "precio": 18000,
      "descripcion": "Waffle con topping y helado frutal",
      "imagen_url": "Recursos/WAFFLE FRUTAL/DSC00119.jpg",
      "disponible": true,
      "orden": 2,
      "opciones": null
    },
    {
      "id": 15,
      "categoria_id": 3,
      "nombre": "Waffle Choco Cream",
      "precio": 20000,
      "descripcion": "Waffle con topping de chocolate y helado",
      "imagen_url": "Recursos/WAFFLE DULCE/DSC00357.jpg",
      "disponible": true,
      "orden": 3,
      "opciones": null
    },
    {
      "id": 16,
      "categoria_id": 3,
      "nombre": "Waffle Solo Topping",
      "precio": 18000,
      "descripcion": "Waffle con topping dulce, sin helado",
      "imagen_url": "Recursos/Nuevas imagenes/Waffle solo topping.jpeg",
      "disponible": true,
      "orden": 4,
      "opciones": null
    },
    {
      "id": 17,
      "categoria_id": 3,
      "nombre": "Bubble Dulce Explosión",
      "precio": 20000,
      "descripcion": "Waffle bubble con topping dulce",
      "imagen_url": "Recursos/BUBLE WAFFLE BISCOLATA/DSC00297.jpg",
      "disponible": true,
      "orden": 5,
      "opciones": null
    },
    {
      "id": 18,
      "categoria_id": 3,
      "nombre": "Bubble sin Helado",
      "precio": 18000,
      "descripcion": "Bubble waffle con topping, sin helado",
      "imagen_url": "Recursos/Nuevas imagenes/Bubble sin Helado.jpeg",
      "disponible": true,
      "orden": 6,
      "opciones": null
    },
    {
      "id": 19,
      "categoria_id": 3,
      "nombre": "Bubble Fruti Luna",
      "precio": 20000,
      "descripcion": "Waffle bubble con topping, fruta y helado",
      "imagen_url": "Recursos/WAFFLE CHOCOLATE FRUTAL/DSC00422.png",
      "disponible": true,
      "orden": 7,
      "opciones": null
    },
    {
      "id": 21,
      "categoria_id": 4,
      "nombre": "Frappe Milo",
      "precio": 15000,
      "descripcion": "Frappe cremoso con helado sabor Milo",
      "imagen_url": "Recursos/FRAPPE DE MILO/DSC00248.jpg",
      "disponible": true,
      "orden": 1,
      "opciones": null
    },
    {
      "id": 36,
      "categoria_id": 4,
      "nombre": "Milo",
      "precio": 12000,
      "descripcion": "Bebida fría y cremosa sabor Milo con salsa de chocolate",
      "imagen_url": "Recursos/Nuevas imagenes/Milo.jpeg",
      "disponible": true,
      "orden": 2,
      "opciones": null
    },
    {
      "id": 22,
      "categoria_id": 4,
      "nombre": "Malteada Luna",
      "precio": 14000,
      "descripcion": "Malteada Luna Rosa",
      "imagen_url": "Recursos/MALTEADA SENCILLA/DSC00149.jpg",
      "disponible": true,
      "orden": 3,
      "opciones": null
    },
    {
      "id": 23,
      "categoria_id": 4,
      "nombre": "Malteada Milk Shake",
      "precio": 16000,
      "descripcion": "Milk shake premium con helado",
      "imagen_url": "Recursos/MILL SHAKE/DSC00177.jpg",
      "disponible": true,
      "orden": 4,
      "opciones": null
    },
    {
      "id": 24,
      "categoria_id": 4,
      "nombre": "Maracumango",
      "precio": 14000,
      "descripcion": "Frappe de maracuyá y mango con helado",
      "imagen_url": "Recursos/MARACUMANGO/DSC00321.jpg",
      "disponible": true,
      "orden": 5,
      "opciones": null
    },
    {
      "id": 25,
      "categoria_id": 4,
      "nombre": "Maracumango sin Helado",
      "precio": 10000,
      "descripcion": "Frappe de maracuyá y mango",
      "imagen_url": "Recursos/Nuevas imagenes/Maracumango sin Helado.jpeg",
      "disponible": true,
      "orden": 6,
      "opciones": null
    },
    {
      "id": 26,
      "categoria_id": 4,
      "nombre": "Fresada",
      "precio": 14000,
      "descripcion": "Bebida de fresa fresca con helado",
      "imagen_url": "Recursos/FRESADA/DSC00450.png",
      "disponible": true,
      "orden": 7,
      "opciones": null
    },
    {
      "id": 27,
      "categoria_id": 5,
      "nombre": "Ensalada de Frutas Personal",
      "precio": 13000,
      "descripcion": "Fruta a elección con topping especial",
      "imagen_url": "Recursos/ENSALADA DE FRUTAS PERSONAL/DSC09782.png",
      "disponible": true,
      "orden": 1,
      "opciones": null
    },
    {
      "id": 28,
      "categoria_id": 6,
      "nombre": "Agua Pura",
      "precio": 2000,
      "descripcion": "Agua fría",
      "imagen_url": "Recursos/Bebidas/Agua pura.jpeg",
      "disponible": true,
      "orden": 1,
      "opciones": null
    },
    {
      "id": 29,
      "categoria_id": 6,
      "nombre": "Sodas",
      "precio": 10000,
      "descripcion": "Gaseosa a elección",
      "imagen_url": "Recursos/Nuevas imagenes/Sodas.jpeg",
      "disponible": true,
      "orden": 2,
      "opciones": null
    },
    {
      "id": 30,
      "categoria_id": 6,
      "nombre": "Agua Cristal",
      "precio": 2500,
      "descripcion": "Agua embotellada, fría y refrescante",
      "imagen_url": "Recursos/Bebidas/Agua cristal.jpg",
      "disponible": true,
      "orden": 3,
      "opciones": null
    },
    {
      "id": 31,
      "categoria_id": 6,
      "nombre": "Agua Cristal Grande",
      "precio": 3000,
      "descripcion": "Botella grande, ideal para compartir",
      "imagen_url": "Recursos/Bebidas/Agua cristal grande.jpg",
      "disponible": true,
      "orden": 4,
      "opciones": null
    },
    {
      "id": 32,
      "categoria_id": 6,
      "nombre": "Soda Bretaña",
      "precio": 4000,
      "descripcion": "Bebida con gas, sabor clásico",
      "imagen_url": "Recursos/Bebidas/Soda bretaña.webp",
      "disponible": true,
      "orden": 5,
      "opciones": null
    },
    {
      "id": 33,
      "categoria_id": 6,
      "nombre": "Ginger",
      "precio": 3500,
      "descripcion": "Refrescante sabor a jengibre",
      "imagen_url": "Recursos/Bebidas/Ginger.webp",
      "disponible": true,
      "orden": 6,
      "opciones": null
    },
    {
      "id": 34,
      "categoria_id": 6,
      "nombre": "Agua Cielo con Gas",
      "precio": 2500,
      "descripcion": "Agua con gas, fría y burbujeante",
      "imagen_url": "Recursos/Bebidas/Agua cielo con gas.png",
      "disponible": true,
      "orden": 7,
      "opciones": null
    }
  ],
  "horarios": [
    {
      "dia_semana": 0,
      "abre": "14:00",
      "cierra": "21:30",
      "cerrado": false
    },
    {
      "dia_semana": 1,
      "abre": "14:00",
      "cierra": "21:30",
      "cerrado": false
    },
    {
      "dia_semana": 2,
      "abre": "14:00",
      "cierra": "21:30",
      "cerrado": false
    },
    {
      "dia_semana": 3,
      "abre": "14:00",
      "cierra": "21:30",
      "cerrado": false
    },
    {
      "dia_semana": 4,
      "abre": "14:00",
      "cierra": "21:30",
      "cerrado": false
    },
    {
      "dia_semana": 5,
      "abre": "14:00",
      "cierra": "21:30",
      "cerrado": false
    },
    {
      "dia_semana": 6,
      "abre": "14:00",
      "cierra": "21:30",
      "cerrado": false
    }
  ],
  "configuracion": {
    "horario_activo": false,
    "cerrado_temporalmente": false,
    "mensaje_cierre": null
  }
};
