import {doc, setDoc, app, analytics, auth, db, initializeApp, getAnalytics, getDatabase, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getFirestore, collection, addDoc, getDoc, getDocs} from "./config.js"

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
    const user = auth.currentUser;
    const uid = user.uid;
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


export async function display(subcollection) {
  //get the list of movies (watched, disliked)
  let list_data=[]
  const user = auth.currentUser;
  const uid = user.uid;
  const querySnapshot = await getDocs(collection(db, "users",uid,subcollection));
  querySnapshot.forEach((doc) => {
    list_data.push(doc.data());
  });
  
  //display movie
  const sub_list = list_data.map((movie, index) => {
    const { img, link, title, year } = movie;
    return `<div class="card" id = "${index}">
      <a href="${movie.link}/" target = "blank">
        <img
           src=${img}
           alt="image"
         />
         <div class="card-footer">
           <div class="card-info" id="card-info${index}">
             <h5>${title}</h5>
             <p>${year}</p>
           </div>
         </div>
      </a>
    </div>`;
  })
  TopTenMovieListCon.innerHTML = sub_list; 

}

// var counter = 1;
// //C:\Program Files (x86)\Google\Chrome\Application>.\chrome.exe --allow-file-access-from-files
// //python -m http.server
// //http://localhost:8000/MovieRecommendation.html
// //get movies info from .xml file -->
// function populateMovieListFromXML(xml, tabName) {
//     var xmlDoc = xml.responseXML;
//     var txt = "<tr><td><b>Title</b></td><td><b>Ratings</b></td><td><b>Year</b></td><td><b>Genre</b></td><td><b>Language</b></td>\
// <td><b>Remove</b></td><td><b>Move</b></td></tr>";
//     path = "/User/MovieRecommendation/" + tabName + "/Movie";
//     // console.log(path);
//     if (xmlDoc.evaluate) {
//         var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
//         var result = nodes.iterateNext();
//         var elem;
//         var genre;
//         var title;
//         var ratings;
//         var year;
//         var lang;
//         while (result) {
//             genre = result.getAttribute('genre');
//             title = result.getElementsByTagName("title")[0].childNodes[0].nodeValue;
//             ratings = result.getElementsByTagName("ratings")[0].childNodes[0].nodeValue;
//             year = result.getElementsByTagName("year")[0].childNodes[0].nodeValue;
//             lang = result.getElementsByTagName("title")[0].getAttribute('lang');

//             // console.log("result innerHTML" + result.innerHTML);
//             // console.log('genre=' + genre);
//             // console.log("title=" + title);
//             // console.log("ratings=" + ratings);
//             // console.log("year=" + year);
//             // console.log("lang=" + lang);

//             txt += "<tr><td>" + title + "</td><td>" + ratings + "</td><td>" + year +
//                 "</td><td>" + genre + "</td><td>" + lang + "</td><td><button onclick='removeEntryfromXML(" + tabName +
//                 ")'>Remove</button></td><td><button onclick='moveEntryfromXML(" + tabName +
//                 ")'>Move</button></td></tr>";

//             result = nodes.iterateNext();
//         }
//         // console.log(txt);
//         //WatchedMoviesTable
//         var completeTable = document.getElementById(tabName + "Table");

//         completeTable.innerHTML = txt;
//     }
// }

// // open the tab when user click on it 
// function openTab(evt, tabName) {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace("active", "");
//     }
//     // console.log(document.getElementById(tabName));
//     document.getElementById(tabName).style.display = "block";
//     evt.currentTarget.className += "active";
//     //-----------------------------------------------------------
//     //action only when a tab (except for home) is clicked
//     if (tabName != "Home") {
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 populateMovieListFromXML(this, tabName);
//             }
//         };
//         xhttp.open("GET", "MovieRecommendation.xml", true);
//         xhttp.send();
//     }
// } 