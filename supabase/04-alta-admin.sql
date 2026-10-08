-- =============================================================
-- LUNA ROSA — 04 · DAR DE ALTA A LA DUEÑA COMO ADMINISTRADORA
--
-- ANTES DE EJECUTAR (obligatorio):
--   1. En Supabase: Authentication -> Users -> "Add user" ->
--      "Create new user". Escribe el correo y una contraseña, y deja
--      marcada la casilla "Auto Confirm User".
--   2. Edita la línea de abajo: cambia CORREO_AQUI por ese mismo
--      correo (déjalo entre comillas simples, en minúsculas).
--   3. Ahora sí, ejecuta este archivo.
--
-- Si no cambias CORREO_AQUI, no pasa nada malo: no se inserta nadie.
-- Seguro de re-ejecutar.
-- =============================================================

insert into public.admin_users (user_id)
select id from auth.users where email = 'CORREO_AQUI'
on conflict (user_id) do nothing;

-- Comprobación: debe mostrar 1 fila con el correo de la dueña.
select u.email, a.user_id
from public.admin_users a
join auth.users u on u.id = a.user_id;
