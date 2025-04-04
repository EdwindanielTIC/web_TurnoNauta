
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuario = document.getElementById("inputCorreo").value.trim();
    const contraseña = document.getElementById("inputContrasena").value.trim();
    const botonInicio = document.getElementById("btnInicioSesion");

    if (!usuario || !contraseña) {
        alert("⚠️ Por favor, introdueix un correu/nom d'usuari i contrasenya.");
        return;
    }

    botonInicio.disabled = true;
    botonInicio.textContent = "Iniciant...";

    try {
        const userData = { username: usuario, password: contraseña };
        let response = await fetch("https://52.20.160.197:8443/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            if (response.status === 401) {
                alert("⚠️ L'usuari no existe o les credencials són incorrectes.");
                return; // No inicia sesión si el usuario no existe
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        }

        let data = await response.json();
        alert("Inici de sessió reeixit!");
        console.log("Usuari autenticat:", data);

        // Mostrar la sección de inicio
        mostrarSeccion('inicio');

        // Hacer visibles los botones de navegación
        document.querySelectorAll('nav .boton').forEach(boton => {
            boton.classList.remove('oculto');
        });

        // Mostrar el nombre del usuario en la interfaz
        document.querySelector('.usuario span').textContent = usuario;

    } catch (error) {
        console.error("Error al connectar:", error);
        alert("Error al iniciar sessió. Comprova la connexió i intenta-ho de nou.");
    } finally {
        botonInicio.disabled = false;
        botonInicio.textContent = "Inicia Sessió";
    }
});

// function mostrarSeccion(id) {
//     console.log("Cambiando a la sección:", id);
//     const seccionActiva = document.getElementById(id);
//     if (!seccionActiva) {
//         console.error("❌ ERROR: No se encontró la sección con ID:", id);
//         return;
//     }

//     document.querySelectorAll('.seccion').forEach(seccion => {
//         seccion.classList.add('oculto');
//         seccion.classList.remove('activa');
//     });

//     seccionActiva.classList.remove('oculto');
//     seccionActiva.classList.add('activa');
//     console.log("Sección encontrada y mostrada:", id);

//     if (id === 'torneos' || id === 'torneosFinalizados') {
//         paginaActual = 1;
//         actualizarPaginacion(seccionActiva);
//     }
// }



//Creando usuario 

document.getElementById("loginFormUsuario").addEventListener("submit", async function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (!username || !phone || !email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    
    try {
        const userData = { username, phone, email, password };
        let response = await fetch("https://52.20.160.197:8443/users/add_user", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        let data = await response.json();
        alert("Usuario creado con éxito!");
        console.log("Usuario creado exitosamente:", data);
    } catch (error) {
        console.error("Error al conectar:", error);
        alert("Error al crear el usuario. Inténtalo de nuevo.");
    }
});
