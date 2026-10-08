-- =============================================================
-- LUNA ROSA — 03 · DATOS INICIALES (menú actual)
-- Ejecutar DESPUÉS de 01 y 02.
--
-- GENERADO AUTOMÁTICAMENTE a partir del menú que estaba escrito a mano
-- en index.html (6 categorías, 35 productos). No editar a mano.
--
-- Seguro de re-ejecutar: usa "on conflict do nothing", así que si ya
-- cambiaste precios o productos desde el panel, NO los pisa.
-- Conserva los ids originales de los productos.
-- =============================================================

-- 1) Categorías --------------------------------------------------
insert into public.categorias (id, nombre, orden) values
  (1, '🍦 Conos & Canastas', 1),
  (2, '🍨 Copas & Especiales', 2),
  (3, '🧇 Waffles & Bubbles', 3),
  (4, '🥤 Frappes & Malteadas', 4),
  (5, '🍓 Ensaladas & Frutas', 5),
  (6, '💧 Bebidas', 6)
on conflict (id) do nothing;

-- 2) Productos ---------------------------------------------------
insert into public.productos (id, categoria_id, nombre, precio, descripcion, imagen_url, disponible, orden, opciones) values
  (1, 1, 'Cono Sencillo', 4000, '1 bola de helado a tu elección', 'Recursos/Nuevas imagenes/Cono sencillo.jpeg', true, 1, null),
  (2, 1, 'Cono Doble', 7000, '2 bolas de helado', 'Recursos/Nuevas imagenes/Cono doble.jpeg', true, 2, null),
  (3, 1, 'Canasta Doble', 8000, 'Dos bolas de helado con topping', 'Recursos/Nuevas imagenes/Canasta doble.jpeg', true, 3, null),
  (4, 1, 'Canasta Triple', 12000, 'Tres bolas de helado con topping', 'Recursos/Nuevas imagenes/Canasta triple.jpeg', true, 4, null),
  (5, 1, 'Canasta Luna', 14000, 'Dos bolas de helado con topping especial', 'Recursos/CANASTA ESPECIAL/DSC09919.jpg', true, 5, null),
  (6, 1, 'Pingui Helado', 7000, 'Helado en canasta con topping', 'Recursos/PINGUINO/DSC00031.jpg', true, 6, null),
  (7, 2, 'Copa Fresa', 14000, 'Helado con fresas frescas', 'Recursos/COPA FRESA CON QUESO/DSC09882.jpg', true, 1, null),
  (8, 2, 'Copa Choco Brownie', 13000, 'Tres bolas de helado con topping de brownie', 'Recursos/COPA BROWNIE/DSC09843.jpg', true, 2, null),
  (9, 2, 'Copa Cítrica', 14000, 'Helado con topping cítrico fresco', 'Recursos/COPA CITRICA/DSC09956.jpg', true, 3, null),
  (10, 2, 'Araña', 9000, 'Helado a tu elección con topping especial', 'Recursos/ARAÑA/DSC00098.jpg', true, 4, null),
  (11, 2, 'Bolw Luna Cream', 18000, 'Helado cremoso para disfrutar a cucharadas', 'Recursos/CUCHAREABLE/DSC00067.jpg', true, 5, null),
  (12, 2, 'Banana Cream', 16000, 'Banana fresca con helado', 'Recursos/BANANA SPLITT/DSC09822.jpg', true, 6, null),
  (35, 2, 'Brownie con Helado', 10000, 'Brownie de chocolate tibio con una bola de helado encima y salsa de chocolate — el equilibrio perfecto entre caliente y frío', 'Recursos/Nuevas imagenes/Brownie Con Helado.jpeg', true, 7, null),
  (13, 3, 'Luna Mariposa', 11000, 'Waffles con helado y topping', 'Recursos/MARIPOSA/DSC00005.jpg', true, 1, null),
  (14, 3, 'Waffle Fruti Luna', 18000, 'Waffle con topping y helado frutal', 'Recursos/WAFFLE FRUTAL/DSC00119.jpg', true, 2, null),
  (15, 3, 'Waffle Choco Cream', 20000, 'Waffle con topping de chocolate y helado', 'Recursos/WAFFLE DULCE/DSC00357.jpg', true, 3, null),
  (16, 3, 'Waffle Solo Topping', 18000, 'Waffle con topping dulce, sin helado', 'Recursos/Nuevas imagenes/Waffle solo topping.jpeg', true, 4, null),
  (17, 3, 'Bubble Dulce Explosión', 20000, 'Waffle bubble con topping dulce', 'Recursos/BUBLE WAFFLE BISCOLATA/DSC00297.jpg', true, 5, null),
  (18, 3, 'Bubble sin Helado', 18000, 'Bubble waffle con topping, sin helado', 'Recursos/Nuevas imagenes/Bubble sin Helado.jpeg', true, 6, null),
  (19, 3, 'Bubble Fruti Luna', 20000, 'Waffle bubble con topping, fruta y helado', 'Recursos/WAFFLE CHOCOLATE FRUTAL/DSC00422.png', true, 7, null),
  (21, 4, 'Frappe Milo', 15000, 'Frappe cremoso con helado sabor Milo', 'Recursos/FRAPPE DE MILO/DSC00248.jpg', true, 1, null),
  (36, 4, 'Milo', 12000, 'Bebida fría y cremosa sabor Milo con salsa de chocolate', 'Recursos/Nuevas imagenes/Milo.jpeg', true, 2, null),
  (22, 4, 'Malteada Luna', 14000, 'Malteada Luna Rosa', 'Recursos/MALTEADA SENCILLA/DSC00149.jpg', true, 3, null),
  (23, 4, 'Malteada Milk Shake', 16000, 'Milk shake premium con helado', 'Recursos/MILL SHAKE/DSC00177.jpg', true, 4, null),
  (24, 4, 'Maracumango', 14000, 'Frappe de maracuyá y mango con helado', 'Recursos/MARACUMANGO/DSC00321.jpg', true, 5, null),
  (25, 4, 'Maracumango sin Helado', 10000, 'Frappe de maracuyá y mango', 'Recursos/Nuevas imagenes/Maracumango sin Helado.jpeg', true, 6, null),
  (26, 4, 'Fresada', 14000, 'Bebida de fresa fresca con helado', 'Recursos/FRESADA/DSC00450.png', true, 7, null),
  (27, 5, 'Ensalada de Frutas Personal', 13000, 'Fruta a elección con topping especial', 'Recursos/ENSALADA DE FRUTAS PERSONAL/DSC09782.png', true, 1, null),
  (28, 6, 'Agua Pura', 2000, 'Agua fría', 'Recursos/Bebidas/Agua pura.jpeg', true, 1, null),
  (29, 6, 'Sodas', 10000, 'Gaseosa a elección', 'Recursos/Nuevas imagenes/Sodas.jpeg', true, 2, null),
  (30, 6, 'Agua Cristal', 2500, 'Agua embotellada, fría y refrescante', 'Recursos/Bebidas/Agua cristal.jpg', true, 3, null),
  (31, 6, 'Agua Cristal Grande', 3000, 'Botella grande, ideal para compartir', 'Recursos/Bebidas/Agua cristal grande.jpg', true, 4, null),
  (32, 6, 'Soda Bretaña', 4000, 'Bebida con gas, sabor clásico', 'Recursos/Bebidas/Soda bretaña.webp', true, 5, null),
  (33, 6, 'Ginger', 3500, 'Refrescante sabor a jengibre', 'Recursos/Bebidas/Ginger.webp', true, 6, null),
  (34, 6, 'Agua Cielo con Gas', 2500, 'Agua con gas, fría y burbujeante', 'Recursos/Bebidas/Agua cielo con gas.png', true, 7, null)
