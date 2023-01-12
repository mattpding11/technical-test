const express = require('express')
const cors = require('cors');
const characterRoutes = require("../routes/characters")
const { dbConnection } = require('../db/config');

class Server {

    private app: any;
    private port: string;
    private path: { [key: string]: string };

    constructor() {
        this.app = express()
        this.port = process.env.PORT || "3000";

        // Application routes
        this.path = {
            character: '/api/v1/character',
        }

        // Connectiont to DB
        this.conectarDB();

        //Call middlewares
        this.middlewares();

        // Application Routes
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Body parse
        this.app.use(express.json())

    }

    routes() {
        this.app.use(this.path.character, characterRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port", this.port);
        });
    }

}

export default Server;