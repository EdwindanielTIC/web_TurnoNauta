# web_TurnoNauta

## Links

- [MOBIL](https://github.com/Snr1s3/Turnonauta.git)
- [API](https://github.com/Snr1s3/TurnoNauta_FastAPI.git)
- [Server APP](https://github.com/Snr1s3/serverApp_Turnonauta.git)  
- [Presentacio](https://docs.google.com/presentation/d/1K03l9CcSwC65fDLJo3RcBxfwdepAkTG-f7iyhe_hQaQ/edit?usp=sharing)
- [Memoria](https://docs.google.com/document/d/1RH_1SOikwa-qEJ7z6mxCnpTQ9W4fVT4ch-nEfXnbZEM/edit?usp=sharing)
- [Serveis](https://docs.google.com/document/d/1n_anFcwDCupWzFK5bXRM0LBsKA6eEZFOU3CXILnUGAA/edit?usp=sharing)


Diseño de pagina web TurnoNauta
La pagina principal(login) es la siguiente, como podemos ver, hemos utilizado un logo de un astronauta, una foto de pikachu ya que representa a una opcion de emparejamiento que son Pokemon y Magic.
El usuario para poder iniciar seccion tendra que poner su nombre de usuario o su correo electronico, despues pondrá la contraseña y podra iniciar sección.

![image](https://github.com/user-attachments/assets/7cb9701f-f027-4e47-a594-d2c4e08e50fe)


Los usuarios que todavia no estan registrados, le daremos la opción de poner inciar seccion : 

![image](https://github.com/user-attachments/assets/41365c6c-5256-40a9-a4a3-37219385a8d3)

vamos a crear una cuenta nueva con los siguiente: nombre del usuairo: daniel_ramirez, Teléfono : 12345, Correo d'usuari: daniel@gmail.com y la contraseña : 1234,
![image](https://github.com/user-attachments/assets/a6d9de9c-29c0-4826-9e18-e9c4f8971e2a)

Una vez que damos Crear Usuario aparecera la siguiente pestaña: 
![image](https://github.com/user-attachments/assets/552d3598-5a4c-48ce-930d-c74b19778960)

Para verificar que se ha creado correctamente el usuario , lo veremos desde la api, vemos que aparece correctamente.

![image](https://github.com/user-attachments/assets/3a6f0fd2-2e43-40af-a76a-8ebe25cda48c)

Ahora procedemos a inniciar seccion con la cuenta que hemos creado:

![image](https://github.com/user-attachments/assets/f9305273-9362-49ac-a322-043dcb1b608e)



### INICIO SECCIÓN

Como podemos ver, esta es la pagina principal de la pagina web, esto es lo que nos aparecera en resumen de perfil. Nos aparecera el ID,NOM,RONDAS GANADAD, TORNEOS Y TORNEOS GANADOS.
![image](https://github.com/user-attachments/assets/c7f2545d-0404-415c-82ed-9b6b4c87f7ae)


### Torneo activos

Lo que vemos a continuacion , son todos los torneos activos que se han creado. Nos aparecera la siguiente informacion el codi del torneo, el juego que se selecciono, el formato si es eliminatoria o no y el nunero de jugadores que podran estar.

![image](https://github.com/user-attachments/assets/967a874a-4a74-4089-bf3e-d65fccf52e37)


Para verificar que estos torneos vienen de la base de datos, adjuntare captura de ello : 

![image](https://github.com/user-attachments/assets/4b6ef3ca-e3f2-4a19-9318-9fe0b2ebeefb)
![image](https://github.com/user-attachments/assets/162a8c76-c1ef-4dfd-aff4-317e17feb4c0)
![image](https://github.com/user-attachments/assets/39eeabc1-1d07-48c6-bb83-2d026d8f3c3b)

Como hemos podido comprobar , provienen de la base de datos.



### Torneos finalizamos 
En esta pestaña lo que se muestra son los torneo que se han finalizado. aparecera el codi, el joc, formato, fecha en la que filanizo y los judadores que participaron.

![image](https://github.com/user-attachments/assets/7a0e46d4-3a9c-4b14-bd24-eafb3c33d708)

![image](https://github.com/user-attachments/assets/6ddc59d8-e070-481d-9a4d-1b49b0984a5b)

Si hacemos click en alguno de los torneos finalizados, nos aparecera las posiciones de los jugadores, por ejemplo hacemos click en Tournament1 nos aparcera las estadisticas de los jugadores: 

![image](https://github.com/user-attachments/assets/1aa322b7-3cd5-421b-9bc9-e6a3a35227b7)

Hacemos clicj en otro torneo finalizado commo en el prova :

![image](https://github.com/user-attachments/assets/659fbb3e-e57d-4ee0-a49c-76b523617c63)


Ahora vamos a la API para verificar que si se ha llevado correctamente a cabo.
![image](https://github.com/user-attachments/assets/b9f21b6b-e048-4d98-a9e6-7c59fecbd2c9)
![image](https://github.com/user-attachments/assets/dccf5e61-0ea3-4744-a497-5765165178fe)

### Configuración
Como podemos ver en configuración, no aparece el idiona, cambiar el nombre, cambiar foto, eliminar cuenta y sonidos y vibraciones:
![image](https://github.com/user-attachments/assets/ae5519c8-f3dd-4e77-bfee-6ce22a981559)

Si hacemos click en el desplegable de Idiomas nos aparecera lo siguiente : 

![image](https://github.com/user-attachments/assets/851f6685-7d48-4b42-a306-40bc7034e394)

Si queremos escoger el idioma ingles, toda la pagina se nos cambiara a ese idioma : 

![image](https://github.com/user-attachments/assets/c1622817-e9b1-4eaf-8179-be361ad684c4)

Ahora si escogermos frances, tambien se nos cambiara a ese idioma : 
![image](https://github.com/user-attachments/assets/1e97e14d-5469-4689-8ccb-b61ea0363d52)

### EL boton cambiar nombre, no nos ha dado tiempo a poder hacerlo.

### Cambiar foto
![image](https://github.com/user-attachments/assets/e3550ea0-5c91-4c52-9102-dcb613d3d569)

Si hacemos click en uno de esos personajes, se nos cambiara la foto : 
![image](https://github.com/user-attachments/assets/4b820758-dc2e-408c-b44e-4074c9d44161)

![image](https://github.com/user-attachments/assets/b04b0b7d-ab05-4b16-8862-ebb97d54ed08)


## Sonido y vibración

Actualmente esta que no haya sonido ni vibración:
![image](https://github.com/user-attachments/assets/8e662d36-17c7-408a-b632-3738e3f1477d)

Ahora cambiamos a si y nos aparecera de diferente color el si:

![image](https://github.com/user-attachments/assets/e8a56a2a-7c55-42fb-845a-5f593ab62cae)

Si queremos hacer eliminar cuenta, me aparecera lo siguiente : 

una confirmacion si realmente queremos eliminar la cuenta , si apretamos si se cancela , pero si apretamos si 
![image](https://github.com/user-attachments/assets/9ec7f388-9a8f-4552-b7ef-12d5249297be)

nos da un error que nos dice que no se ha podido elimnar la cuenta, esta parte no funciono correctamnete.
![image](https://github.com/user-attachments/assets/8a0881dc-94c6-42b5-820d-eac817095641)



## Creacion de torneo.

![image](https://github.com/user-attachments/assets/97d29644-f71b-4d36-b200-1ff348a7fd4d)


Pasamo a la creacion de toreno con la siguiente informacion : 

![image](https://github.com/user-attachments/assets/efe4af33-a79e-4e0f-9e86-a7e081f14fd2)

Hacemos click en crear torneo, y nos aparecera lo siguiente : 

![image](https://github.com/user-attachments/assets/ef7e1dc1-d65b-4cbf-9830-4a8b7802a2f6)

vamos a torneos activos y nos aparecera esa información : 

![image](https://github.com/user-attachments/assets/4967b89c-1ee6-4dba-a96d-24d6c84adaeb)

Hacemos la comprobacion en la bbdd para que se haya creado correctamente: 
Vemos que se crea correctamente : 
![image](https://github.com/user-attachments/assets/90381054-642b-4c54-b7cc-f8c67d59c785)


