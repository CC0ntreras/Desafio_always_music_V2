# Always Music

## Descripción

La escuela de música Always Music solicitó hacer unas pruebas con el avance del desarrollo
del sistema de gestión con base de datos PostgreSQL, se dieron cuenta que no se podían
hacer varias consultas de forma simultánea y que al intentar hacer una consulta errónea, no
recibían ningún error, dejando la posibilidad de creer que un estudiante fue registrado y que
esto no sea así.
En este desafío deberás ocupar la clase Pool definiendo sus diferentes propiedades, capturar
los posibles errores en el proceso de conexión con la base de datos y realizar las siguientes
consultas usando textos parametrizados.
● Agregar un nuevo estudiante.
● Consultar los estudiantes registrados.
● Consultar estudiante por rut.
● Actualizar la información de un estudiante.
● Eliminar el registro de un estudiante.
## Visuales
![1](https://github.com/CC0ntreras/Desafio_always_music_V2/assets/50925916/8d9bc202-3b7a-4994-a380-1572a3fbe428)

## Empezando 🚀

Estas instrucciones te guiarán para obtener una copia de este proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos 📋

Lista de software y herramientas, incluyendo versiones, que necesitas para instalar y ejecutar este proyecto:

-  "node": "^18.0.4",
-  "pg": "^8.11.5",


### Instalación 🔧

Una guía paso a paso sobre cómo configurar el entorno de desarrollo e instalar todas las dependencias.

#paso 1
instalar las dependencias con npm i creando la carpeta node_modules.

## Ejecutando las Pruebas ⚙️

Instrucciones y ejemplos para ejecutar el conjunto de pruebas.

####  node index.js conpmementando con esta informacion:
- node index.js nuevo '{"nombre":"Juan Perez","rut":"12345678-9","curso":"Matemáticas","nivel":"100"}'
- index.js consulta
- node index.js rut '{"rut":"12345678-9"}'
- node index.js editar '{"nombre":"Juan Perez","rut":"12345678-9","curso":"Historia","nivel":"200"}'
- node index.js eliminar '{"rut":"12345678-9"}'
## Despliegue 📦

Se desplega a travez de la consola de visual studio con power shell.

## Construido Con 🛠️

Explica qué tecnologías usaste para construir este proyecto. Aquí algunos ejemplos:

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - El lenguaje utilizado
- [Express](https://expressjs.com/en/5x/api.html)- El framework web utilizado
- [postgres](https://www.postgresql.org/docs/) - Gestor de Base de Datos

## Autores ✒️

- **Cristian Contreras** - [CC0ntreras](https://github.com/CC0ntreras)
- **Macarena Quijada G** - [Macarena Quijada G](https://github.com/MacarenaQuijadaG)

---

 😊
