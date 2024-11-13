import {auth, db, onAuthStateChanged, getFirestore, doc, getDoc, collection, getDocs, setDoc, addDoc, deleteDoc } from '../js/database.js';
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
                const response = await fetch('https://test-mongo-in6ge6b0w-jamies-projects-ac80ffa6.vercel.app/api/medical-certificates');
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
                            item.href = `https://test-mongo-in6ge6b0w-jamies-projects-ac80ffa6.vercel.app/api/medical-certificates/${cert._id}`;
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
