const mongoose = require('mongoose');

const dbConnection = async () => {

    const host = {
        local: "127.0.0.1",
        docker: "mongo"
    }

    try {

        mongoose.set("strictQuery", false);

        await mongoose.connect(`mongodb://${host.docker}/pickle_rick_db`, {
            useNewUrlParser: true,
        });

        console.log('Database is running on mongoDB')

    } catch (error) {
        console.log(error);
        throw new Error('Error initializing the database');
    }

}

module.exports = {
    dbConnection
}