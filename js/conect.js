
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
        let response = await fetch(`https://52.20.160.197:8443/users/login?username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contraseña)}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        // Obtener la respuesta incluso si no es OK
        let data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                alert("⚠️ L'usuari no existe o les credencials són incorrectes.");
                return;
            } else {
                alert(`⚠️ Error del servidor: ${response.status}`);
                return;
            }
        }

        // Verificar si el login fue realmente exitoso según el contenido de 'data'
        // Ajusta esta condición según la estructura de la respuesta de tu servidor
        if (data && (data.success || data.message === "Login exitoso" || data.username)) {
            alert("Inici de sessió reeixit!");
            console.log("Usuari autenticat:", data);

            // Mostrar la sección de inicio (corregido: 'inicio' con comillas)
            mostrarSeccion('inicio');

            // Hacer visibles los botones de navegación
            document.querySelectorAll('nav .boton').forEach(boton => {
                boton.classList.remove('oculto');
            });

            // Mostrar el nombre del usuario en la interfaz
            document.querySelector('.usuario span').textContent = usuario;
        } else {
            alert("⚠️ L'usuari no existe o les credencials són incorrectes.");
            console.log("Respuesta del servidor indica fallo:", data);
        }

    } catch (error) {
        console.error("Error al connectar:", error);
        alert("Error al iniciar sessió. Comprova la connexió i intenta-ho de nou.");
    } finally {
        botonInicio.disabled = false;
        botonInicio.textContent = "Inicia Sessió";
    }
});

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
