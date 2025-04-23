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



async function createTournament() {
    // Obtener valores del formulario
    const tournamentData = {
        name: document.querySelector('#CrearTorneig input[value="Nom"]').value,
        game: document.querySelector('#CrearTorneig input[name="game"]:checked')?.id,
        competitive: document.querySelector('#CrearTorneig input[name="competitive"]:checked')?.id === 'yes',
        format: document.querySelector('#CrearTorneig input[name="format"]:checked')?.id,
        virtual: document.querySelector('#CrearTorneig input[name="virtual"]:checked')?.id === 'virtual-yes',
        matchesPerRound: document.querySelector('#CrearTorneig input[value="Num Partides Per Ronda"]').value,
        prize: document.querySelector('#CrearTorneig input[value="Premi en Metàl·lic"]').value
    };

    // Validar que todos los campos requeridos estén completos
    if (!tournamentData.name || !tournamentData.game || !tournamentData.format) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
    }

    try {
        const response = await fetch(`${url}/tournaments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tournamentData)
        });

        if (!response.ok) {
            throw new Error(`Error al crear el torneo: ${response.status}`);
        }

        const result = await response.json();
        alert("Torneo creado con éxito!");
        console.log("Respuesta del servidor:", result);
        
        // Opcional: Limpiar el formulario después de crear el torneo
        document.querySelectorAll('#CrearTorneig input[type="text"]').forEach(input => input.value = '');
        document.querySelectorAll('#CrearTorneig input[type="radio"]').forEach(radio => radio.checked = false);
        
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al crear el torneo. Por favor, intenta de nuevo.");
    }
}