// function cambiarIdioma(idioma) {
//     document.getElementById("tituloBienvenida").textContent = traducciones[idioma].tituloBienvenida;
//     document.getElementById("btnResumenPerfil").textContent = traducciones[idioma].btnResumenPerfil;
//     document.getElementById("btnTorneosActivos").textContent = traducciones[idioma].btnTorneosActivos;
//     document.getElementById("btnTorneosFinalizados").textContent = traducciones[idioma].btnTorneosFinalizados;
//     document.getElementById("btnConfiguracion").textContent = traducciones[idioma].btnConfiguracion;
//     document.getElementById("btnCrearTorneo").textContent = traducciones[idioma].btnCrearTorneo;

//     document.getElementById("tituloRecuperarContrasena").textContent = traducciones[idioma].tituloRecuperarContrasena;
//     document.getElementById("inputCorreoRecuperar").placeholder = traducciones[idioma].inputCorreoRecuperar;
//     document.getElementById("btnEnviar").textContent = traducciones[idioma].btnEnviar;
//     document.getElementById("btnVolverLogin").textContent = traducciones[idioma].btnVolverLogin;

//     document.getElementById("btnInicioSesion").textContent = traducciones[idioma].btnInicioSesion;
//     document.getElementById("linkOlvidarContrasena").textContent = traducciones[idioma].linkOlvidarContrasena;
//     document.getElementById("inputCorreo").placeholder = traducciones[idioma].inputCorreo;
//     document.getElementById("inputContrasena").placeholder = traducciones[idioma].inputContrasena;

//     document.getElementById("btnCambiarFoto").textContent = traducciones[idioma].btnCambiarFoto;
//     document.getElementById("btnEliminarCuenta").textContent = traducciones[idioma].btnEliminarCuenta;
//     document.getElementById("idiomas").textContent = traducciones[idioma].idiomas;
// //añadir estos que aun no se han traducido
   
//     document.getElementById("empezar").textContent = traducciones[idioma].empezar;
//     document.getElementById("codi").textContent = traducciones[idioma].codi;
//     document.getElementById("idUsuairo").textContent = traducciones[idioma].idUsuairo;
//     document.getElementById("nomJugador").textContent = traducciones[idioma].nomJugador;
//     document.getElementById("rondasJugador").textContent = traducciones[idioma].rondasJugador;
//     document.getElementById("rontastotalJugador").textContent = traducciones[idioma].rontastotalJugador;
//     document.getElementById("torneosJugador").textContent = traducciones[idioma].torneosJugador;
//     document.getElementById("TorneosGanadosJugador").textContent = traducciones[idioma].TorneosGanadosJugador;
// }

// // Evento para detectar cambio de idioma en el selector
// document.getElementById("selectorIdioma").addEventListener("change", function() {
//     cambiarIdioma(this.value);
// });
// // 
// // Opcional: Guardar la selección en LocalStorage
// window.addEventListener("load", function () {
//     let idiomaGuardado = localStorage.getItem("idiomaSeleccionado") || "ca"; 
//     document.getElementById("selectorIdioma").value = idiomaGuardado;
//     cambiarIdioma(idiomaGuardado);
// });

// document.getElementById("selectorIdioma").addEventListener("change", function () {
//     localStorage.setItem("idiomaSeleccionado", this.value);
// });