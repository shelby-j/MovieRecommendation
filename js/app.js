import {setDoc, app, analytics, auth, db, initializeApp, getAnalytics, getDatabase, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getFirestore, collection, addDoc} from "./config.js"

// const db = firebase.firestore();
//search function
let search_movie = document.getElementById('search_movie');
search_movie.addEventListener('click',(e)=> {
  e.preventDefault();
  let search_res = document.getElementById('search');
  let movie_key= search_res.value;
  // console.log(movie_key);
  let search_element = 'http://www.omdbapi.com/?apikey=7a24b6a1&s=' + movie_key;
  // console.log(search_element);
  fetch(search_element)
      .then((success) => { 
        return success.json();
      })
      .then((data) => {
          const top = data.Search;
          const top2 = data.Search;
          console.log(top);
          const searchList = top.map((movie, index) => {
              const { Poster, Title, Year, imdbID } = movie;
              // const top2 = data.Search;
              // console.log(top2);
              return `<div class="card" id = "${index}">
                <a href="http://imdb.com/title/${movie.imdbID}/" target = "blank">
                  <img
                     src=${Poster}
                     alt="image"
                   />
                   <div className="card-footer">
                     <div className="card-info" id="card-info${index}">
                       <h5>${Title}</h5>
                       <p>${Year}</p>
                     </div>
                   </div>
                </a>
                <div class="dropdown">
                   <button onclick="import('./js/app.js').then(o=> o.myFunction(${index}))" class="dropbtn">Add to list</button>
                   <div id="myDropdown${index}" class="dropdown-content">
                    <button id="watched" onclick="import('./js/app.js').then(o=> o.add(${index},'watched'))">Watched</button>
                     <button id="mustwatch" onclick="import('./js/app.js').then(o=> o.add(${index},'mustwatch'))">Must-watch</button>
                     <button id = "liked" onclick="import('./js/app.js').then(o=> o.add(${index},'liked'))">Liked</button>
                     <button id = "disliked" onclick="import('./js/app.js').then(o=> o.add(${index},'disliked'))">Disliked</button>
                   </div>
                 </div>
              </div>`;
            })
            TopTenMovieListCon.innerHTML = searchList; 
          })
      .catch((error)=>{ console.log(error)});
}
)


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
export function myFunction(index) {
  console.log(index)
  document.getElementById("myDropdown"+index).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

export function test(index) {
    const link = document.getElementById(index).firstElementChild.href;
    const src = document.getElementById(index).firstElementChild.firstElementChild.src;
    const title = document.getElementById('card-info'+index).firstElementChild.textContent;
    const year = document.getElementById('card-info'+index).lastElementChild.textContent;
    const movieData = {
      link,
      img: src,
      title,
      year
    }
    return movieData;
  }

export async function add(index,subcollection) {
    let item = test(index);
    console.log(item);
    const user = auth.currentUser;
    const uid = user.uid;
    console.log(uid);
    await addDoc(collection(db, "users", uid, subcollection), item);
}

let signout = document.getElementById('out');
signout.addEventListener('click', (e)=> {
  e.preventDefault();
  signOut(auth).then(() => {
    // Sign-out successful.
    window.location.href = "login.html";
  }).catch((error) => {
    // An error happened.
  });
})

// function getdata(subcollection) {

// }

// export function