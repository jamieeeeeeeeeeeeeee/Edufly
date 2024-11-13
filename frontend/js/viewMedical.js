import { auth, db, onAuthStateChanged, getFirestore, doc, getDoc, collection, getDocs, setDoc, addDoc, deleteDoc } from '../js/database.js';

// Create Vue application
const vueApp = Vue.createApp({
    data() {
        return {
            classes: [],
            selectedClass: "",
            loading: false

        };
    },
    async created() {
        // Check if there's a 'class' parameter in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const classFromUrl = urlParams.get('class');

        // Set selectedClass from URL if it exists
        if (classFromUrl) {
            this.selectedClass = classFromUrl;
            await this.loadMedicalCertificates();
        }
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
            this.loading = true;

            try {
                const response = await fetch('https://test-mongo-hoz8a2iyq-jamies-projects-ac80ffa6.vercel.app/api/medical-certificates', {
                    mode: "cors"
                });
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
                            item.href = `https://test-mongo-hoz8a2iyq-jamies-projects-ac80ffa6.vercel.app/api/medical-certificates/${cert._id}`;
                            item.target = "_blank";
                            item.innerHTML = `
                                <strong>${cert.studentId}</strong> <br>
                                <span>Medically certified from <u style='color:grey'>${cert.startDate}</u> to <u style='color:grey'>${cert.endDate}</u></span> <br>
                                <span>${cert.fileName}</span> <br>
                                <small>Uploaded by: ${cert.studentId} from ${cert.sectionId} on ${new Date(cert.uploadedAt).toLocaleString()}</small>
                            `;
                            medicalList.appendChild(item);
                        }
                    });
                }
            } catch (error) {
                console.error('Error loading medical certificates:', error);
            } finally {
                this.loading = false
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
