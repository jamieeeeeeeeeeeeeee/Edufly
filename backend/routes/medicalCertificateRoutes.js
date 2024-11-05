const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

module.exports = function (medicalCertificateConnection) {
    const router = express.Router();
    const upload = multer({ storage: multer.memoryStorage() });

    const medicalCertificateSchema = new mongoose.Schema({
        studentId: { type: String, required: true },
        sectionId: { type: String, required: true },
        certificateFile: { type: Buffer, required: true },
        fileName: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now }
    });
    const MedicalCertificate = medicalCertificateConnection.model('MedicalCertificate', medicalCertificateSchema);

    // Upload Medical Certificate
    router.post('/upload-medical', upload.single('certificateFile'), async (req, res) => {
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];

        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).json({ message: 'Invalid file type. Only PDF and image files are allowed.' });
        }

        try {
            const newCertificate = new MedicalCertificate({
                studentId: req.body.studentId,
                sectionId: req.body.sectionId,
                certificateFile: req.file.buffer,
                fileName: req.file.originalname,
            });
            await newCertificate.save();
            res.status(200).json({ message: 'Medical certificate uploaded successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading medical certificate', error });
        }
    });

    // Retrieve All Medical Certificates
    router.get('/medical-certificates', async (req, res) => {
        try {
            const certificates = await MedicalCertificate.find({});
            res.status(200).json(certificates);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving medical certificates', error });
        }
    });

    // Retrieve Medical Certificate by ID for Viewing or Downloading
    router.get('/medical-certificates/:id', async (req, res) => {
        try {
            const certificate = await MedicalCertificate.findById(req.params.id);
            if (!certificate) {
                return res.status(404).json({ message: 'Medical certificate not found' });
            }

            // Set headers for PDF and image files
            const fileExtension = path.extname(certificate.fileName).toLowerCase();
            if (fileExtension === '.pdf') {
                res.setHeader('Content-Type', 'application/pdf');
            } else if (['.jpg', '.jpeg', '.png'].includes(fileExtension)) {
                res.setHeader('Content-Type', `image/${fileExtension.slice(1)}`);
            } else {
                res.setHeader('Content-Type', 'application/octet-stream');
            }
            res.setHeader('Content-Disposition', `inline; filename="${certificate.fileName}"`);
            res.send(certificate.certificateFile);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving medical certificate', error });
        }
    });

    return router;
};
