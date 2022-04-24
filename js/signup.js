import {app, analytics, database, auth, initializeApp, db, getAnalytics, getDatabase, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getFirestore, collection, addDoc} from "./config.js"
let signUp = document.getElementById('signUp');

signUp.addEventListener('click', (e)=> { 
    // get infomation from user
    var email = document.getElementById('email').value;
    var userid = document.getElementById('userID').value;
    var password = document.getElementById('password').value;
    var dob = document.getElementById('DOB').value;
    var checkedGenre = []; 
    var genre = document.getElementsByClassName('genre');
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
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error);
    // ..
    });
})


