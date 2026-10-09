/* Decoración de Halloween tierna para Luna Rosa.
   Se carga solo cuando el tema está activo (ver menu-datos.js). Todo se dibuja con
   SVG inline: un solo sprite con <symbol> que se reutiliza con <use>. Sin imágenes,
   sin peticiones, sin temporizadores: el movimiento va en CSS (tema-halloween.css).
   Las decoraciones son aria-hidden, pointer-events:none, position:absolute y quedan
   por debajo del contenido. LR_TEMA.activar() / LR_TEMA.desactivar() las pone y quita. */
(function(){
  "use strict";

  var CLASE = "tema-halloween";
  var mqMovil = window.matchMedia("(max-width:767px)");
  var mqAncho = window.matchMedia("(min-width:1300px)");
  var mqQuieto = window.matchMedia("(prefers-reduced-motion: reduce)");

  var DIM = { calabaza:[64,60], fantasma:[56,68], murcielago:[80,44], arana:[44,48], luna:[200,200], nube:[80,40],
              telarana:[64,64], chispa:[24,24], estrella:[24,24], caramelo:[56,28], paleta:[32,62], sombrero:[72,64] };

  /* ---------- sprite: línea redondeada morada, caritas con ojitos de punto y mejillas rosadas ---------- */
  var CARA = '<use href="#th-cara"';
  var SPRITE =
  '<svg class="th-sprite" width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute"><defs>' +
  '<radialGradient id="th-halo"><stop offset=".5" stop-color="#B9A3E8" stop-opacity=".55"/><stop offset="1" stop-color="#B9A3E8" stop-opacity="0"/></radialGradient>' +
  /* guirnalda de banderines (se repite) */
  '<pattern id="th-pg" width="140" height="32" patternUnits="userSpaceOnUse">' +
    '<path d="M0 3Q70 17 140 3" class="o nf" stroke-width="1.8"/>' +
    '<path d="M9.5 6h16l-8 19z" class="f-m o" stroke-width="1.8"/><path d="M44.5 9.5h16l-8 19z" class="f-n o" stroke-width="1.8"/>' +
    '<path d="M79.5 9.5h16l-8 19z" class="f-r o" stroke-width="1.8"/><path d="M114.5 6h16l-8 19z" class="f-l o" stroke-width="1.8"/>' +
    '<g fill="#fff" opacity=".85"><circle cx="17.5" cy="11" r="1.7"/><circle cx="52.5" cy="14.5" r="1.7"/><circle cx="87.5" cy="14.5" r="1.7"/><circle cx="122.5" cy="11" r="1.7"/></g>' +
  '</pattern>' +
  /* slime: banda con goteo + gotas que se mueven */
  '<pattern id="th-ps" width="120" height="16" patternUnits="userSpaceOnUse"><g class="f-v">' +
    '<rect width="120" height="7"/><rect x="13" y="4" width="10" height="8" rx="5"/><rect x="55" y="4" width="8" height="5" rx="4"/><rect x="91" y="4" width="11" height="9" rx="5.5"/>' +
    '</g><g fill="#fff" opacity=".6"><rect x="16" y="3" width="2" height="4" rx="1"/><rect x="94.5" y="3" width="2" height="4" rx="1"/></g></pattern>' +
  '<pattern id="th-pa" width="120" height="16" patternUnits="userSpaceOnUse"><g class="f-v"><circle cx="18" cy="7" r="5"/><circle cx="96.5" cy="7.5" r="5.5"/></g></pattern>' +
  '<pattern id="th-pb" width="120" height="16" patternUnits="userSpaceOnUse"><g class="f-v"><circle cx="59" cy="5.5" r="4"/></g></pattern>' +
  '</defs>' +
  '<symbol id="th-cara" viewBox="0 0 24 12"><circle cx="6" cy="3" r="1.7" class="f-m"/><circle cx="18" cy="3" r="1.7" class="f-m"/>' +
    '<ellipse cx="2.8" cy="7.2" rx="2.8" ry="1.9" class="f-r" opacity=".6"/><ellipse cx="21.2" cy="7.2" rx="2.8" ry="1.9" class="f-r" opacity=".6"/>' +
    '<path d="M9.6 6q2.4 3 4.8 0" class="o nf" stroke-width="1.6"/></symbol>' +
  '<symbol id="th-calabaza" viewBox="0 0 64 60"><ellipse cx="20" cy="36" rx="17" ry="20" class="f-n o"/><ellipse cx="44" cy="36" rx="17" ry="20" class="f-n o"/>' +
    '<ellipse cx="32" cy="36" rx="14" ry="21" class="f-n o"/><path d="M30 16q0-8 5-11 1 6 0 11z" class="f-v o"/><path d="M36 14q8-8 15-2-6 7-15 2z" class="f-v o"/>' +
    '<path d="M10 31q2-7 8-9" class="nf" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>' + CARA + ' x="20" y="33" width="24" height="12"/></symbol>' +
  '<symbol id="th-fantasma" viewBox="0 0 56 68"><path d="M7 62V28C7 13 16 4 28 4s21 9 21 24v34q-5 6-10.5 0-5 6-10.5 0-5 6-10.5 0-5 6-10.5 0z" class="f-b o"/>' +
    '<ellipse cx="6" cy="40" rx="5" ry="3.5" class="f-b o" transform="rotate(-25 6 40)"/><ellipse cx="50" cy="40" rx="5" ry="3.5" class="f-b o" transform="rotate(25 50 40)"/>' +
    '<path d="M13 52q1 7 6 9" class="nf" stroke="#B9A3E8" stroke-width="2.4" stroke-linecap="round"/>' + CARA + ' x="16" y="23" width="24" height="12"/></symbol>' +
  '<symbol id="th-murcielago" viewBox="0 0 80 44"><g class="f-m o"><path d="M30 20C24 8 10 8 2 16c5 1 7 4 7 8 4-2 8-1 10 3 3-3 8-2 10 2 2-1 3-1 4 0z"/>' +
    '<path d="M50 20C56 8 70 8 78 16c-5 1-7 4-7 8-4-2-8-1-10 3-3-3-8-2-10 2-2-1-3-1-4 0z"/></g>' +
    '<path d="M32 15L34 4l7 8M48 15L46 4l-7 8" class="f-l o"/><circle cx="40" cy="25" r="13" class="f-l o"/>' + CARA + ' x="29" y="21" width="22" height="11"/></symbol>' +
  '<symbol id="th-arana" viewBox="0 0 44 48"><path class="o nf" d="M14 25q-8-8-12-3M13 29q-9-2-12 4M14 33q-8 2-9 9M17 37q-5 2-5 8M30 25q8-8 12-3M31 29q9-2 12 4M30 33q8 2 9 9M27 37q5 2 5 8"/>' +
    '<circle cx="22" cy="28" r="13" class="f-l o"/>' + CARA + ' x="11" y="23" width="22" height="11"/></symbol>' +
  '<symbol id="th-luna" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="url(#th-halo)"/><circle cx="100" cy="100" r="58" class="f-c" stroke="#B9A3E8" stroke-width="3"/>' +
    '<g class="f-l" opacity=".35"><circle cx="76" cy="76" r="9"/><circle cx="128" cy="126" r="12"/><circle cx="124" cy="70" r="5"/><circle cx="70" cy="128" r="5"/></g>' + CARA + ' x="76" y="94" width="48" height="24"/></symbol>' +
  '<symbol id="th-nube" viewBox="0 0 80 40"><path d="M14 34a11 11 0 0 1-1-22 16 16 0 0 1 30-3 13 13 0 0 1 22 10 10 10 0 0 1-2 15z" fill="#fff" fill-opacity=".85" stroke="#B9A3E8" stroke-width="2" stroke-linejoin="round"/></symbol>' +
  '<symbol id="th-telarana" viewBox="0 0 64 64"><path class="w" d="M0 0L64 2M0 0L58 26M0 0L45 45M0 0L26 58M0 0L2 64M15.0 0.5Q12.6 2.9 13.7 6.1M13.7 6.1Q10.6 7.3 10.6 10.6M10.6 10.6Q7.3 10.6 6.1 13.7M6.1 13.7Q2.9 12.6 0.5 15.0M29.0 0.9Q24.3 5.6 26.5 11.9M26.5 11.9Q20.5 14.2 20.5 20.5M20.5 20.5Q14.2 20.5 11.9 26.5M11.9 26.5Q5.6 24.3 0.9 29.0M43.0 1.3Q36.0 8.3 39.2 17.6M39.2 17.6Q30.4 21.0 30.4 30.4M30.4 30.4Q21.0 30.4 17.6 39.2M17.6 39.2Q8.3 36.0 1.3 43.0M57.0 1.8Q47.8 11.0 52.0 23.3M52.0 23.3Q40.4 27.8 40.3 40.3M40.3 40.3Q27.8 40.4 23.3 52.0M23.3 52.0Q11.0 47.8 1.8 57.0"/></symbol>' +
  '<symbol id="th-chispa" viewBox="0 0 24 24"><path d="M12 1q1.5 9 11 11-9.5 2-11 11-1.5-9-11-11 9.5-2 11-11z" fill="currentColor"/></symbol>' +
  '<symbol id="th-estrella" viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" class="f-n o"/></symbol>' +
  '<symbol id="th-caramelo" viewBox="0 0 56 28"><g class="o" style="fill:var(--cc,var(--th-nar))"><path d="M17 14L3 4v20z"/><path d="M39 14l14-10v20z"/><circle cx="28" cy="14" r="11"/></g>' +
    '<path d="M22 7q7 7 0 14" class="nf" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".75"/></symbol>' +
  '<symbol id="th-paleta" viewBox="0 0 32 62"><rect x="14" y="28" width="4" height="32" rx="2" class="f-c o"/><circle cx="16" cy="16" r="14" class="o" style="fill:var(--cc,var(--th-lav))"/>' +
    '<path d="M16 16a3 3 0 0 1 6 0 6 6 0 0 1-12 0 9 9 0 0 1 18 0" class="nf" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></symbol>' +
  '<symbol id="th-sombrero" viewBox="0 0 72 64"><ellipse cx="36" cy="54" rx="33" ry="8" class="f-m o"/><path d="M14 54L31 14Q34 6 42 6Q47 6 49 11Q44 10 42 15L58 54z" class="f-m o"/>' +
    '<path d="M18.3 44H53.9L56.4 50H15.7z" class="f-n o"/><use href="#th-chispa" x="30" y="40" width="12" height="12" class="c-c"/></symbol>' +
  '</svg>';

  /* <svg> listo para pegar: el viewBox igual al del símbolo hace que alcance con fijar el ancho en CSS */
  function S(id, cls, style){
    var d = DIM[id];
    return '<svg class="' + cls + '"' + (style ? ' style="' + style + '"' : "") + ' viewBox="0 0 ' + d[0] + " " + d[1] +
           '" aria-hidden="true" focusable="false"><use href="#th-' + id + '" width="' + d[0] + '" height="' + d[1] + '"/></svg>';
  }
  function chispas(lista){
    return lista.map(function(e){
      return S("chispa", "th-chi c-" + e[3], "left:" + e[0] + "%;top:" + e[1] + "%;width:" + e[2] + "px");
    }).join("");
  }
  function franja(cls, patron, alto){
    return '<svg class="' + cls + '" height="' + alto + '" aria-hidden="true" focusable="false"><rect width="100%" height="' + alto + '" fill="url(#' + patron + ')"/></svg>';
  }

  var estado = { activo:false, io:null, ro:null, mo:null, capaHero:null, quitarEscuchas:null };

  /* ---------- piezas ---------- */
  function htmlHero(m){
    var B = "var(--banner-h)";
    var h = S("luna", "th-luna") + S("nube", "th-nube th-n1") + (m ? "" : S("nube", "th-nube th-n2")) +
      S("telarana", "th-web th-wl") + S("telarana", "th-web th-wr") +
      franja("th-gui" + (m ? "" : " th-a"), "th-pg", 32);
    /* murciélagos que cruzan en momentos distintos */
    var murci = m
      ? [["+ 96px", "27s", "2s", "20vw"], ["+ 132px", "33s", "10s", "62vw"], ["+ 84px", "38s", "19s", "42vw"]]
      : [["+ 96px", "26s", "3s", "22vw"], ["+ 128px", "31s", "11s", "64vw"], ["+ 80px", "37s", "18s", "40vw"]];
    murci.forEach(function(b){
      h += S("murcielago", "th-bat th-a", "top:calc(" + B + " " + b[0] + " + 77px);--d:" + b[1] + ";--w:" + b[2] + ";--bx:" + b[3]);
    });
    /* arañitas colgando de un hilo */
    h += '<div class="th-ara th-a th-ara1"><i class="th-hilo"></i>' + S("arana", "") + "</div>";
    if (!m) h += '<div class="th-ara th-a th-ara2"><i class="th-hilo"></i>' + S("arana", "") + "</div>";
    /* fantasmitas */
    h += '<div class="th-fan th-a th-fan1">' + S("fantasma", "") + "</div>";
    if (!m) h += '<div class="th-fan th-a th-fan2">' + S("fantasma", "") + "</div>";
    /* caramelos y paletas */
    h += '<div class="th-dulce th-d1' + (m ? "" : " th-a") + '">' + S("caramelo", "", "--cc:var(--th-lav)") + "</div>";
    if (!m) h += '<div class="th-dulce th-d2">' + S("paleta", "", "--cc:var(--rosa-medio)") + "</div>";
    h += S("caramelo", "th-ds th-s1", "--cc:var(--th-nar)") + S("paleta", "th-ds th-s2", "--cc:var(--th-nar)");
    if (!m) h += S("caramelo", "th-ds th-s3", "--cc:var(--rosa-principal)") + S("paleta", "th-ds th-s4", "--cc:var(--th-lav)");
    /* estrellitas y chispas (dos capas que titilan a destiempo; las chispas de las telarañas van en la segunda) */
    var web = [["calc(var(--web) * .34)", "calc(" + B + " + 91px + var(--web) * .34)"], ["calc(var(--web) * .62)", "calc(" + B + " + 91px + var(--web) * .62)"]];
    var wch = "";
    web.forEach(function(p, i){
      wch += S("chispa", "th-chi c-" + (i ? "r" : "n"), "left:" + p[0] + ";top:" + p[1] + ";width:" + (i ? 8 : 11) + "px") +
             S("chispa", "th-chi c-" + (i ? "n" : "r"), "right:" + p[0] + ";top:" + p[1] + ";width:" + (i ? 8 : 11) + "px");
    });
    if (m){
      h += '<div class="th-est th-a">' + wch + chispas([[3,30,12,"n"],[93,27,12,"r"],[5,62,10,"m"],[91,58,11,"l"],[89,80,10,"n"],[12,88,10,"r"]]) + "</div>";
    } else {
      h += '<div class="th-est th-a">' + chispas([[4,22,16,"n"],[11,40,11,"r"],[17,19,13,"m"],[7,62,12,"l"],[93,24,15,"r"],[86,48,11,"n"],[96,66,13,"m"],[80,17,11,"l"],[25,72,10,"r"],[75,76,12,"n"]]) + "</div>" +
           '<div class="th-est th-a th-est2">' + wch + chispas([[2,36,12,"m"],[14,53,15,"n"],[22,29,10,"l"],[9,82,12,"r"],[90,39,12,"l"],[83,61,14,"m"],[97,53,10,"n"],[70,22,10,"r"],[88,84,13,"l"]]) + "</div>";
    }
    return h + S("sombrero", "th-sombrero");
  }

  function htmlSlime(m){
    return franja("th-sb", "th-ps", 16) + franja("th-gt th-a th-ga", "th-pa", 16) + (m ? "" : franja("th-gt th-a th-gb", "th-pb", 16));
  }

  function htmlRiel(){
    var it = [["l",6,"fantasma",1],["r",17,"caramelo",0],["l",31,"calabaza",0],["r",46,"fantasma",1],["l",63,"paleta",0],["r",78,"calabaza",0],["l",88,"fantasma",1],["r",92,"paleta",0]];
    return it.map(function(e){
      var tag = S(e[2], "", e[2] === "caramelo" ? "--cc:var(--th-lav)" : e[2] === "paleta" ? "--cc:var(--th-nar)" : "");
      return '<div class="th-obs th-r' + e[0] + " th-r-" + e[2] + '" style="top:' + e[1] + '%">' + (e[3] ? '<div class="th-a th-fl">' + tag + "</div>" : tag) + "</div>";
    }).join("");
  }

  function htmlPie(m){
    var f = m
      ? [S("calabaza", ""), S("fantasma", "th-a th-bob"), S("caramelo", "", "--cc:var(--th-lav)"), S("fantasma", "th-a th-bob th-bob2"), S("calabaza", "")]
      : [S("calabaza", ""), S("fantasma", "th-a th-bob"), S("caramelo", "", "--cc:var(--th-lav)"), S("calabaza", ""), S("caramelo", "", "--cc:var(--th-nar)"), S("fantasma", "th-a th-bob th-bob2"), S("calabaza", "")];
    return '<div class="th-x th-pie" aria-hidden="true"><div class="th-fila">' + f.join("") + '</div><p class="th-feliz">Feliz Halloween</p></div>' +
           S("telarana", "th-x th-fweb th-wl") + S("telarana", "th-x th-fweb th-wr");
  }

  /* ---------- construcción ---------- */
  function poner(padre, html, cls, antes){
    if (!padre) return null;
    var d = document.createElement("div");
    d.className = "th-x " + cls;
    d.setAttribute("aria-hidden", "true");
    d.innerHTML = html;
    if (antes) padre.insertBefore(d, padre.firstChild); else padre.appendChild(d);
    return d;
  }

  /* Calabaza junto a cada título de sección, telarañas en el borde de algunas, resalte de "Halloween".
     Se repite cada vez que el menú se vuelve a pintar. */
  function secciones(){
    var m = mqMovil.matches;
    var bloques = document.querySelectorAll(".cat-block");
    for (var i = 0; i < bloques.length; i++){
      var b = bloques[i];
      if (b.querySelector(".th-x")) continue;
      var t = b.querySelector(".cat-title");
      if (t){
        t.insertAdjacentHTML("afterbegin", S("calabaza", "th-x th-tit th-t1"));
        if (!m) t.insertAdjacentHTML("beforeend", S(i % 2 ? "fantasma" : "calabaza", "th-x th-tit th-t2"));
        if (/halloween/i.test(t.textContent)) b.classList.add("th-hw");
      }
      if (i % 3 === 1) b.insertAdjacentHTML("afterbegin", S("telarana", "th-x th-webs " + (i % 2 ? "th-wl" : "th-wr")));
    }
  }

  /* Posición del logo grande: de ahí salen el sombrerito y la altura de los adornos laterales. */
  function medir(){
    var capa = estado.capaHero, img = document.querySelector(".hero-logo");
    if (!capa || !img || img.tagName !== "IMG" || !img.naturalWidth) return;
    var W = img.offsetWidth, H = img.offsetHeight, L = img.offsetLeft, T = img.offsetTop;
    if (!W) return;
    var hw = Math.max(30, Math.round(W * 0.15)), hh = hw * 64 / 72;
    var s = capa.style;
    s.setProperty("--lt", T + "px");
    s.setProperty("--lh", H + "px");
    s.setProperty("--hw", hw + "px");
    s.setProperty("--hx", Math.round(L + W * 0.246 - hw / 2) + "px");
    s.setProperty("--hy", Math.round(T + H * 0.2526 - hh * 0.84 + hh * 0.05) + "px");
    if (!capa.classList.contains("th-hat")){
      var anims = img.getAnimations ? img.getAnimations() : [];
      Promise.all(anims.map(function(a){ return a.finished; })).then(function(){ capa.classList.add("th-hat"); }, function(){ capa.classList.add("th-hat"); });
    }
  }

  function construir(){
    var m = mqMovil.matches;
    document.body.insertAdjacentHTML("beforeend", SPRITE);
    var hero = document.querySelector(".hero");
    estado.capaHero = poner(hero, htmlHero(m), "th-hero" + (m ? " th-m" : ""));
    poner(document.querySelector("header"), htmlSlime(m), "th-slime");
    if (!m && mqAncho.matches) poner(document.getElementById("menu"), htmlRiel(), "th-riel");
    var pie = document.querySelector("footer");
    if (pie) pie.insertAdjacentHTML("beforeend", htmlPie(m));
    secciones();
    medir();

    /* las animaciones fuera de pantalla se pausan */
    estado.io = new IntersectionObserver(function(es){
      es.forEach(function(e){ e.target.classList.toggle("th-off", !e.isIntersecting); });
    }, { rootMargin: "80px" });
    document.querySelectorAll(".th-hero, .th-pie, .th-obs").forEach(function(n){ estado.io.observe(n); });
  }

  function quitar(){
    if (estado.io){ estado.io.disconnect(); estado.io = null; }
    var nodos = document.querySelectorAll(".th-x, .th-sprite, .th-burst");
    for (var i = 0; i < nodos.length; i++) nodos[i].remove();
    document.querySelectorAll(".th-hw").forEach(function(b){ b.classList.remove("th-hw"); });
    estado.capaHero = null;
  }

  /* ---------- mini estallido al agregar al carrito (solo transform y opacity, < 700 ms) ---------- */
  var BURST = ["estrella", "chispa", "caramelo", "chispa", "estrella", "caramelo"];
  var COL = ["n", "r", "m", "l", "n", "r"];
  function estallido(e){
    if (!estado.activo || mqQuieto.matches || !e.target.closest) return;
    var b = e.target.closest(".add-btn:not(:disabled), .qty-plus");
    if (!b) return;
    try{
      var r = b.getBoundingClientRect();
      var viejos = document.querySelectorAll(".th-burst");
      if (viejos.length >= 3) viejos[0].remove();
      var c = document.createElement("div");
      c.className = "th-burst";
      c.setAttribute("aria-hidden", "true");
      c.style.left = Math.round(r.left + r.width / 2 + window.pageXOffset) + "px";
      c.style.top = Math.round(r.top + r.height / 2 + window.pageYOffset) + "px";
      c.innerHTML = BURST.map(function(id, i){
        var a = (i / BURST.length) * 6.2832 - 1.2, d = 34 + (i % 2) * 14;
        var st = "--dx:" + Math.round(Math.cos(a) * d) + "px;--dy:" + Math.round(Math.sin(a) * d - 8) + "px;--r:" + (i % 2 ? 140 : -140) + "deg;" + (id === "caramelo" ? "--cc:var(--th-lav);" : "");
        return S(id, "th-bu c-" + COL[i], st);
      }).join("");
      document.body.appendChild(c);
      c.lastChild.addEventListener("animationend", function(){ c.remove(); });
    }catch(err){}
  }

  /* ---------- ciclo de vida ---------- */
  function pausar(){ document.body.classList.toggle("th-pausa", document.hidden); }
  function reconstruir(){ if (!estado.activo) return; quitar(); construir(); }

  function activar(){
    if (estado.activo) return;
    estado.activo = true;
    document.body.classList.add(CLASE);
    construir();
    pausar();
    document.addEventListener("visibilitychange", pausar);
    document.addEventListener("click", estallido, true);
    mqMovil.addEventListener("change", reconstruir);
    mqAncho.addEventListener("change", reconstruir);
    var cont = document.getElementById("menuContainer");
    if (cont && window.MutationObserver){
      estado.mo = new MutationObserver(secciones);
      estado.mo.observe(cont, { childList: true });
    }
    if (window.ResizeObserver){
      estado.ro = new ResizeObserver(medir);
      var img = document.querySelector(".hero-logo"), hero = document.querySelector(".hero");
      if (img) estado.ro.observe(img);
      if (hero) estado.ro.observe(hero);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
  }

  function desactivar(){
    if (!estado.activo) return;
    estado.activo = false;
    document.removeEventListener("visibilitychange", pausar);
    document.removeEventListener("click", estallido, true);
    mqMovil.removeEventListener("change", reconstruir);
    mqAncho.removeEventListener("change", reconstruir);
    if (estado.mo){ estado.mo.disconnect(); estado.mo = null; }
    if (estado.ro){ estado.ro.disconnect(); estado.ro = null; }
    quitar();
    document.body.classList.remove(CLASE, "th-pausa");
  }

  window.LR_TEMA = { activar: activar, desactivar: desactivar };
})();
