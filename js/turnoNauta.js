document.getElementById('empezar').addEventListener('click', function() {
    let codi = document.getElementById('codi').value;
    if (codi.trim() !== "") {
        alert("Código ingresado: " + codi);
    } else {
        alert("Por favor, ingrese un código.");
    }
});
