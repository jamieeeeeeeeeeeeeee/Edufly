import { auth, db, onAuthStateChanged, getFirestore, doc, getDoc, collection, getDocs, setDoc, addDoc, deleteDoc } from './database.js';

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
        const urlParams = new URLSearchParams(window.location.search);
        this.selectedClass = urlParams.get('class'); 
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
                const response = await fetch('https://test-mongo-in6ge6b0w-jamies-projects-ac80ffa6.vercel.app/api/homeworks', {
                    mode:"cors"
                });
                const homeworks = await response.json();
                 // Filter homework based on the selected class
                 this.homeworkList = homeworks.filter(hw => hw.sectionId === this.selectedClass);

                // const homeworkList = document.getElementById('homeworkList');
                // homeworkList.innerHTML = '';

                // if (homeworks.length === 0) {
                //     homeworkList.innerHTML = '<p class="text-center">No homework uploaded yet.</p>';
                // } else {
                //     homeworks.forEach(hw => {
                //         if (hw.sectionId === this.selectedClass) { // Use this.selectedClass
                //             const item = document.createElement('a');
                //             item.className = "list-group-item list-group-item-action";
                //             item.href = `https://test-mongo-in6ge6b0w-jamies-projects-ac80ffa6.vercel.app/api/homeworks/${hw.sectionId}`;
                //             item.target = "_blank";
                //             item.innerHTML = `
                //                 <strong>${hw.fileName}</strong> <br>
                //                 <small>Uploaded by: ${hw.studentId} form ${hw.sectionId} on ${new Date(hw.uploadedAt).toLocaleString()}</small>
                //             `;
                //             homeworkList.appendChild(item);
                //         }
                //     });
                // }
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
