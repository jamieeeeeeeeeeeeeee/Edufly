const mongoose = require('mongoose');
require('dotenv').config({ path: '../secret.env' });

var MEDICAL_CERTIFICATE_DB = process.env.MONGOURI_MEDICAL_CERTIFICATE_DB;

const connectMedicalCertificateDB = () => {
    return new Promise((resolve, reject) => {
        const connection = mongoose.createConnection(MEDICAL_CERTIFICATE_DB);

        connection.once('open', () => {
            console.log('Connected to Medical Certificate Database on MongoDB Atlas');
            resolve(connection);
        });

        connection.on('error', (err) => {
            console.error('Error connecting to Medical Certificate Database:', err.message);
            reject(err);
        });
    });
};

module.exports = connectMedicalCertificateDB;
