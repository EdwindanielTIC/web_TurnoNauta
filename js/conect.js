async function conectar() {
    try {
        let response = await fetch("https://52.20.160.197:8443/users/login?username=daniel&password=RODGIRES", { 
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        let data = await response.json();
        console.log("Respuesta del servidor:", data);
    } catch (error) {
        console.error("Error al conectar:", error);
    }
}

// Agregar evento click al botón
document.addEventListener("DOMContentLoaded", () => {
    const btnIniciarSesion = document.getElementById("btnInicioSesion");
    if (btnIniciarSesion) {
        btnIniciarSesion.addEventListener("click", (event) => {
            event.preventDefault(); // Evita que el formulario se envíe
            conectar();
        });
    }
});