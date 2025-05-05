const direccion = "https://turnonauta.asegura.dev:8443";

document.addEventListener('DOMContentLoaded', () => {
    const avatarActual = document.querySelector('.current-avatar img');
    const opcionesFotos = document.querySelectorAll('.avatar-options img');
    const volverAlogin = document.getElementById('volverLogin');
    const usuarioAvatar = document.querySelector('.usuario img');

    // Cargar avatar guardado en localStorage (si existe)
    const savedAvatarSrc = localStorage.getItem('avatarSrc');
    const savedAvatarAlt = localStorage.getItem('avatarAlt');

    if (savedAvatarSrc && savedAvatarAlt) {
        avatarActual.src = savedAvatarSrc;
        avatarActual.alt = savedAvatarAlt;

        usuarioAvatar.src = savedAvatarSrc;
        usuarioAvatar.alt = savedAvatarAlt;
    }

    function cambiarFoto(event) {
        const seleccionarFoto = event.target;
        const newSrc = seleccionarFoto.src;
        const newAlt = seleccionarFoto.alt;

        avatarActual.src = newSrc;
        avatarActual.alt = newAlt;

        usuarioAvatar.src = newSrc;
        usuarioAvatar.alt = newAlt;

        // Guardar en localStorage
        localStorage.setItem('avatarSrc', newSrc);
        localStorage.setItem('avatarAlt', newAlt);
    }

    opcionesFotos.forEach(avatar => {
        avatar.addEventListener('click', cambiarFoto);
    });

    volverAlogin.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
            const deleteButton = document.getElementById('btnEliminarCuenta');
            
            deleteButton.addEventListener('click', async function() {
                if (!confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
                    return;
                }

                try {
                    const userId = localStorage.getItem('userId'); // Asegúrate de que el ID esté almacenado
                    const token = localStorage.getItem('token'); // Token de autenticación, si aplica

                    if (!userId) {
                        alert('Error: No se encontró el ID del usuario.');
                        return;
                    }

                    const response = await fetch(`${direccion}/users/delete_by_id`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(token && { 'Authorization': `Bearer ${token}` }) // Incluye el token si existe
                        },
                        body: JSON.stringify({ id: userId }) // Envía el id en el cuerpo
                    });

                    if (response.ok) {
                        alert('Cuenta eliminada exitosamente.');
                        window.location.href = `${direccion}/login`;
                    } else {
                        const errorData = await response.json();
                        alert('Error al eliminar la cuenta: ' + (errorData.message || 'Inténtalo de nuevo.'));
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    alert('Error en la conexión. Por favor, verifica tu red e intenta de nuevo.');
                }
            });
        });