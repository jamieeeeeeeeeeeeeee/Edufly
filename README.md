# EduFly

The goal of this project is to develop an online platform that simplifies administrative tasks for secondary school teachers in Singapore. Leveraging student learning devices, the app centralizes communication and documentation, helping to reduce the administrative burden on educators. This allows teachers to dedicate more time to their core responsibility of educating and guiding students.

# About Us

## Team Members

| S/N | Name           | Email ID         | 
|-----|----------------|------------------|
| 1   | Jamie Tan      | jamie.tan.2023   |
| 2   | Leandro Gay    | leandro.gay.2023 |
| 3   | Ryan Ng        | ryanng.2023      |
| 4   | Ryan Bangras   | rnbangras.2023   |

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Folder Structure](#folder-structure)
- [Running the Project](#running-the-project)
- [Login Credentials](#login-credentials)
- [Endpoints](#endpoints)

## Features

- **Homework & Task Management**:  
  - **Teachers**: Upload, track, and manage assignments and deadlines.  
  - **Students**: View and track upcoming assignments and deadlines.

- **Dynamic Timetable**:  
  Easily view and manage class schedules for both teachers and students.

- **Progress Monitoring**:  
  - **Teachers**: Monitor grades and attendance for all students within a class.  
  - **Students**: Access and track personal academic progress, including grades and attendance.

- **Announcements & Notifications**:  
  Stay updated with the latest important announcements and notifications.

- **Assignment Submission & Viewing**:  
  Simple and efficient process for students to submit homework and for teachers to view and grade them.

- **Medical Certificate Submission & Viewing**:  
  Submit and view medical certificates easily within the platform.

- **Consultation Booking**:  
  Facilitates the booking of consultations between teachers and students.

- **Pomodoro Timer**:  
  Boost productivity by working in focused intervals with the Pomodoro technique.

## Tech Stack
- **Frontend**: HTML, JavaScript, CSS, Bootstrap
- **Backend**: Node.js, Express, Multer for file handling
- **Database**: Firebase for storing of user data, MongoDB Atlas for storing files and metadata

## Setup

### Prerequisites
- **Node.js**: Install Node.js (v14 or above recommended).

### Folder Structure

```
EduFly-Reloaded
├── backend
│   ├── config
│   │   ├── dbHomework.js
│   │   └── dbMedicalCertificate.js
│   ├── models
│   │   ├── homeworkModel.js
│   │   └── medicalCertificateModel.js
│   ├── node_modules
│   ├── routes
│   │   ├── homeworkRoutes.js
│   │   └── medicalCertificateRoutes.js
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   └── vercel.json
├── frontend
│   ├── About_Us
│   ├── css
│   ├── img
│   ├── js
│   ├── Login_Page
│   │   ├── classroom.avif
│   │   ├── login.html
│   │   └── login.js
│   ├── Student
│   │   ├── Announcement
│   │   ├── Consultation
│   │   ├── Homepage
│   │   ├── Homework_Tracker
│   │   ├── Medical
│   │   ├── Pomodoro_Timer
│   │   ├── Summary
│   │   ├── Timetable
│   │   └── student_navbar.css
│   ├── Teacher
│   │   ├── Academic_Dashboard
│   │   ├── Announcement
│   │   ├── Consultations
│   │   ├── Homepage
│   │   ├── Homework_Tracker
│   │   ├── Timetable
│   │   └── teacher_navbar.css
│   ├── favicon.ico
│   └── index.html
├── node_modules
├── .gitattributes
├── .gitignore
├── package-lock.json
├── package.json
├── secret.env     # INSERT ENVIRONMENT FILE HERE 
└── README.md
```

## Running the Project

### Option A: Visit our deployed website (RECOMMENDED)

#### Hosted link: (TO BE UPDATED)
[Edufly](URL) update link please

### Option B: Run on Localhost

#### 1. Setting Up API Keys

To enable connections to the databases, place the `secret.env` file, which contains the necessary API keys, into the project’s root directory. This file can be obtained from the group’s shared submission documents. Ensure this file is correctly positioned to allow seamless integration and secure database access.

#### 2. Install Dependencies

##### Backend
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

#### 3. Start Backend Server
Run the backend server:
```bash
node app.js
```

If setup is successful, the console should display:
```
Connected to Homework Database on MongoDB Atlas
Connected to Medical Certificate Database on MongoDB Atlas
Server running on http://localhost:3000
```

#### 4. Serve the Frontend
To serve the frontend files, you can use http-server.

##### Using http-server
1. Install http-server globally:
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

## Login Credentials

| Account Type     | Username                  | Password        | Additional Info               |
|------------------|---------------------------|-----------------|-------------------------------|
| Teacher Account  | `chewhuile@gmail.com`      | `testing123$$`  | Oversees 3A and 4A classes     |
| Student Account  | `toddlee8888@gmail.com`    | `testing123$$`  | Student in class 3A           |


## Endpoints

The backend provides the following API endpoints:

### Homework Endpoints
- **Upload Homework**: `POST /api/upload-homework`
  - Body: Form-data with `studentId`, `sectionId`, `title` and `homeworkFile` (PDF, DOC, DOCX).
- **Get All Homework**: `GET /api/homeworks`
- **View Homework by ID**: `GET /api/homeworks/:id`
  - Responds with a PDF or downloadable file.

### Medical Certificate Endpoints
- **Upload Medical Certificate**: `POST /api/upload-medical`
  - Body: Form-data with `studentId` and `certificateFile` (PDF, JPG, JPEG, PNG).
- **Get All Medical Certificates**: `GET /api/medical-certificates`
- **View Medical Certificate by ID**: `GET /api/medical-certificates/:id`
  - Responds with a PDF or downloadable file.
