const express = require('express');
const cors = require('cors');
const path = require('path');
const schedule = require('node-schedule');

const { dbConnection } = require('../database/config');
const { setDailyBackgroundImage } = require('../helpers/setDailyBackgroundImage');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            routines: '/api/routines',
            days: '/api/days',
            notes: '/api/notes',
            lists: '/api/lists',
            helpers: '/api/helpers',
        }

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico (accede a las rutas de react)

        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, '../public', 'index.html'));
        });

        // run everyday at midnight
        schedule.scheduleJob('0 0 * * *', () => {
            setDailyBackgroundImage();
        });
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.routines, require('../routes/routines'));
        this.app.use(this.paths.days, require('../routes/days'));
        this.app.use(this.paths.notes, require('../routes/notes'));
        this.app.use(this.paths.lists, require('../routes/lists'));
        this.app.use(this.paths.helpers, require('../routes/helpers'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }

}


module.exports = Server;
