const pool = require('./config');

const args = process.argv.slice(2);

const comando = args[0];
const params = args.length > 1 ? JSON.parse(args[1]) : {}; // Solo parsea si hay un segundo argumento

// Función para agregar un nuevo estudiante
async function nuevo(params) {
    
    const {nombre, rut, curso, nivel} = params;
    try {
        //Coonsulta en la base de datos si ya esta ese rut
        const existeEstudiante = await pool.query('SELECT COUNT(*) FROM registro_actual WHERE rut = $1', [rut]);

        // Si ya existe ese RUT, mostrar un error
        if (existeEstudiante.rows[0].count > 0) {
            console.error('Error: El estudiante con el RUT', rut, 'ya existe.');
            return; 
        }

        const res = await pool.query('INSERT INTO registro_actual (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)', [nombre, rut, curso, nivel]);
        console.log(`Estudiante ${nombre} agregado con éxito`);
    } catch (err) {
        if (err.code== '23505'){
            console.error('Error: El estudiante ya existe.');
           }else{
            console.error('Error desconocido:', err.detail);
    }
    }finally {
        await pool.end();
    }
}


// Función para consultar todos los estudiantes
async function consulta() {
    try {

        const res = await pool.query('SELECT * FROM registro_actual');
        if (res.rows.length === 0) {
            console.log("La tabla está vacía.");
        } else {
            console.log(res.rows);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

// Función para consultar estudiante por RUT

async function consultarPorRut(params) {
    try {
        const res = await pool.query('SELECT * FROM registro_actual WHERE rut = $1', [params[1]]);
        if (res.rows.length === 0) {
            console.log("No se encontraron registros con ese RUT.");
        } else {
            console.log(res.rows);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

// Función para actualizar los datos de un estudiante
async function editar(params) {
    const {nombre, rut, curso, nivel} = params;
    //console.log({nombre, rut, curso, nivel})
    try {
        const res = await pool.query('UPDATE registro_actual SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4 RETURNING *', [nombre, curso, nivel, rut]);
        if (res.rowCount === 0) {
            console.log(`No se encontró un estudiante con el RUT ${rut} para actualizar.`);
        } else {
            console.log(`Estudiante ${nombre} editado con éxito.`);
        }
    } catch (err) {
        console.log(err)
        
    }finally {
        await pool.end();
    }
}

// Función para eliminar un estudiante
async function eliminar(params) {
    const {rut} = params;
    //console.log(rut)
    try {
        const res = await pool.query(`DELETE FROM registro_actual WHERE rut = $1`, [rut]);
       if (res.rowCount === 0) {
            console.log(`No se encontro estudiante con rut ${rut} para eliminar`)
        } else {
            console.log(`Estudiante ${rut} eliminado con éxito.`);
        }
        ;
    } catch (err) {
        console.error(err);
    }finally {
        await pool.end();
    }
}

// Manejo de comandos
switch(comando) {
    case 'nuevo':
        nuevo(params);
        break;
    case 'consulta':
        consulta();
        break;
    case 'rut':
        consultarPorRut(params);
        break;
    case 'editar':
        editar(params);
        break;
    case 'eliminar':
        eliminar(params);
        break;
    default:
        console.log('Comando no reconocido');
}

/* EJECUTAR EN TERMINAL GIT BASH YA QUE CON POWERSHELL HAY ERRORES Y SOLO LA CONSULTA SE MUESTRA
node index.js nuevo '{"nombre":"Juan Perez","rut":"12345678-9","curso":"Matemáticas","nivel":"100"}'

node index.js consulta

node index.js rut '{"rut":"12345678-9"}'

node index.js editar '{"nombre":"Juan Perez","rut":"12345678-9","curso":"Historia","nivel":"200"}'

node index.js eliminar '{"rut":"12345678-9"}'
*/