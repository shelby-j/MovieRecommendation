// //top movie list
const TopTenMovieListCon = document.querySelector(".top-ten-movie-list");
const apiKey = "k_ejtw89k9";
//constantly change the key to check
const fetchMovies = () => {
  fetch("https://imdb-api.com/en/API/Top250Movies/k_ejtw89k9")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        console.log(data);
        const top = data.items.slice(0, 10);
        console.log(top);
        const topTenMovieList = top.map((movie) => {
        const { id, title, image, year, rank, imDbRating } = movie;

        return `<div class="card">
          <a href="http://imdb.com/title/${movie.id}/" target = "blank">
            <img
              src=${image}
              alt="image"
            />
            <div className="card-footer">
              <div className="card-info">
                <h4>${title}</h4>
                <p>${year}</p>
              </div>
            </div>
          </a>
        </div>`;
        })
        .join("");
      TopTenMovieListCon.innerHTML = topTenMovieList;
    });
};
fetchMovies();

//search function
function search_movie() {
  search_res = document.getElementById('search');
  movie_key= search_res.value;
  // console.log(movie_key);
  search_element = 'http://www.omdbapi.com/?apikey=7a24b6a1&s=' + movie_key;
  // console.log(search_element);
  fetch(search_element)
      .then((success) => { 
        return success.json();
      })
      .then((data) => { 
          // console.log(data);
          // console.log(data.Search)
          // top = data.Search;
          const top = data.Search.slice();
          console.log(top);

          const searchList = top.map((movie) => {
              const { image, title, type, year, id } = movie;
              console.log(movie);
              return `<div class="card">
                <a href="http://imdb.com/title/${movie.id}/" target = "blank">
                  <img
                    src=${image}
                    alt="image"
                  />
                  <div className="card-footer">
                    <div className="card-info">
                      <h4>${title}</h4>
                      <p>${year}</p>
                    </div>
                  </div>
                </a>
              </div>`;
              })
              .join("");
            TopTenMovieListCon.innerHTML = searchList;
          })
      .catch((error)=>{ console.log(error)});
};

var counter = 1;
//C:\Program Files (x86)\Google\Chrome\Application>.\chrome.exe --allow-file-access-from-files
//python -m http.server
//http://localhost:8000/MovieRecommendation.html
//get movies info from .xml file -->
function populateMovieListFromXML(xml, tabName) {
    var xmlDoc = xml.responseXML;
    var txt = "<tr><td><b>Title</b></td><td><b>Ratings</b></td><td><b>Year</b></td><td><b>Genre</b></td><td><b>Language</b></td>\
<td><b>Remove</b></td><td><b>Move</b></td></tr>";
    path = "/User/MovieRecommendation/" + tabName + "/Movie";
    console.log(path);
    if (xmlDoc.evaluate) {
        var nodes = xmlDoc.evaluate(path, xmlDoc, null, XPathResult.ANY_TYPE, null);
        var result = nodes.iterateNext();
        var elem;
        var genre;
        var title;
        var ratings;
        var year;
        var lang;
        while (result) {
            genre = result.getAttribute('genre');
            title = result.getElementsByTagName("title")[0].childNodes[0].nodeValue;
            ratings = result.getElementsByTagName("ratings")[0].childNodes[0].nodeValue;
            year = result.getElementsByTagName("year")[0].childNodes[0].nodeValue;
            lang = result.getElementsByTagName("title")[0].getAttribute('lang');

            console.log("result innerHTML" + result.innerHTML);
            console.log('genre=' + genre);
            console.log("title=" + title);
            console.log("ratings=" + ratings);
            console.log("year=" + year);
            console.log("lang=" + lang);

            txt += "<tr><td>" + title + "</td><td>" + ratings + "</td><td>" + year +
                "</td><td>" + genre + "</td><td>" + lang + "</td><td><button onclick='removeEntryfromXML(" + tabName +
                ")'>Remove</button></td><td><button onclick='moveEntryfromXML(" + tabName +
                ")'>Move</button></td></tr>";

            result = nodes.iterateNext();
        }
        console.log(txt);
        //WatchedMoviesTable
        var completeTable = document.getElementById(tabName + "Table");

        completeTable.innerHTML = txt;
    }
}

// open the tab when user click on it 
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += "active";
    //-----------------------------------------------------------
    //action only when a tab (except for home) is clicked
    if (tabName != "Home") {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                populateMovieListFromXML(this, tabName);
            }
        };
        xhttp.open("GET", "MovieRecommendation.xml", true);
        xhttp.send();
    }
}

    //populateMovieListFromXML(tabName);
    //-----------------------------------------------------------

