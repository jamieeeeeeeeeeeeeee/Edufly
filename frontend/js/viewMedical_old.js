async function loadMedicalCertificates() {
    try {
        const response = await fetch('http://localhost:5000/api/medical-certificates');
        const certificates = await response.json();
        
        const medicalList = document.getElementById('medicalList');
        medicalList.innerHTML = '';

        if (certificates.length === 0) {
            medicalList.innerHTML = '<p class="text-center">No medical certificates uploaded yet.</p>';
        } else {
            certificates.forEach(cert => {
                const item = document.createElement('a');
                item.className = "list-group-item list-group-item-action";
                item.href = `http://localhost:5000/api/medical-certificates/${cert._id}`;
                item.target = "_blank";
                item.innerHTML = `
                    <strong>${cert.fileName}</strong> <br>
                    <small>Uploaded by: ${cert.studentId} on ${new Date(cert.uploadedAt).toLocaleString()}</small>
                `;
                medicalList.appendChild(item);
            });
        }
    } catch (error) {
        console.error('Error loading medical certificates:', error);
    }
}

loadMedicalCertificates();
