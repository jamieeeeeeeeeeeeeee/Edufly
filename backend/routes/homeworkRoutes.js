const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

module.exports = function (homeworkConnection) {
    const router = express.Router();
    const upload = multer({ storage: multer.memoryStorage() });

    const homeworkSchema = new mongoose.Schema({
        studentId: { type: String, required: true },
        sectionId: { type: String, required: true },
        title: { type: String, required: true },
        homeworkFile: { type: Buffer, required: true },
        fileName: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now }
    });
    const Homework = homeworkConnection.model('Homework', homeworkSchema);

    // Upload Homework
    router.post('/upload-homework', upload.single('homeworkFile'), async (req, res) => {
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        const allowedExtensions = ['.pdf', '.doc', '.docx'];

        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).json({ message: 'Invalid file type. Only PDF and Word documents are allowed.' });
        }

        try {
            const newHomework = new Homework({
                studentId: req.body.studentId,
                sectionId: req.body.sectionId,
                title: req.body.title,
                homeworkFile: req.file.buffer,
                fileName: req.file.originalname,
            });
            await newHomework.save();
            res.status(200).json({ message: 'Homework uploaded successfully' });

        } catch (error) {
            res.status(500).json({ message: 'Status 500: Error uploading homework', error });
        }
    });

    // Retrieve All Homework
    router.get('/homeworks', async (req, res) => {
        try {
            const homeworks = await Homework.find({});
            res.status(200).json(homeworks);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving homework files', error });
        }
    });

    // Retrieve Homework by ID for Viewing or Downloading
    router.get('/homeworks/:id', async (req, res) => {
        try {
            const homework = await Homework.findById(req.params.id);
            if (!homework) {
                return res.status(404).json({ message: 'Homework not found' });
            }

            // Set headers for viewing PDF in the browser
            if (path.extname(homework.fileName).toLowerCase() === '.pdf') {
                res.setHeader('Content-Type', 'application/pdf');
            } else {
                res.setHeader('Content-Type', 'application/octet-stream');
            }
            res.setHeader('Content-Disposition', `inline; filename="${homework.fileName}"`);
            res.send(homework.homeworkFile);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving homework', error });
        }
    });

    return router;
};
