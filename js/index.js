const torneosPorPagina = 5
 let paginaActual = 1;
 function mostrarSeccion(id) {
    console.log("Cambiando a la sección:", id);

 
    document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.classList.add('oculto');
        seccion.classList.remove('activa');
    });


    const seccionActiva = document.getElementById(id);
    if (seccionActiva) {
        seccionActiva.classList.remove('oculto');
        seccionActiva.classList.add('activa');
        console.log("Sección encontrada y mostrada:", id);
        
 
        if (id === 'torneos' || id === 'torneosFinalizados') {
            paginaActual = 1; 
            actualizarPaginacion(seccionActiva);
        }
    } else {
        console.error("❌ ERROR: No se encontró la sección con ID:", id);
    }
}

  
document.addEventListener("DOMContentLoaded", function (){
  
 
    const torneosPorPagina = 5;
    
    
  function actualizarPaginacion(seccionActiva) {
    const torneos = seccionActiva.querySelectorAll(".torneo-item, .torneoFinal-item");
    const totalPaginas = Math.ceil(torneos.length / torneosPorPagina);

    torneos.forEach((torneo, index) => {
        const inicio = (paginaActual - 1) * torneosPorPagina;
        const fin = inicio + torneosPorPagina;
        torneo.style.display = (index >= inicio && index < fin) ? "block" : "none";
    });

    const paginaSpan = seccionActiva.querySelector(".pagina-actual");
    const botonPrev = seccionActiva.querySelector(".prev");
    const botonNext = seccionActiva.querySelector(".next");

    if (paginaSpan) paginaSpan.textContent = paginaActual;
    if (botonPrev) botonPrev.disabled = paginaActual === 1;
    if (botonNext) botonNext.disabled = paginaActual >= totalPaginas;
}




    document.querySelectorAll('nav .boton').forEach(boton => {
        boton.addEventListener('click', function () {
            const seccionId = this.getAttribute('data-seccion');
            if (seccionId) {
                mostrarSeccion(seccionId);
            } else {
                console.error("❌ ERROR: El botón no tiene un atributo data-seccion válido.");
            }
        });
    });

  
    const btnCambiarFoto = document.getElementById("btnCambiarFoto");
    if (btnCambiarFoto) {
        btnCambiarFoto.addEventListener("click", function () {
            mostrarSeccion("cambiarFoto");
        });
    } else {
        console.error("❌ ERROR: No se encontró el botón con ID 'btnCambiarFoto'.");
    }

    document.querySelector('.contraseñaOlvidada').addEventListener('click', function (event) {
        event.preventDefault();
        mostrarSeccion('recuperar-contrasena');
    });


    const returnButton = document.querySelector('#recuperar-contrasena button:last-of-type');
    if (returnButton) {
        returnButton.addEventListener('click', function () {
            mostrarSeccion('login');
        });
    }


 
    document.addEventListener("click", (event) => {
        const seccionActiva = document.querySelector(".seccion.activa");
        if (!seccionActiva) return;
    
        if (event.target.classList.contains("prev") && paginaActual > 1) {
            paginaActual--;
            actualizarPaginacion(seccionActiva);
        }
    
        if (event.target.classList.contains("next")) {
            const torneos = seccionActiva.querySelectorAll(".torneo-item, .torneoFinal-item");
            const totalPaginas = Math.ceil(torneos.length / torneosPorPagina);
            
            if (paginaActual < totalPaginas) {
                paginaActual++;
                actualizarPaginacion(seccionActiva);
            }
        }
    });

   

    mostrarSeccion('login');
});

/*La siguiente funcion hace lo mismo que mostrarSeccion
    oculta y luego muestra
*/ 

function irASeccion(id) {
    // First hide all sections using the same method as mostrarSeccion
    document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.classList.add('oculto');
        seccion.classList.remove('activa');
    });

    // muestra la seccion
    let seccionDestino = document.getElementById(id);
    if (seccionDestino) {
        seccionDestino.classList.remove('oculto');
        seccionDestino.classList.add('activa');
        seccionDestino.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error("❌ ERROR: No se ha encontrado la sección con ID:", id);
    }
}

//crear usuario 
function actualizarPaginacion(seccionActiva) {
    const paginaElemento = seccionActiva.querySelector('.pagina-actual');
    paginaElemento.textContent = paginaActual;  // Actualiza el número de la página actual
  
    // Si tienes más lógica para habilitar/deshabilitar los botones de paginación, añádela aquí
    const botonPrev = seccionActiva.querySelector('.prev');
    const botonNext = seccionActiva.querySelector('.next');
  
    // Lógica para habilitar/deshabilitar botones de paginación
    if (paginaActual <= 1) {
      botonPrev.disabled = true;
    } else {
      botonPrev.disabled = false;
    }
  
    // Supongamos que tienes el número total de páginas, por ejemplo 5
    const totalPaginas = 5; 
  
    if (paginaActual >= totalPaginas) {
      botonNext.disabled = true;
    } else {
      botonNext.disabled = false;
    }
  }