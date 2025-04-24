document.addEventListener('DOMContentLoaded', () => {
  
    const avatarActual = document.querySelector('.current-avatar img');
    const opcionesFotos = document.querySelectorAll('.avatar-options img');
    const volverAlogin = document.getElementById('volverLogin');
    const usuarioAvatar = document.querySelector('.usuario img');

    function cambiarFoto(event) {
        const selecionarFoto = event.target;
        const newSrc = selecionarFoto.src;
        const newAlt = selecionarFoto.alt;
       
        avatarActual.src = newSrc;
        avatarActual.alt = newAlt;

        usuarioAvatar.src = newSrc;
        usuarioAvatar.alt = newAlt;

    }
    opcionesFotos.forEach(avatar => {
        avatar.addEventListener('click', cambiarFoto);
    });

    volverAlogin.addEventListener('click', () => {
        
        window.location.href = 'index.html';
    });
});