on conflict (id) do nothing;

-- Las secuencias deben seguir después del id más alto, para que los
-- productos y categorías nuevos del panel no choquen con estos.
select setval(pg_get_serial_sequence('public.categorias', 'id'), (select max(id) from public.categorias));
select setval(pg_get_serial_sequence('public.productos', 'id'), (select max(id) from public.productos));

-- 3) Horarios ----------------------------------------------------
-- El sitio ya mostraba "Todos los días de 2:00 PM a 9:30 PM": se siembra ese mismo
-- horario real (0 = domingo ... 6 = sábado). horario_activo queda en
-- false: la página sigue mostrando su texto actual hasta que la dueña
-- active el horario desde el panel.
insert into public.horarios (dia_semana, abre, cierra, cerrado) values
  (0, '14:00', '21:30', false),
  (1, '14:00', '21:30', false),
  (2, '14:00', '21:30', false),
  (3, '14:00', '21:30', false),
  (4, '14:00', '21:30', false),
  (5, '14:00', '21:30', false),
  (6, '14:00', '21:30', false)
on conflict (dia_semana) do nothing;

-- 4) Configuración (la fila ya la crea 01-esquema.sql) -----------
insert into public.configuracion (id, horario_activo, cerrado_temporalmente, mensaje_cierre)
values (1, false, false, null)
on conflict (id) do nothing;
