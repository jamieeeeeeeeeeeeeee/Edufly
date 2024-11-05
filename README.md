# EduFly-Reloaded


# BELOW IS THE README FOR THE UPLOAD AND DOWNLOADING OF DOCUMENTS
# PDF and Document Uploader with View and Download

This project provides a full-stack application for uploading and viewing documents, specifically for homework assignments (PDF, DOC, DOCX) and medical certificates (PDF and image formats). Users can upload, view, and download documents through a web interface.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Troubleshooting](#troubleshooting)

## Features
- **File Upload**: Upload homework and medical certificate files with validation.
  - Homework: PDF, DOC, DOCX.
  - Medical Certificates: PDF, JPG, JPEG, PNG.
- **View and Download**: View PDF documents in the browser and download documents.
- **Error Handling**: Prevents upload of invalid file types.

## Tech Stack
- **Frontend**: HTML, JavaScript, Bootstrap
- **Backend**: Node.js, Express, Multer for file handling
- **Database**: MongoDB Atlas for storing files and metadata

## Setup

### Prerequisites
- **Node.js**: Install Node.js (v14 or above recommended).
- **MongoDB Atlas**: Set up a MongoDB Atlas cluster and create two databases:
  - `homework_db` for homework uploads
  - `medical_certificate_db` for medical certificate uploads
- **MongoDB Database Access**: Create a user with readWrite permissions.

### Folder Structure
```
project_root/
├── backend/
│   ├── config/
│   │   ├── dbHomework.js               # MongoDB connection for homework
│   │   └── dbMedicalCertificate.js     # MongoDB connection for medical certificates
│   ├── models/
│   ├── routes/
│   │   ├── homeworkRoutes.js           # Routes for homework upload and view
│   │   └── medicalCertificateRoutes.js # Routes for medical certificate upload and view
│   ├── app.js                          # Main backend server file
│   └── package.json                    # Backend dependencies
└── frontend/
    ├── upload_homework.html            # Homework upload form
    ├── upload_medical.html             # Medical certificate upload form
    ├── view_homework.html              # View and download homework files
    ├── view_medical.html              # View and download medical certificates
    └── js/
        ├── homeworkUpload.js           # JavaScript for homework upload
        ├── medicalUpload.js            # JavaScript for medical certificate upload
        └── viewFiles.js                # JavaScript for viewing and downloading files
```

## Environment Variables

Set up the MongoDB URI for each database in `dbHomework.js` and `dbMedicalCertificate.js`. Update these files with your MongoDB credentials:

```javascript
// dbHomework.js
const mongoose = require('mongoose');
const connectHomeworkDB = async () => {
    return mongoose.createConnection('mongodb+srv://<username>:<password>@cluster0.mongodb.net/homework_db?retryWrites=true&w=majority');
};

// dbMedicalCertificate.js
const mongoose = require('mongoose');
const connectMedicalCertificateDB = async () => {
    return mongoose.createConnection('mongodb+srv://<username>:<password>@cluster0.mongodb.net/medical_certificate_db?retryWrites=true&w=majority');
};
```

Replace `<username>`, `<password>`, and `<database>` with your MongoDB credentials.

## Running the Project

### 1. Install Dependencies

#### Backend
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

### 2. Start Backend Server
Run the backend server:
```bash
node app.js
```

If setup is successful, the console should display:
```
Server running on http://localhost:5000
Connected to Homework Database on MongoDB Atlas
Connected to Medical Certificate Database on MongoDB Atlas
```

### 3. Serve the Frontend
To serve the frontend files, you can use http-server or Live Server extension in Visual Studio Code.

#### Using http-server
1. Install http-server globally if you haven't already:
```bash
npm install -g http-server
```

2. Navigate to the frontend directory:
```bash
cd ../frontend
```

3. Start the server:
```bash
http-server -p 5500
```

4. Open your browser and navigate to:
- Upload Homework: http://localhost:5500/upload_homework.html
- View Homework: http://localhost:5500/view_homework.html
- Upload Medical Certificate: http://localhost:5500/upload_medical.html
- View Medical Certificates: http://localhost:5500/view_medical.html

## Usage

### Upload Homework or Medical Certificate
1. Go to the relevant upload page.
2. Select a file with a valid extension.
3. Enter your Student ID and submit.
4. If successful, a message will display confirming the upload.

### View and Download Files
1. Go to the view page for either homework or medical certificates.
2. Click a file to view or download. Supported files (PDF) open directly in the browser; other types prompt for download.

## Endpoints

The backend provides the following API endpoints:

### Homework Endpoints
- **Upload Homework**: `POST /api/upload-homework`
  - Body: Form-data with `studentId` and `homeworkFile` (PDF, DOC, DOCX).
- **Get All Homework**: `GET /api/homeworks`
- **View Homework by ID**: `GET /api/homeworks/:id`
  - Responds with a PDF or downloadable file.

### Medical Certificate Endpoints
- **Upload Medical Certificate**: `POST /api/upload-medical`
  - Body: Form-data with `studentId` and `certificateFile` (PDF, JPG, JPEG, PNG).
- **Get All Medical Certificates**: `GET /api/medical-certificates`
- **View Medical Certificate by ID**: `GET /api/medical-certificates/:id`
  - Responds with a PDF or downloadable file.

## Troubleshooting

### Common Errors

#### Failed to Load PDF Document:
- Ensure the backend sets the correct Content-Type headers.
- Check that files are uploaded with the correct format and encoding.

#### MongoDB Connection Issues:
- Double-check the MongoDB URI in `dbHomework.js` and `dbMedicalCertificate.js`.
- Ensure your IP is whitelisted in MongoDB Atlas.

#### Invalid File Type:
- Ensure that only allowed file types are uploaded based on frontend accept attributes and backend validation.