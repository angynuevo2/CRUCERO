//constante para el paquete de express
const express = require('express');
//variable para los metodos de express
var app = express();
//constante para el paquete de bodyparser
const bp = require('body-parser');

// Enviando datos JSON a NodeJS API
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Importamos las rutas del modulo Reservaciones
const ReservacionesRoutes = require('./Reservaciones');
// Usamos las rutas de Reservaciones
app.use('/Reservaciones', ReservacionesRoutes);

app.get('/', (req, res) => res.send('Servidor en ejecución'));

// Ejecutar el server en un puerto especifico
app.listen(3000, () => console.log('Servidor en puerto 3000'));
