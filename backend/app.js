const express = require('express');
const cors = require('cors');
const connectHomeworkDB = require('./config/dbHomework');
const connectMedicalCertificateDB = require('./config/dbMedicalCertificate');
const homeworkRoutes = require('./routes/homeworkRoutes');
const medicalCertificateRoutes = require('./routes/medicalCertificateRoutes');

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
    try {
        // Connect to both databases
        const homeworkConnection = await connectHomeworkDB();
        const medicalCertificateConnection = await connectMedicalCertificateDB();

        // Pass connections to routes if needed
        app.use('/api', homeworkRoutes(homeworkConnection));
        app.use('/api', medicalCertificateRoutes(medicalCertificateConnection));

        // Start the server
        const PORT = 3000;
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (error) {
        console.error('Failed to connect to databases:', error);
        process.exit(1);
    }
}

startServer();
