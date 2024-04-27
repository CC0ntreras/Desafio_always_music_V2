const pool = require('./config');

const args = process.argv.slice(2);

const comando = args[0];
const params = args.length > 1 ? JSON.parse(args[1]) : {}; // Solo parsea si hay un segundo argumento

// Función para agregar un nuevo estudiante
async function nuevo(params) {
    
    const {nombre, rut, curso, nivel} = params;
    try {
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
        console.log(res.rows);
    } catch (err) {
        console.error(err);
    }finally {
        await pool.end();
    }
}

// Función para actualizar los datos de un estudiante
async function editar(params) {
    const {nombre, rut, curso, nivel} = params;
    console.log({nombre, rut, curso, nivel})
    try {
        const res = await pool.query('UPDATE registro_actual SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4', [nombre, curso, nivel, rut]);
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
    console.log(rut)
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