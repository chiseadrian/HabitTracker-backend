require('dotenv').config();
const Server = require('./models/Server');


const server = new Server();

server.listen();



// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const schedule = require('node-schedule');
// const { dbConnection } = require('./database/config');
// const { setDailyBackgroundImage } = require('./helpers/setDailyBackgroundImage');
// require('dotenv').config();


// // Crear el servidor de express
// const app = express();

// // Base de datos
// dbConnection();

// // CORS
// app.use(cors())

// // Lectura y parseo del body
// app.use(express.json());


// // Rutas
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/routines', require('./routes/routines'));
// app.use('/api/days', require('./routes/days'));
// app.use('/api/notes', require('./routes/notes'));
// app.use('/api/lists', require('./routes/lists'));
// app.use('/api/helpers', require('./routes/helpers'));

// // run everyday at midnight
// schedule.scheduleJob('0 0 * * *', () => {
//     setDailyBackgroundImage();
// })

// //Directorio publico (accede a las rutas de react)
// app.use(express.static(path.join(__dirname, 'public')));
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Escuchar peticiones
// app.listen(process.env.PORT, () => {
//     console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
// });

