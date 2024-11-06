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
            homeworkList: [],
        };
    },
    async created() {
        // Retrieve selected class from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        this.selectedClass = urlParams.get('class') || "";

        // Check for user authentication and fetch classes
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userEmail = user.email;
                const docRef = doc(db, 'Teachers', userEmail);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    this.classes = docSnap.data().Classes;
                    
                    // Load homework if class is pre-selected
                    if (this.selectedClass) {
                        this.loadHomework();
                    }
                } else {
                    console.error("No such document!");
                }
            } else {
                console.error("User not logged in.");
            }
        });
    },
    methods: {
        async loadHomework() {
            try {
                const response = await fetch('https://test-mongo-in6ge6b0w-jamies-projects-ac80ffa6.vercel.app/api/homeworks', {
                    mode: "cors"
                });
                const homeworks = await response.json();

                // Filter and update homework list based on selected class
                this.homeworkList = homeworks.filter(hw => hw.sectionId === this.selectedClass);
            } catch (error) {
                console.error('Error loading homework:', error);
            }
        },
    },
    watch: {
        selectedClass(newClass) {
            // Load homework data whenever the selected class changes
            this.loadHomework();
        }
    }
});

// Mount the Vue app
vueApp.mount('#app');
