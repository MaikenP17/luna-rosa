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

  /* Configuración. Pide configuracion.tema y tema_hasta; si las columnas aún no
     existen (SQL 06 sin ejecutar) Supabase responde 400: se reintenta sin esos
     campos y el tema cuenta como "normal". */
  var conColumnasTema = true;
  function pedirConfig(signal){
    var base = "configuracion?select=horario_activo,cerrado_temporalmente,mensaje_cierre";
    if (!conColumnasTema) return pedir(base + "&limit=1", signal);
    return pedir(base + ",tema,tema_hasta&limit=1", signal).catch(function(err){
      if (err && err.status === 400){
        conColumnasTema = false;
        return pedir(base + "&limit=1", signal);
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
      pedirConfig(ctl.signal)
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

  /* ===== Decoración de temporada =====
     Con el tema "normal" no se descarga nada. Si está activo, tema-halloween.css
     y tema-halloween.js se piden en un momento libre, después de pintar el menú. */
  var TEMA_VER = "2";
  var temaActual = "normal";

  /* Fecha de hoy en Colombia, "AAAA-MM-DD" (Colombia es UTC-5 todo el año). */
  function hoyBogota(){
    try{
      return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    }catch(e){
      return new Date(Date.now() - 5 * 3600 * 1000).toISOString().slice(0, 10);
    }
  }

  /* "halloween" o "normal". ?tema=halloween / ?tema=normal fuerza el tema solo
     para quien abre ese enlace, sin tocar la base de datos. */
  function temaDe(conf){
    var forzado = null;
    try{ forzado = new URLSearchParams(location.search).get("tema"); }catch(e){}
    if (forzado === "halloween" || forzado === "normal") return forzado;
    if (!conf || conf.tema !== "halloween") return "normal";
    var hasta = String(conf.tema_hasta == null ? "" : conf.tema_hasta).slice(0, 10);
    if (!hasta) return "halloween";
    return hoyBogota() <= hasta ? "halloween" : "normal";
  }

  function cargarTema(){
    var api = window.LR_TEMA;
    if (api){ api.activar(); return; }
    var faltan = 2, fallo = false;
    function listo(){
      if (--faltan > 0 || fallo || temaActual !== "halloween") return;
      if (window.LR_TEMA) window.LR_TEMA.activar();
    }
    function error(){ fallo = true; }
    var css = document.createElement("link");
    css.rel = "stylesheet"; css.href = "tema-halloween.css?v=" + TEMA_VER;
    css.onload = listo; css.onerror = error;
    var js = document.createElement("script");
    js.src = "tema-halloween.js?v=" + TEMA_VER; js.async = true;
    js.onload = listo; js.onerror = error;
    document.head.appendChild(css);
    document.head.appendChild(js);
  }

  function aplicarTema(conf){
    var t = temaDe(conf);
    if (t === temaActual) return;
    temaActual = t;
    if (t === "halloween"){
      /* después de que la página terminó de cargar y el navegador esté libre */
      var iniciar = function(){ if (temaActual === "halloween") cargarTema(); };
      var libre = function(){ if (window.requestIdleCallback) requestIdleCallback(iniciar, { timeout: 2500 }); else setTimeout(iniciar, 600); };
      if (document.readyState === "complete") libre();
      else window.addEventListener("load", libre, { once: true });
    } else if (window.LR_TEMA){
      window.LR_TEMA.desactivar();
    }
  }

  window.LR_DATOS = {
    configurado: configurado,
    cache: leerCache,
    embebido: embebido,
    desdeRed: desdeRed,
    aplicarTema: aplicarTema,
    temaDe: temaDe
  };
})();
