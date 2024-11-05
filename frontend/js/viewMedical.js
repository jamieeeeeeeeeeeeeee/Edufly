import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkep4kR1KlxAHUQM8-dJo-b0cOjUA1tCc",
    authDomain: "edufly-61bfe.firebaseapp.com",
    projectId: "edufly-61bfe",
    storageBucket: "edufly-61bfe.appspot.com",
    messagingSenderId: "467191151194",
    appId: "1:467191151194:web:cac30fd47ebff5a7233663",
    measurementId: "G-NQN411353D"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

// Create Vue application
const vueApp = Vue.createApp({
    data() {
        return {
            classes: [],
            selectedClass: "",
        };
    },
    async created() {
        // Check for user authentication and fetch classes
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userEmail = user.email;
                const docRef = doc(db, 'Teachers', userEmail);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    this.classes = docSnap.data().Classes; // Fetch classes
                } else {
                    console.error("No such document!");
                }
            } else {
                console.error("User not logged in.");
            }
        });
    },
    methods: {
        logSelectedClass() {
            console.log(this.classes);
            console.log(this.selectedClass); // Log the selected class to the console
        },
        async loadMedicalCertificates() {
            try {
                const response = await fetch('http://localhost:5000/api/medical-certificates');
                const certificates = await response.json();
                
                const medicalList = document.getElementById('medicalList');
                medicalList.innerHTML = '';

                if (certificates.length === 0) {
                    medicalList.innerHTML = '<p class="text-center">No medical certificates uploaded yet.</p>';
                } else {
                    certificates.forEach(cert => {
                        if (cert.sectionId === this.selectedClass) { // Filter by selected class if needed
                            const item = document.createElement('a');
                            item.className = "list-group-item list-group-item-action";
                            item.href = `http://localhost:5000/api/medical-certificates/${cert._id}`;
                            item.target = "_blank";
                            item.innerHTML = `
                                <strong>${cert.fileName}</strong> <br>
                                <small>Uploaded by: ${cert.studentId} from ${cert.sectionId} on ${new Date(cert.uploadedAt).toLocaleString()}</small>
                            `;
                            medicalList.appendChild(item);
                        }
                    });
                }
            } catch (error) {
                console.error('Error loading medical certificates:', error);
            }
        },
    },
    watch: {
        selectedClass(newClass) {
            this.logSelectedClass(); // Log the selected class whenever it changes
            this.loadMedicalCertificates(); // Call loadMedicalCertificates when selectedClass changes
        }
    }
});

// Mount the Vue app
vueApp.mount('#app');
