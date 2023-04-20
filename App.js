const nowPlayingBtn = document.getElementById('main-content-heading');
const actionBtn = document.getElementById('Action');
const adventureBtn = document.getElementById('Adventure');
const animationBtn = document.getElementById('animation');
const comedyBtn = document.getElementById('comedy');
const crimeBtn = document.getElementById('crime');
const documentaryBtn = document.getElementById('documentary');
const dramaBtn = document.getElementById('drama');
const familyBtn = document.getElementById('family');
const fantasyBtn = document.getElementById('fantasy');
const historyBtn = document.getElementById('history');
const horroBtnr = document.getElementById('horror');
const musicBtn = document.getElementById('music');
const mysteryBtn = document.getElementById('mystery');
const romanceBtn = document.getElementById('romance');
const fictionBtn = document.getElementById('fiction');
const TV_MovieBtn = document.getElementById('TV_Movie');

const display_content = document.getElementsByClassName("display-content")[0];


const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const GenreList = document.querySelector(".Genre-List");

const movieDescription = document.querySelector('.movie-description');

const API_KEY = "05baa17ae09fa9e246aabe02ef40245b";
const NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
// https://api.themoviedb.org/3/movie/now_playing?api_key=05baa17ae09fa9e246aabe02ef40245b&page=2
const GENRE_LIST = "https://api.themoviedb.org/3/genre/movie/list?api_key=";
const SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=";

var MovieDetails = [];
var genreListData = [];

window.onload = function () {
    nowPlayingBtn.innerHTML = "Now Playing";
    genreListApiCall();
    NowPlayingMovieCardsApiCall();
    hideMovieDescription();
};
// Movie Cards Displaying API and MARKUP Codes....................................
const NowPlayingMovieCardsApiCall = async () => {
    const response = await fetch(NOW_PLAYING + API_KEY);
    // MovieDetails = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        MovieDetails = myJson.results;
    }
    else {
        //handle errors
        console.log(response.status, response.statusText);
    }
    DisplayMovieCards();
}

function DisplayMovieCards() {
    display_content.innerHTML = "";
    MovieDetails.forEach(Element => {
        // console.log(Element);
        let MovieCards = `
                <div onClick="displayMovieDescription('${Element.original_title}')"  class="movie-card">
                 <div class="movie-poster">
                 <img src="https://www.themoviedb.org/t/p/w220_and_h330_face//${Element.poster_path}" alt="Image is not available">
                 </div>
                    <div class="movie-title">${Element.original_title}</div>
                    <div class="movie-info">
                    <span class="movie-language" id="language">${Element.original_language.toUpperCase()}</span>
                    <span class="movie-ratings" id="rating">${Element.vote_average}</span>
                    </div>
                 </div>`
            ;
            display_content.innerHTML += MovieCards;
        });
        
    }
    
    // Generating Genre-list using API and MARKUP Codes................................
    const genreListApiCall = async () => {
    const response = await fetch(GENRE_LIST + API_KEY);
    const myJson = await response.json();
    genreListData = myJson.genres;
    
    generateGenreList();
}

function generateGenreList() {
    GenreList.innerHTML = "";
    genreListData.forEach(element => {
        let Genreelement = `<a href="#" id="${element.name}">${element.name}</a>`;
        GenreList.innerHTML += Genreelement;
    });
}

// Movies Search codes..............................................
searchBtn.addEventListener('click', searchMovies);
// searchInput.addEventListener('keyup', searchMovies);

function searchMovies() {
    console.log("clickfunction")
    let filterValue = searchInput.value.toUpperCase();
    let items = document.querySelectorAll('.movie-card');
    
    for (let i = 0; i < items.length; i++) {
        let movieName = items[i].querySelector('.movie-title');
        //mango
        //m       index of "m"=0,which is > -1.
        if ((movieName.innerHTML.toUpperCase().indexOf(filterValue) > -1)) {
            items[i].style.display = "";
            
        }
        else {
            items[i].style.display = "none";
        }
    }
}

// Displaying Movie Description

function displayMovieDescription(ids) {
    movieDescription.innerHTML = "";
    MovieDetails.forEach(objectlist => {
        if (ids === objectlist.original_title) {
            let moviedescr =
            `<button onClick="hideMovieDescription()" class="close-button">Close</button>
                <div class="movie-image">
                <img src="https://image.tmdb.org/t/p/w500/${objectlist.backdrop_path}" alt="Image is not available">
                </div>
                <div class="movie-details">
                    <div class="movie-name">${objectlist.original_title}</div>
                    <div class="rating mr-top">⭐ ${objectlist.vote_average}/10</div>
                    <div class="language mr-top">${objectlist.original_language.toUpperCase()}</div>
                    <div class="duration-genre mr-top">
                        <span class="duration">135 minutes</span>
                        <ul>
                        <li>
                                <span class="genre">Action</span>
                                </li>
                        </ul>
                        </div>
                        <div class="overview mr-top">${objectlist.overview}</div>
                        <div class="movie-price mr-top">&#8377; 250</div>
                        <button class="ticket-booking mr-top">Book Tickets</button>
                </div>`
            movieDescription.innerHTML += moviedescr;
        }
    })
    movieDescription.style.display = "";
}
// displayMovieDescription();

function hideMovieDescription() {
    movieDescription.style.display ="none";
}