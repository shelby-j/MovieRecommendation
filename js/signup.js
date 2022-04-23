import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyAyM9EXN8H909VDemO8Ymmm38dBrd_ztoA",
authDomain: "movie-recommendation-4fca4.firebaseapp.com",
databaseURL: "https://movie-recommendation-4fca4-default-rtdb.firebaseio.com",
projectId: "movie-recommendation-4fca4",
storageBucket: "movie-recommendation-4fca4.appspot.com",
messagingSenderId: "139216035401",
appId: "1:139216035401:web:4d0edd0967715406082998",
measurementId: "G-CE6CDQQQCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth();
const db = getFirestore(app);

let signUp = document.getElementById('signUp');

signUp.addEventListener('click', (e)=> { 
    //get infomation from user
    var email = document.getElementById('email').value;
    var userid = document.getElementById('userID').value;
    var password = document.getElementById('password').value;
    var dob = document.getElementById('DOB').value;
    var checkedGenre = []; 
    var genre = document.getElementsByClassName('genre');
    var link = document.getElementById('link');
    for(var i=0; genre[i]; ++i){
        if(genre[i].checked){
            checkedGenre.push(genre[i].name);
        }
    }
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
        const user = userCredential.user;
        const docRef = addDoc(collection(db, "users"), {
            email: email,
            id: userid,
            password: password,
            dob: dob,
            genre: checkedGenre,
        })
        window.location.href = "MovieRecommendation.html";
        // alert('user created');
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error);
    // ..
    });
})