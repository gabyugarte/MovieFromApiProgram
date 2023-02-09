// JavaScript file
// import API_KEY from "./apiKey";

let page = 1;
const btnBefore = document.getElementById("btnBefore");
const btnNext = document.getElementById("btnNext");

btnNext.addEventListener("click", () =>{
  if(page < 1000){
    page += 1;
    getMovies();
}
});
btnBefore.addEventListener("click", () =>{
  if(page > 1){
    page -= 1;
    getMovies();
}
});
async function getMovieInfo(movieName) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=1a84f49d058875509515fcd6b78aa428&query=${movieName}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0];
    }
  
    async function displayMovieInfoModal(movie) {
      const modal = document.querySelector(".modal");
      modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <div class="movie">
          <h3 class="title"><b>Title:</b> ${movie.title}</p>
          <p><b>Release Date:</b> ${movie.release_date}</p>
          <p><b>Overview:</b> ${movie.overview}</p>
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
        </div>
      </div>
      `;
    
      modal.style.display = "block";
    
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
      });
    }
  
  const submitButton = document.querySelector("#submitButton");
  submitButton.addEventListener("click", async function() {
    const movieNameInput = document.querySelector("#movieName");
    const movieName = movieNameInput.value;
    const movie = await getMovieInfo(movieName);
    displayMovieInfoModal(movie);
  });
//GET POPULAR MOVIES

const getMovies = async() => {

  try{
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=1a84f49d058875509515fcd6b78aa428&page=${page}`;
    const response = await fetch(url);
    // console.log(response);

    if(response.status === 200) {
      const data = await response.json();
      let movies = '';
      data.results.forEach((movie) => {
        movies += `
        <div class="movie">
          <img class="poster" id= "submit" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
          <h3 class="title" id="movieNameCliked">${movie.title}</h3>
        </div>
        `;
      });
    document.getElementById('popularMovies').innerHTML = movies;
    }else if(response.status === 401){
      console.log('Error');
    }else if(response.status === 404){
      console.log('Not Found');
    }else{
      console.log('Fatal Error');
    }
  
  } catch(error){
    console.log(error);
  }
}
const movieList = document.querySelector("#popularMovies");
movieList.addEventListener('click', async (e) => {
  if (e.target.className === 'poster'){
    const movieName = e.target.nextElementSibling.textContent;
    const movie = await getMovieInfo(movieName);
    displayMovieInfoModal(movie);
  }
});
getMovies();