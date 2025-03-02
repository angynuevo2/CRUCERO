const mysql = require('mysql');
const express = require('express');
const router = express.Router();

// Configuración de la conexión a la base de datos
const mysqlConnection = mysql.createConnection({
    host: '142.44.161.115',  // Dirección IP o nombre del host de la base de datos
    user: '1700PAC12025Equi2',  // cliente de la base de datos
    password: '1700PAC12025Equi2#97',  // Contraseña del cliente
    database: '1700PAC12025Equi2',  // Nombre de la base de datos
    port: 3306,  // Puerto de MySQL (por defecto es 3306)
    multipleStatements: true  // Permite ejecutar múltiples consultas
});

// Verificar la conexión
mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Conexión exitosa');
    } else {
        console.log('Error al conectar a la base de datos, error:'.err);
    }
});

// Endpoint para insertar una reservación
router.post("/CrearReservacion", (req, res) => {
    const reserva = req.body;
    const sql = "CALL INSERT_RESERVACION(?, ?, ?, ?, ?)";/*values(cod_cliente,etc...)*/ 
    
    console.log("Datos recibidos:", reserva);//DEPURACION

    mysqlConnection.query(
        sql,
        [    reserva.cod_cliente,
             reserva.cod_camarote,
             reserva.cod_crucero, 
             reserva.fecha_inicio_reserva, 
             reserva.fecha_final_reserva],
        (err, rows, fields) => {
            if (!err) {
                res.send("Reservación creada correctamente!");
            } else {
                console.error("Error al insertar reservación:", err); // Depuración
                console.error("Error al insertar reservación:", err);
                res.status(500).send("Error al insertar reservación.");
            }
        }
    );
});

// Endpoint para obtener reservaciones de un cliente
router.get("/GetReservaciones/:cod_cliente", (req, res) => {
    const { cod_cliente } = req.params;
    const sql = "CALL SELECT_RESERVACION(?)";
    
    mysqlConnection.query(sql, [cod_cliente], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.error("Error al obtener reservaciones:", err);
            res.status(500).send("Error al obtener reservaciones.");
        }
    });
});

// Endpoint para actualizar una reservación
router.put("/ActualizarReservacion/:id", (req, res) => {
    const reserva = req.body;
    const reservaId = req.params.id;
    const sql = "CALL UPDATE_RESERVACION(?, ?, ?, ?, ?)";
    
    mysqlConnection.query(
        sql,
        [reservaId, reserva.fecha_inicio_reserva, reserva.fecha_final_reserva, reserva.cod_camarote, reserva.cod_crucero],
        (err, rows, fields) => {
            if (!err) {
                res.status(200).send("Reservación actualizada correctamente!");
            } else {
                console.error("Error al actualizar reservación:", err);
                res.status(500).send("Error al actualizar reservación.");
            }
        }
    );
});

// Exportamos el router para que pueda ser usado en index.js
module.exports = router;
