/* Decoración de Halloween (tierna). Se carga solo cuando el tema está activo. */
(function(){
  "use strict";
  var CLASE = "tema-halloween";
  window.LR_TEMA = {
    activar: function(){ document.body.classList.add(CLASE); },
    desactivar: function(){ document.body.classList.remove(CLASE); }
  };
})();
