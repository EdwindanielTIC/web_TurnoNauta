const url = "https://turnonauta.asegura.dev:8443";

//el dom es importante para que me muestre los torenos activos, antes de que se cargue mi html
document.addEventListener("DOMContentLoaded", () => {
    cargarTorneosActivos();
    obtenerTorneosFinalizados();
});


async function fetchUserData(userId) {
    try {
        const response = await fetch(`${url}/users/user_statistics?user_id=${userId}`);
        if (!response.ok) throw new Error();

        const userData = await response.json();

        document.getElementById('idCodi').innerHTML = `<strong>ID:</strong> ${userData.id ?? 'No disponible'}`;
        document.getElementById('nomJugador').innerHTML = `<strong>NOM:</strong> ${userData.username || 'No disponible'}`;
        document.getElementById('rondasJugador').innerHTML = `<strong>RONDAS GANADAS:</strong> ${userData.rounds_won ?? 'No disponible'}`;
        document.getElementById('rontastotalJugador').innerHTML = `<strong>RONDAS TOTAL:</strong> ${userData.rounds_played ?? 'No disponible'}`;
        document.getElementById('torneosJugador').innerHTML = `<strong>TORNEOS:</strong> ${userData.tournaments_played ?? 'No disponible'}`;
        document.getElementById('TorneosGanadosJugador').innerHTML = `<strong>TORNEOS GANADOS:</strong> ${userData.tournaments_won ?? 'No disponible'}`;
    } catch {
        alert("Error al obtener los datos del usuario.");
    }
}

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuario = document.getElementById("inputCorreo").value.trim();
    const contraseña = document.getElementById("inputContrasena").value.trim();
    const botonInicio = document.getElementById("btnInicioSesion");

    if (!usuario || !contraseña) return alert("⚠️ Introdueix correu/usuari i contrasenya.");

    botonInicio.disabled = true;
    botonInicio.textContent = "Iniciant...";

    try {
        const response = await fetch(`${url}/users/login?username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contraseña)}`);
        const data = await response.json();

        if (!response.ok || typeof data !== "number" || data < 0) {
            alert("⚠️ Credencials incorrectes o error de servidor.");
            return;
        }

        localStorage.setItem('userId', data);
        await fetchUserData(data);
        mostrarSeccion('inicio');
        document.querySelectorAll('nav .boton').forEach(b => b.classList.remove('oculto'));
        document.querySelector('.usuario span').textContent = usuario;

    } catch {
        alert("Error al iniciar sessió.");
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
    const tournamentData = {
      nom: document.querySelector('#tournament-name').value,
      joc: document.querySelector('#CrearTorneig input[name="game"]:checked')?.id,
      usuari_organitzador: 1, 
      competitiu: document.querySelector('#CrearTorneig input[name="competitive"]:checked')?.id === 'yes',
      virtual: document.querySelector('#CrearTorneig input[name="virtual"]:checked')?.id === 'virtual-yes',
      format: document.querySelector('#CrearTorneig input[name="format"]:checked')?.id,
      premi: document.querySelector('#tournament-prize').value,
      num_jugadors: parseInt(document.querySelector('#matches-per-round').value),
      data_d_inici: document.querySelector('#start-date').value,
      data_final: document.querySelector('#end-date').value
    };
  
    if (!tournamentData.nom || !tournamentData.joc || !tournamentData.format || !tournamentData.data_d_inici || !tournamentData.data_final) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
  
    try {
      const response = await fetch(`${url}/tournaments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData)
      });
  
      if (!response.ok) throw new Error(`Error al crear el torneo: ${response.status}`);
  
      const result = await response.json();
      alert("Torneo creado con éxito!");
      console.log("Respuesta del servidor:", result);
  
      // Limpiar formulario
      document.querySelectorAll('#CrearTorneig input[type="text"], #CrearTorneig input[type="date"], #CrearTorneig input[type="number"]').forEach(i => i.value = '');
      document.querySelectorAll('#CrearTorneig input[type="radio"]').forEach(r => r.checked = false);
  
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al crear el torneo.");
    }
  }





/// obtener torneos finzalidos 

async function obtenerTorneosFinalizados() {
    try {
        const respuesta = await fetch('https://turnonauta.asegura.dev:8443/tournaments/ended');
        if (!respuesta.ok) {
            throw new Error(`Error al obtener torneos: ${respuesta.statusText}`);
        }
        const torneos = await respuesta.json();
        // Limpiar la lista actual
        const lista = document.querySelector('#torneosFinalizados .torneo-lista');
        lista.innerHTML = '';
        // Iterar y agregar los torneos
        torneos.forEach(torneo => {
            const div = document.createElement('div');
            div.classList.add('torneoFinal-item');
            div.onclick = () => cargarDetallesTorneofin(torneo.id_torneig, torneo.joc, torneo.format);

            div.innerHTML = `
                ${torneo.nom} <span>
                Codi: ${torneo.id_torneig} |
                Joc: ${torneo.joc} |
                Format: ${torneo.format} |
                Data fi : ${torneo.data_final} 
                Jugadors: ${torneo.num_jugadors}</span>

            `;

            lista.appendChild(div);
        });

    } catch (error) {
        console.error('Hubo un error al cargar los torneos:', error);
    }
}


async function cargarDetallesTorneofin(codigoTorneo, nombreJuego, formato) {
  try {
    const response = await fetch(`https://turnonauta.asegura.dev:8443/users/users_in_tournament?torneig_id=${codigoTorneo}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los jugadores');
    }

    const jugadores = await response.json();

    // Mostrar detalles del torneo
    document.getElementById('detalleCodi').textContent = `CODI: ${codigoTorneo}`;
    document.getElementById('detalleJoc').textContent = nombreJuego;
    document.getElementById('detalleFormat').textContent = `Format: ${formato}`;

    // Limpiar y rellenar el ranking
    const rankingContainer = document.getElementById('rankingContainer');
    rankingContainer.innerHTML = '';

    jugadores.forEach((jugador, index) => {
      const div = document.createElement('div');
      div.classList.add('ranking');

      // Mostrar posición, nombre y puntos
      div.innerHTML = `
        <span class="position">#${index + 1}</span>
        <span class="name">${jugador.username}</span>
        <span class="points">${jugador.punts} pts</span>
      `;

      rankingContainer.appendChild(div);
    });

    irASeccion('DetallesTorneoFin');

  } catch (error) {
    console.error('Error al cargar los detalles del torneo:', error);
  }
}




  /// torenos activos 
  async function cargarTorneosActivos() {
    const listaTorneos = document.querySelector(".torneo-lista");
    listaTorneos.innerHTML = "Carregant tornejos...";

    try {
        const response = await fetch(`${url}/tournaments/active`);
        if (!response.ok) throw new Error("No s'ha pogut carregar la llista de tornejos.");

        const torneos = await response.json();
        console.log("Respuesta de la API:", torneos);

        if (torneos.length === 0) {
            listaTorneos.innerHTML = "<p>No hi ha tornejos actius.</p>";
            return;
        }

        listaTorneos.innerHTML = torneos.map(torneo => {
            const formato = torneo.format === "Round Robin" ? "Round Robin" : "Elim.";
            const joc = torneo.joc.charAt(0).toUpperCase() + torneo.joc.slice(1);
            return `
                <div class="torneo-item" onclick="irASeccion('TorenoSuis')">
                    <strong>${torneo.nom}</strong>
                    <span>
                        Codi: ${torneo.id_torneig} | 
                        Joc: ${joc} | 
                        Format: ${formato} | 
                        Jugadors: ${torneo.num_jugadors}
                    </span>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error("Error carregant tornejos:", error);
        listaTorneos.innerHTML = "<p>Error al carregar els tornejos.</p>";
    }
}


//EMPAREJAMIENTO 

async function cargarTorneosActivos() {
    const listaTorneos = document.querySelector(".torneo-lista");
    listaTorneos.innerHTML = "Carregant tornejos...";

    try {
        const response = await fetch(`${url}/tournaments/active`);
        if (!response.ok) throw new Error("No s'ha pogut carregar la llista de tornejos.");

        const torneos = await response.json();
        console.log("Respuesta de la API:", torneos);

        if (torneos.length === 0) {
            listaTorneos.innerHTML = "<p>No hi ha tornejos actius.</p>";
            return;
        }

        listaTorneos.innerHTML = torneos.map(torneo => {
            const formato = torneo.format === "Round Robin" ? "Round Robin" : "Elim.";
            const joc = torneo.joc.charAt(0).toUpperCase() + torneo.joc.slice(1);
            return `
                <div class="torneo-item" onclick="seleccionarTorneo(${torneo.id_torneig})">
                    <strong>${torneo.nom}</strong>
                    <span>
                        Codi: ${torneo.id_torneig} | 
                        Joc: ${joc} | 
                        Format: ${formato} | 
                        Jugadors: ${torneo.num_jugadors}
                    </span>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error("Error carregant tornejos:", error);
        listaTorneos.innerHTML = "<p>Error al carregar els tornejos.</p>";
    }
}

// Nueva función para manejar el clic y cargar emparejamientos
function seleccionarTorneo(idTorneig) {
    const seccion = document.getElementById('TorenoSuis');
    if (seccion.classList.contains('oculta')) {
        seccion.classList.remove('oculta');
    }
    cargarEmparejamientos(idTorneig);
}

// Emparejamientos
const urls = "https://turnonauta.asegura.dev:8443";

async function cargarEmparejamientos(torneigId) {
    const container = document.getElementById('emparejamientos-container');
    if (!container) {
        console.error("❌ Contenedor 'emparejamientos-container' no encontrado");
        return;
    }

    container.innerHTML = 'Carregant emparellaments...';

    try {
        const response = await fetch(`${urls}/puntuacions/get_by_tournament_ordered_and_name/${torneigId}`);
        if (!response.ok) throw new Error(`Error al cargar emparejaments: ${response.status}`);

        const datos = await response.json();
        console.log("Datos recibidos:", datos);

        if (!Array.isArray(datos) || datos.length === 0) {
            container.innerHTML = '<p>No hi ha jugadors registrats.</p>';
            return;
        }

        const jugadoresOrdenados = datos.sort((a, b) => (b.sos || 0) - (a.sos || 0));
        console.log("Jugadores ordenados:", jugadoresOrdenados);

        let html = '';
        for (let i = 0; i < jugadoresOrdenados.length; i += 2) {
            const jugador1 = jugadoresOrdenados[i]?.nom || '---';
            const jugador2 = jugadoresOrdenados[i + 1]?.nom || '---';

            html += `
                <div class="card-emparejamiento">
                    <span>${jugador1}</span>
                    <strong>VS</strong>
                    <span>${jugador2}</span>
                </div>
            `;
        }

        container.innerHTML = html || '<p>No hi ha jugadors suficients per emparellar.</p>';
    } catch (error) {
        console.error("❌ Error al cargar emparejaments:", error);
        container.innerHTML = '<p>Error al carregar emparellaments.</p>';
    }
}

function seleccionarTorneo(idTorneig) {
    const seccion = document.getElementById('TorenoSuis');
    
    if (seccion) {
        // Asegurar que esté visible
        seccion.classList.remove('oculta');
        seccion.style.display = 'block';  // Asegurar visibilidad si el CSS tiene display:none
    } else {
        console.error("❌ Sección con ID 'TorenoSuis' no encontrada en el DOM.");
    }

    cargarEmparejamientos(idTorneig);
}