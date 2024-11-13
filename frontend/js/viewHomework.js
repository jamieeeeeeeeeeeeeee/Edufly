import { auth, db, onAuthStateChanged, getFirestore, doc, getDoc, collection, getDocs, setDoc, addDoc, deleteDoc } from '../js/database.js';

// Create Vue application
const vueApp = Vue.createApp({
    data() {
        return {
            classes: [],
            selectedClass: "",
            homeworkList: [],
            loading: false
        };
    },
    async created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.selectedClass = urlParams.get('class');
        
        onAuthStateChanged(auth, async (user) => { // Check for user authentication and fetch classes
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
    async mounted() {
        this.loadHomework();
    },
    methods: {
        logSelectedClass() {
            console.log("classes; ")
            console.log(this.classes);
            console.log("selected class: ")
            console.log(this.selectedClass); // Log the selected class to the console
        },
        async loadHomework() {
            this.loading = true;

            try {
                const response = await fetch('https://test-mongo-hoz8a2iyq-jamies-projects-ac80ffa6.vercel.app//api/homeworks', {
                    mode: "cors"
                });
                const homeworks = await response.json();

                // Filter homework based on selected class
                this.homeworkList = homeworks.filter(hw => hw.sectionId === this.selectedClass);

            } catch (error) {
                console.error('Error loading homework:', error);
            } finally {
                this.loading = false;
            }
        },
    },
    watch: {
        selectedClass(newClass) {
            this.logSelectedClass(); // Log the selected class whenever it changes
            this.loadHomework()
        }
    }
});

// Mount the Vue app
vueApp.mount('#app');
