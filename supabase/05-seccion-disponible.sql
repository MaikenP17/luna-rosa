-- =============================================================
-- LUNA ROSA — 05 · SECCIONES DESHABILITABLES
-- Ejecutar en: Supabase Dashboard -> SQL Editor -> New query
--
-- Agrega la columna categorias.disponible. Permite "apagar" una
-- sección completa del menú (por ejemplo "Conos & Canastas") sin
-- tocar el estado individual de cada producto: mientras la sección
-- esté apagada, la página la muestra como "No disponible por ahora"
-- y no deja pedir nada de ella; al prenderla, cada producto vuelve
-- a su estado de antes.
--
-- Seguro de re-ejecutar: no borra ni cambia datos existentes. Todas
-- las secciones que ya existen quedan disponibles (true).
-- Los permisos y las políticas de 02-seguridad.sql ya cubren la
-- columna nueva (lectura pública, edición solo de administradoras).
--
-- Orden de ejecución: 01 -> 02 -> 03 -> 04 -> 05
-- =============================================================

alter table public.categorias
  add column if not exists disponible boolean not null default true;

-- Hace que la API de Supabase reconozca la columna de inmediato.
notify pgrst, 'reload schema';

-- Comprobación: debe devolver 1 fila con columna "disponible", tipo boolean y default true.
select column_name, data_type, column_default, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'categorias' and column_name = 'disponible';
