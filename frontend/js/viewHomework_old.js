async function loadHomework() {
    try {
        const response = await fetch('http://localhost:5000/api/homeworks');
        const homeworks = await response.json();
        
        const homeworkList = document.getElementById('homeworkList');
        homeworkList.innerHTML = '';

        if (homeworks.length === 0) {
            homeworkList.innerHTML = '<p class="text-center">No homework uploaded yet.</p>';
        } else {
            homeworks.forEach(hw => {
                const item = document.createElement('a');
                item.className = "list-group-item list-group-item-action";
                item.href = `http://localhost:5000/api/homeworks/${hw._id}`;
                item.target = "_blank";
                item.innerHTML = `
                    <strong>${hw.fileName}</strong> <br>
                    <small>Uploaded by: ${hw.studentId} on ${new Date(hw.uploadedAt).toLocaleString()}</small>
                `;
                homeworkList.appendChild(item);
            });
        }
    } catch (error) {
        console.error('Error loading homework:', error);
    }
}

loadHomework();
