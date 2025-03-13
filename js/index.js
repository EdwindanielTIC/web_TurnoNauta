document.addEventListener("DOMContentLoaded", function (){
  
    let paginaActual = 1;
    const torneosPorPagina = 5;
    
   
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

    
    function actualizarPaginacion(seccionActiva) {
    
        const torneos = seccionActiva.querySelectorAll(".torneo-item, .torneoFinal-item");
        const totalPaginas = Math.ceil(torneos.length / torneosPorPagina);

        const paginaSpan = seccionActiva.querySelector(".pagina-actual");
        const prevButton = seccionActiva.querySelector(".prev");
        const nextButton = seccionActiva.querySelector(".next");
    

        torneos.forEach((torneo, index) => {
            const inicio = (paginaActual - 1) * torneosPorPagina;
            const fin = inicio + torneosPorPagina;
            torneo.style.display = (index >= inicio && index < fin) ? "block" : "none";
        });
    
  
        if (paginaSpan) paginaSpan.textContent = paginaActual;
        if (prevButton) prevButton.disabled = paginaActual === 1;
        if (nextButton) nextButton.disabled = paginaActual === totalPaginas;
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


    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const usuario = document.querySelector('input[type="text"]').value.trim();
        const contraseña = document.querySelector('input[type="password"]').value.trim();

        if (usuario && contraseña) {
            console.log("Inicio de sesión exitoso para:", usuario);
            mostrarSeccion('inicio');

            document.querySelectorAll('nav .boton').forEach(boton => {
                boton.classList.remove('oculto');
            });

        
            document.querySelector('.usuario span').textContent = usuario;
        } else {
            alert('⚠️ Por favor, introduce un usuario y contraseña válidos.');
        }
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


    document.getElementById('empezar').addEventListener('click', function() {
        let codi = document.getElementById('codi').value;
        if (codi.trim() !== "") {
            alert("Código ingresado: " + codi);
        } else {
            alert("Por favor, ingrese un código.");
        }
    });

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