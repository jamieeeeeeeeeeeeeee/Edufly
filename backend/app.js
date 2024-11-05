const express = require('express');
const cors = require('cors');
const connectHomeworkDB = require('./config/dbHomework');
const connectMedicalCertificateDB = require('./config/dbMedicalCertificate');
const homeworkRoutes = require('./routes/homeworkRoutes');
const medicalCertificateRoutes = require('./routes/medicalCertificateRoutes');

const app = express();
// app.use(cors());
// app.use(express.json());

async function startServer() {
    try {
        // Connect to both databases
        const homeworkConnection = await connectHomeworkDB();
        const medicalCertificateConnection = await connectMedicalCertificateDB();
        const options = [ cors({ origin: 'https://test-mongo-db-6aus.vercel.app', methods: '*', allowedHeaders: ['Content-Type', 'Authorization'], credentials: true, }) ];
        app.use(options);
        // app.use((req, res, next) => { 
        //     res.setHeader('Access-Control-Allow-Origin', '*'); 
        //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
        //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization'); 
        //     res.setHeader('Access-Control-Allow-Credentials', true); // Pass to next layer of middleware 
        //     if (req.method === 'OPTIONS') res.sendStatus(200); 
        //     else next(); 
        // });
        // Pass connections to routes if needed
        app.use('/api', homeworkRoutes(homeworkConnection));
        app.use('/api', medicalCertificateRoutes(medicalCertificateConnection));
        app.get('/', (req, res) => { res.send('Hello World') })
        // Start the server
        const PORT = 3000;
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (error) {
        console.error('Failed to connect to databases:', error);
        process.exit(1);
    }
}

startServer();
