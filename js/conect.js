const url = "https://turnonauta.asegura.dev:8443";

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuario = document.getElementById("inputCorreo").value.trim();
    const contraseña = document.getElementById("inputContrasena").value.trim();
    const botonInicio = document.getElementById("btnInicioSesion");
    // url = "https://turnonauta.asegura.dev:8443";

    if (!usuario || !contraseña) {
        alert("⚠️ Por favor, introdueix un correu/nom d'usuari i contrasenya.");
        return;
    }

    botonInicio.disabled = true;
    botonInicio.textContent = "Iniciant...";

    try {
        let response = await fetch(`${url}/users/login?username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contraseña)}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        let data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (!response.ok) {
            if (response.status === 401) {
                alert("⚠️ L'usuari no existe o les credencials són incorrectes.");
            } else {
                alert(`⚠️ Error del servidor: ${response.status}`);
            }
            return;
        }

        // Verificamos si 'data' es un número (indicador de éxito) debe de ser mayor a 0 porque si es menor a 0, eso indica que el
        if (typeof data === "number" && data >= 0) {
            alert("Usuario correcto!!");
            console.log("Usuari autenticat, ID:", data);

            mostrarSeccion('inicio');
            document.querySelectorAll('nav .boton').forEach(boton => {
                boton.classList.remove('oculto');
            });
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
        let response = await fetch(`${url}/users/add_user`, { 
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
