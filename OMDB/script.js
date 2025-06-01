const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let debounceTimer;

searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      searchMovies(query);
    } else {
      resultsDiv.innerHTML = "";
    }
  }, 500);
});

async function searchMovies(query) {
  const apiKey = "YOUR_API_KEY"; // Replace with your real API key
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      resultsDiv.innerHTML = `<p>No results found</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsDiv.innerHTML = `<p>Error fetching data</p>`;
  }
}

function displayMovies(movies) {
  resultsDiv.innerHTML = "";
  movies.forEach(movie => {
    const p = document.createElement("p");
    p.textContent = movie.Title;
    resultsDiv.appendChild(p);
  });
}
