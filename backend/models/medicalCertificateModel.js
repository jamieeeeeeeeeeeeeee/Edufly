const mongoose = require('mongoose');
const connectMedicalCertificateDB = require('../config/dbMedicalCertificate');

const medicalCertificateSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    sectionId: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    certificateFile: { type: Buffer, required: true },
    fileName: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

async function getMedicalCertificateModel() {
    const connection = await connectMedicalCertificateDB();
    return connection.model('MedicalCertificate', medicalCertificateSchema);
}

module.exports = getMedicalCertificateModel;
