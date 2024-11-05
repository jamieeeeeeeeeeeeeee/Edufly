const mongoose = require('mongoose');
require('dotenv').config({ path: '../secret.env' });

var HOMEWORK_DB = process.env.MONGOURI_HOMEWORK_DB;

const connectHomeworkDB = () => {
    return new Promise((resolve, reject) => {
        const connection = mongoose.createConnection(HOMEWORK_DB);

        connection.once('open', () => {
            console.log('Connected to Homework Database on MongoDB Atlas');
            resolve(connection);
        });

        connection.on('error', (err) => {
            console.error('Error connecting to Homework Database:', err.message);
            reject(err);
        });
    });
};

module.exports = connectHomeworkDB;
