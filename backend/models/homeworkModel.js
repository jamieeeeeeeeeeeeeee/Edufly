const mongoose = require('mongoose');
const connectHomeworkDB = require('../config/dbHomework');

const homeworkSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    sectionId: { type: String, required: true },
    homeworkFile: { type: Buffer, required: true },
    fileName: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

async function getHomeworkModel() {
    const connection = await connectHomeworkDB();
    return connection.model('Homework', homeworkSchema);
}

module.exports = getHomeworkModel;
