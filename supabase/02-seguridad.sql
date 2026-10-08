-- =============================================================
-- LUNA ROSA — 02 · SEGURIDAD (RLS + Storage)
-- Ejecutar DESPUÉS de 01-esquema.sql.
--
-- Regla general:
--   · Cualquiera (con la clave anon) puede LEER categorías,
--     productos, horarios y configuración.
--   · Solo un administrador (es_admin()) puede crear, modificar o
--     borrar. Sin sesión de administrador, todo intento falla.
--   · admin_users no es accesible desde el navegador.
--
-- Seguro de re-ejecutar.
-- =============================================================


-- 1) RLS activado en todas las tablas --------------------------
alter table public.categorias    enable row level security;
alter table public.productos     enable row level security;
alter table public.horarios      enable row level security;
alter table public.configuracion enable row level security;
alter table public.admin_users   enable row level security;


-- 2) Permisos de tabla (segunda barrera además de RLS) ---------
revoke all on public.categorias, public.productos, public.horarios,
              public.configuracion, public.admin_users
  from anon, authenticated;

grant select on public.categorias, public.productos,
                public.horarios, public.configuracion
  to anon, authenticated;

grant insert, update, delete on public.categorias, public.productos,
                                public.horarios, public.configuracion
  to authenticated;

-- admin_users: sin ningún permiso para anon ni authenticated.
-- (Sin políticas + sin permisos = invisible desde el cliente.)

-- Los ids se generan con secuencias: el panel las usa al insertar.
grant usage, select on all sequences in schema public to authenticated;


-- 3) Políticas: lectura pública --------------------------------
drop policy if exists "categorias_lectura_publica" on public.categorias;
create policy "categorias_lectura_publica" on public.categorias
  for select to anon, authenticated using (true);

drop policy if exists "productos_lectura_publica" on public.productos;
create policy "productos_lectura_publica" on public.productos
  for select to anon, authenticated using (true);

drop policy if exists "horarios_lectura_publica" on public.horarios;
create policy "horarios_lectura_publica" on public.horarios
  for select to anon, authenticated using (true);

drop policy if exists "configuracion_lectura_publica" on public.configuracion;
create policy "configuracion_lectura_publica" on public.configuracion
  for select to anon, authenticated using (true);


-- 4) Políticas: escritura solo para administradores ------------
-- categorias
drop policy if exists "categorias_insert_admin" on public.categorias;
create policy "categorias_insert_admin" on public.categorias
  for insert to authenticated with check ((select public.es_admin()));
drop policy if exists "categorias_update_admin" on public.categorias;
create policy "categorias_update_admin" on public.categorias
  for update to authenticated
  using ((select public.es_admin())) with check ((select public.es_admin()));
drop policy if exists "categorias_delete_admin" on public.categorias;
create policy "categorias_delete_admin" on public.categorias
  for delete to authenticated using ((select public.es_admin()));

-- productos
drop policy if exists "productos_insert_admin" on public.productos;
create policy "productos_insert_admin" on public.productos
  for insert to authenticated with check ((select public.es_admin()));
drop policy if exists "productos_update_admin" on public.productos;
create policy "productos_update_admin" on public.productos
  for update to authenticated
  using ((select public.es_admin())) with check ((select public.es_admin()));
drop policy if exists "productos_delete_admin" on public.productos;
create policy "productos_delete_admin" on public.productos
  for delete to authenticated using ((select public.es_admin()));

-- horarios
drop policy if exists "horarios_insert_admin" on public.horarios;
create policy "horarios_insert_admin" on public.horarios
  for insert to authenticated with check ((select public.es_admin()));
drop policy if exists "horarios_update_admin" on public.horarios;
create policy "horarios_update_admin" on public.horarios
  for update to authenticated
  using ((select public.es_admin())) with check ((select public.es_admin()));
drop policy if exists "horarios_delete_admin" on public.horarios;
create policy "horarios_delete_admin" on public.horarios
  for delete to authenticated using ((select public.es_admin()));

-- configuracion
drop policy if exists "configuracion_insert_admin" on public.configuracion;
create policy "configuracion_insert_admin" on public.configuracion
  for insert to authenticated with check ((select public.es_admin()));
drop policy if exists "configuracion_update_admin" on public.configuracion;
create policy "configuracion_update_admin" on public.configuracion
  for update to authenticated
  using ((select public.es_admin())) with check ((select public.es_admin()));
drop policy if exists "configuracion_delete_admin" on public.configuracion;
create policy "configuracion_delete_admin" on public.configuracion
  for delete to authenticated using ((select public.es_admin()));

-- admin_users: RLS activo y NINGUNA política = sin acceso desde el cliente.


-- 5) Storage: bucket público "productos" -----------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'productos', 'productos', true,
  2097152,                                   -- 2 MB
  array['image/webp', 'image/jpeg', 'image/png']
)
on conflict (id) do update
  set public = true,
      file_size_limit = 2097152,
      allowed_mime_types = array['image/webp', 'image/jpeg', 'image/png'];

drop policy if exists "productos_storage_lectura" on storage.objects;
create policy "productos_storage_lectura" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'productos');

drop policy if exists "productos_storage_insert_admin" on storage.objects;
create policy "productos_storage_insert_admin" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'productos' and (select public.es_admin()));

drop policy if exists "productos_storage_update_admin" on storage.objects;
create policy "productos_storage_update_admin" on storage.objects
  for update to authenticated
  using (bucket_id = 'productos' and (select public.es_admin()))
  with check (bucket_id = 'productos' and (select public.es_admin()));

drop policy if exists "productos_storage_delete_admin" on storage.objects;
create policy "productos_storage_delete_admin" on storage.objects
  for delete to authenticated
  using (bucket_id = 'productos' and (select public.es_admin()));
