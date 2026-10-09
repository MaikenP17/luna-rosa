-- =============================================================
-- LUNA ROSA — 06 · DECORACIÓN DE TEMPORADA (HALLOWEEN)
-- Ejecutar en: Supabase Dashboard -> SQL Editor -> New query
--
-- Agrega dos columnas a la tabla "configuracion" (la fila única):
--   tema       texto. 'normal' (por defecto) o 'halloween'. Cualquier otro
--              valor la página lo trata como 'normal'.
--   tema_hasta fecha (opcional). Último día en que se muestra la
--              decoración, contado en hora de Colombia. Pasado ese día la
--              página vuelve sola a verse normal. Vacía = sin fecha límite.
--
-- Se prende y se apaga desde el panel (pestaña Horarios -> "Decoración de
-- temporada"). Mientras no ejecutes este archivo, la página y el panel
-- siguen funcionando igual que siempre (el tema simplemente es "normal").
--
-- Seguro de re-ejecutar: no borra ni cambia datos existentes. La fila
-- actual queda con tema = 'normal' y tema_hasta vacío, es decir, sin
-- ningún cambio visible para los clientes.
-- Los permisos y las políticas de 02-seguridad.sql ya cubren las columnas
-- nuevas (lectura pública, edición solo de administradoras).
--
-- Orden de ejecución: 01 -> 02 -> 03 -> 04 -> 05 -> 06
-- =============================================================

alter table public.configuracion
  add column if not exists tema text not null default 'normal';

alter table public.configuracion
  add column if not exists tema_hasta date;

-- Hace que la API de Supabase reconozca las columnas de inmediato.
notify pgrst, 'reload schema';

-- Comprobación: debe devolver 2 filas ("tema" tipo text con default 'normal'
-- y "tema_hasta" tipo date, nullable).
select column_name, data_type, column_default, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'configuracion'
  and column_name in ('tema', 'tema_hasta')
order by column_name desc;
