/* Cargador de datos públicos de Luna Rosa (menú, horarios y configuración).

   Orden de preferencia:
     1) Supabase (una consulta REST con la clave anon, timeout de 5 s).
     2) La última respuesta buena guardada en localStorage.
     3) El menú embebido (menu-embebido.js).
   Si Supabase no está configurado (config.js vacío) no se hace ninguna petición. */
(function(){
  "use strict";

  var CACHE_KEY = "lr_menu_cache_v1";
  var TIMEOUT_MS = 5000;

  var cfg = window.LR_CONFIG || {};
  var URL_BASE = String(cfg.SUPABASE_URL || "").trim().replace(/\/+$/, "");
  var ANON = String(cfg.SUPABASE_ANON_KEY || "").trim();
  var configurado = !!(URL_BASE && ANON);

  /* Forma esperada: { categorias:[], productos:[], horarios:[], configuracion:{} } */
  function esValido(d){
    return !!d && Array.isArray(d.categorias) && Array.isArray(d.productos) &&
           d.productos.length > 0 && Array.isArray(d.horarios) &&
           !!d.configuracion && typeof d.configuracion === "object";
  }

  function leerCache(){
    try{
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var d = JSON.parse(raw);
      return esValido(d) ? d : null;
    }catch(e){ return null; }
  }

  function guardarCache(d){
    try{ localStorage.setItem(CACHE_KEY, JSON.stringify(d)); }catch(e){}
  }

  function embebido(){
    var d = window.LR_MENU_EMBEBIDO;
    return esValido(d) ? d : null;
  }

  function pedir(ruta, signal){
    return fetch(URL_BASE + "/rest/v1/" + ruta, {
      headers: { apikey: ANON, Authorization: "Bearer " + ANON, Accept: "application/json" },
      signal: signal
    }).then(function(r){
      if (!r.ok){ var e = new Error("HTTP " + r.status); e.status = r.status; throw e; }
      return r.json();
    });
  }

  /* Categorías con sus productos en una sola consulta. Pide categorias.disponible;
     si la columna aún no existe (SQL 05 sin ejecutar) Supabase responde 400:
     se reintenta sin ese campo y todas las secciones cuentan como disponibles. */
  var conColumnaSeccion = true;
  function pedirCategorias(cols, signal){
    var base = "categorias?select=id,nombre,orden";
    var fin = ",productos(" + cols + ")&order=orden.asc,id.asc";
    if (!conColumnaSeccion) return pedir(base + fin, signal);
    return pedir(base + ",disponible" + fin, signal).catch(function(err){
      if (err && err.status === 400){
        conColumnaSeccion = false;
        return pedir(base + fin, signal);
      }
      throw err;
    });
  }

  /* Consulta a Supabase. Rechaza si algo falla o tarda más de 5 s. */
  function desdeRed(){
    if (!configurado) return Promise.reject(new Error("Supabase sin configurar"));
    var ctl = new AbortController();
    var timer = setTimeout(function(){ ctl.abort(); }, TIMEOUT_MS);
    var cols = "id,categoria_id,nombre,precio,descripcion,imagen_url,disponible,orden,opciones";
    return Promise.all([
      pedirCategorias(cols, ctl.signal),
      pedir("horarios?select=dia_semana,abre,cierra,cerrado&order=dia_semana.asc", ctl.signal),
      pedir("configuracion?select=horario_activo,cerrado_temporalmente,mensaje_cierre&limit=1", ctl.signal)
    ]).then(function(res){
      clearTimeout(timer);
      var filas = res[0], productos = [];
      if (!Array.isArray(filas) || !Array.isArray(res[1]) || !Array.isArray(res[2])) throw new Error("Respuesta inesperada");
      var categorias = filas.map(function(c){
        (c.productos || []).forEach(function(p){
          productos.push({
            id: p.id, categoria_id: c.id, nombre: p.nombre, precio: p.precio,
            descripcion: p.descripcion, imagen_url: p.imagen_url,
            disponible: p.disponible !== false, orden: p.orden, opciones: p.opciones
          });
        });
        var cat = { id: c.id, nombre: c.nombre, orden: c.orden };
        if (c.disponible === false) cat.disponible = false;   // ausente = disponible
        return cat;
      });
      productos.sort(function(a, b){ return (a.orden - b.orden) || (a.id - b.id); });
      var datos = {
        categorias: categorias,
        productos: productos,
        horarios: res[1],
        configuracion: res[2][0] || { horario_activo: false, cerrado_temporalmente: false, mensaje_cierre: null }
      };
      if (!esValido(datos)) throw new Error("Menú vacío o incompleto");
      guardarCache(datos);
      return datos;
    }, function(err){
      clearTimeout(timer);
      throw err;
    });
  }

  window.LR_DATOS = {
    configurado: configurado,
    cache: leerCache,
    embebido: embebido,
    desdeRed: desdeRed
  };
})();
