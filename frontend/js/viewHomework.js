import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "",
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
        async loadHomework() {
            try {
                const response = await fetch('http://localhost:5000/api/homeworks');
                const homeworks = await response.json();

                const homeworkList = document.getElementById('homeworkList');
                homeworkList.innerHTML = '';

                if (homeworks.length === 0) {
                    homeworkList.innerHTML = '<p class="text-center">No homework uploaded yet.</p>';
                } else {
                    homeworks.forEach(hw => {
                        if (hw.sectionId === this.selectedClass) { // Use this.selectedClass
                            const item = document.createElement('a');
                            item.className = "list-group-item list-group-item-action";
                            item.href = `http://localhost:5000/api/homeworks/${hw._id}`;
                            item.target = "_blank";
                            item.innerHTML = `
                                <strong>${hw.fileName}</strong> <br>
                                <small>Uploaded by: ${hw.studentId} form ${hw.sectionId} on ${new Date(hw.uploadedAt).toLocaleString()}</small>
                            `;
                            homeworkList.appendChild(item);
                        }
                    });
                }
            } catch (error) {
                console.error('Error loading homework:', error);
            }
        },
    },
    watch: {
        selectedClass(newClass) {
            this.logSelectedClass(); // Log the selected class whenever it changes
            this.loadHomework(); // Call loadHomework when selectedClass changes
        }
    }
});

// Mount the Vue app
vueApp.mount('#app');
