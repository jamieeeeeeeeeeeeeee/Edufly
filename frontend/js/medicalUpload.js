import { auth, db, onAuthStateChanged, doc, getDoc } from '../js/database.js';

const vueApp = Vue.createApp({
    data() {
        return {
            studentName: "",
            userId: "", // Holds StudentID after Firebase fetch
            userClass: "",  // Holds Class after Firebase fetch
            startDate: "",
            endDate: "",
            certificateFile: null, // Stores the uploaded file
            message: "" // Stores the response message
        };
    },
    async created() {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userEmail = user.email;
                const docRef = doc(db, 'Students', userEmail);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("vue data types will be populated");
                    this.studentName = docSnap.data().FName + " " + docSnap.data().LName; // Populates Student Full Name
                    this.userId = docSnap.data().StudentID; // Populates StudentID
                    this.userClass = docSnap.data().Class; // Populates Class
                    console.log(this.studentName, this.userId, this.userClass);
                } else {
                    console.error("No such document!");
                }
            } else {
                console.error("User not logged in.");
            }
        });
    },
    computed: {
        dateError() {
            if (this.startDate && this.endDate) {
                if (this.startDate > this.endDate) {
                    return 'Start date cannot be later than end date.';
                } else if (this.endDate < this.startDate) {
                    return 'End date cannot be earlier than start date.';
                }
            }
            return null;
        },
    },
    methods: {
        handleFileUpload(event) {
            this.certificateFile = event.target.files[0]; // Store selected file
        },
        async uploadMedicalCertificate() {
            if (!this.certificateFile) {
                this.message = '<div class="alert alert-danger">Please select a file to upload</div>';
                return;
            }

            const formData = new FormData();
            formData.append('studentId', this.userId);
            formData.append('sectionId', this.userClass);
            formData.append('certificateFile', this.certificateFile);
            formData.append('startDate', this.startDate);
            formData.append('endDate', this.endDate);

            try {
                const response = await fetch('https://edufly-backend-ei8pk5n0k-jamies-projects-ac80ffa6.vercel.app/api/upload-medical', {
                    method: 'POST',
                    body: formData,
                    mode: "cors"
                });

                if (response.ok) {
                    this.message = '<div class="alert alert-success">Medical certificate uploaded successfully</div>';
                    console.log(this.startDate, this.endDate);
                    this.startDate = null;
                    this.endDate = null;
                    this.certificateFile = null; // Clear file data
                    document.getElementById('certificateFileInput').value = ""; // Clear file input in UI
                } else {
                    this.message = '<div class="alert alert-danger">Failed to upload medical certificate</div>';
                }
            } catch (error) {
                this.message = '<div class="alert alert-danger">Error uploading medical certificate</div>';
            }
        }
    }
});

vueApp.mount("#app");
