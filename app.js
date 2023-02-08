// JavaScript file
import API_KEY from "./apiKey";

async function getMovieInfo(movieName) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0];
  }
  
  async function displayMovieInfo(movie) {
    const movieInfoContainer = document.querySelector("#movieInfo");
    movieInfoContainer.innerHTML = `
      <p><b>Title:</b> ${movie.title}</p>
      <p><b>Release Date:</b> ${movie.release_date}</p>
      <p><b>Overview:</b> ${movie.overview}</p>
    `;
  }
  
  const submitButton = document.querySelector("#submitButton");
  submitButton.addEventListener("click", async function() {
    const movieNameInput = document.querySelector("#movieName");
    const movieName = movieNameInput.value;
    const movie = await getMovieInfo(movieName);
    displayMovieInfo(movie);
  });
  