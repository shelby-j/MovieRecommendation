import {app, analytics, database, auth, initializeApp, db, getAnalytics, getDatabase, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getFirestore, collection, addDoc} from "./config.js"

let logIn = document.getElementById('logIn');

logIn.addEventListener('click', (e)=> { 
    e.preventDefault();
    var email = document.getElementById('email').value;
    console.log(email);
    var password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    window.location.href = "MovieRecommendation.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
})