document.getElementById('homeworkForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const sectionId = document.getElementById('sectionId').value;
    const homeworkFile = document.getElementById('homeworkFile').files[0];
    const formData = new FormData();
    formData.append('studentId', studentId);
    formData.append('sectionId', sectionId);
    formData.append('homeworkFile', homeworkFile);

    const messageDiv = document.getElementById('message');
    try {
        const response = await fetch('http://localhost:5000/api/upload-homework', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            messageDiv.innerHTML = '<div class="alert alert-success">Homework uploaded successfully</div>';
            document.getElementById('homeworkForm').reset(); // Resets form fields
        } else {
            messageDiv.innerHTML = '<div class="alert alert-danger">Failed to upload homework</div>';
        }
        
    } catch (error) {
        messageDiv.innerHTML = '<div class="alert alert-danger">Error uploading homework</div>';
    }
});
