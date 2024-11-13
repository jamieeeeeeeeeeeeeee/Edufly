import { auth, db, onAuthStateChanged, doc, getDoc } from '../js/database.js';

const vueApp = Vue.createApp({
    data() {
        return {
            title: "",
            userId: "", // Holds StudentID after Firebase fetch
            userClass: "",  // Holds Class after Firebase fetch
            homeworkFile: null, // Stores the uploaded file
            message: "", // Stores the response message
            submissionSummary: null, // Submission summary object
        };
    },
    async created() {
         // Extract assignment title from the URL query parameters
         const urlParams = new URLSearchParams(window.location.search);
         const assignmentTitle = urlParams.get('title');
         this.title = assignmentTitle || 'Untitled'; // Set default if not found
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userEmail = user.email;
                const docRef = doc(db, 'Students', userEmail);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("vue data types will be populated");
                    this.userId = docSnap.data().StudentID; // Populates StudentID
                    this.userClass = docSnap.data().Class; // Populates Class
                    console.log(this.userId, this.userClass);
                } else {
                    console.error("No such document!");
                }
            } else {
                console.error("User not logged in.");
            }
        });
    },
    methods: {
        handleFileUpload(event) {
            this.homeworkFile = event.target.files[0]; // Store selected file
        },
        async uploadHomework() {
            if (!this.homeworkFile) {
                this.message = '<div class="alert alert-danger">Please select a file to upload</div>';
                return;
            }

            const formData = new FormData();
            formData.append('studentId', this.userId);
            formData.append('sectionId', this.userClass);
            formData.append('title', this.title);
            formData.append('homeworkFile', this.homeworkFile);

            try {
                const response = await fetch('https://test-mongo-hoz8a2iyq-jamies-projects-ac80ffa6.vercel.app/api/upload-homework', {
                    method: 'POST',
                    body: formData,
                    mode: "cors"
                });

                const responseText = await response.text(); // Get server response text for logging

                if (response.ok) {
                    // this.message = '<div class="alert alert-success">Homework uploaded successfully</div>';

                    this.submissionSummary = {
                        title: this.title,
                        fileName: this.homeworkFile.name,
                        uploadTime: new Date().toLocaleString()
                    };
                    
                    this.title = "Untitled";
                    this.homeworkFile = null; // Clear file data
                    document.getElementById('homeworkFileInput').value = ""; // Clear file input in UI
                } else {
                    console.error('Server responded with error:', response.status, responseText);
                    this.message = '<div class="alert alert-danger">Failed to upload homework</div>';
                }
            } catch (error) {
                console.error('Error during upload:', error);
                this.message = '<div class="alert alert-danger">Error uploading homework</div>';
            }
        }
    }
});

vueApp.mount("#app");
