const apiURL = 'https://api.tvmaze.com/shows';
const movieGrid = document.getElementById('movieGrid');
const genreFilter = document.getElementById('genreFilter');
const sortBy = document.getElementById('sortBy');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumber = document.getElementById('pageNumber');

let allMovies = [];
let currentPage = parseInt(localStorage.getItem('page')) || 1;
let currentGenre = localStorage.getItem('genre') || 'All';
let currentSort = localStorage.getItem('sort') || '';
const moviesPerPage = 6;

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    allMovies = data;
    populateGenres();
    renderMovies();
  });

function populateGenres() {
  const genres = [...new Set(allMovies.flatMap(m => m.genres))];
  genres.forEach(g => {
    const option = document.createElement('option');
    option.value = g;
    option.textContent = g;
    if (g === currentGenre) option.selected = true;
    genreFilter.appendChild(option);
  });
}

function renderMovies() {
  localStorage.setItem('page', currentPage);
  localStorage.setItem('genre', currentGenre);
  localStorage.setItem('sort', currentSort);

  let filtered = currentGenre === 'All'
    ? allMovies
    : allMovies.filter(m => m.genres.includes(currentGenre));

  if (currentSort === 'rating') {
    filtered.sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0));
  } else if (currentSort === 'title') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  const totalPages = Math.ceil(filtered.length / moviesPerPage);
  currentPage = Math.max(1, Math.min(currentPage, totalPages));

  const start = (currentPage - 1) * moviesPerPage;
  const end = start + moviesPerPage;
  const moviesToShow = filtered.slice(start, end);

  movieGrid.innerHTML = moviesToShow.map(movie => `
    <div class="card">
      <img src="${movie.image?.medium}" alt="${movie.name}">
      <h3>${movie.name}</h3>
      <p><strong>Genres:</strong> ${movie.genres.join(', ')}</p>
      <p><strong>Rating:</strong> ${movie.rating.average || 'N/A'}</p>
      <button onclick="addToWatchLater(${movie.id})">Watch Later</button>
    </div>
  `).join('');

  pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}


function addToWatchLater(id) {
  const watchLater = JSON.parse(localStorage.getItem('watchLater')) || [];
  if (!watchLater.includes(id)) {
    watchLater.push(id);
    localStorage.setItem('watchLater', JSON.stringify(watchLater));
    alert('Added to Watch Later!');
  } else {
    alert('Already in Watch Later!');
  }
}

genreFilter.addEventListener('change', () => {
  currentGenre = genreFilter.value;
  currentPage = 1;
  renderMovies();
});

sortBy.addEventListener('change', () => {
  currentSort = sortBy.value;
  currentPage = 1;
  renderMovies();
});

prevBtn.addEventListener('click', () => {
  currentPage--;
  renderMovies();
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  renderMovies();
});
