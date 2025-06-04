let allCharacters = [];
let currentPage = 1;
const charactersPerPage = 6;

async function fetchCharacters() {
  const response = await fetch('https://akabab.github.io/starwars-api/api/all.json');
  allCharacters = await response.json();
  renderCharacters();
}

function renderCharacters() {
  const grid = document.getElementById('characterGrid');
  grid.innerHTML = '';
  const start = (currentPage - 1) * charactersPerPage;
  const end = start + charactersPerPage;
  const charactersToShow = allCharacters.slice(start, end);

  charactersToShow.forEach(char => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => window.open(`detail.html?id=${char.id}`, '_blank');
    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}" />
      <h2>${char.name}</h2>
      <p>Species: ${char.species || 'Unknown'}</p>
      <p>Gender: ${char.gender || 'Unknown'}</p>
    `;
    grid.appendChild(card);
  });
}

function changePage(delta) {
  const maxPage = Math.ceil(allCharacters.length / charactersPerPage);
  currentPage = Math.min(Math.max(currentPage + delta, 1), maxPage);
  renderCharacters();
}

function updateClock() {
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString(undefined, options);
  document.getElementById('clock').textContent = `${time} ${date}`;
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}

function openRandomCharacter() {
  if (allCharacters.length > 0) {
    const randomChar = allCharacters[Math.floor(Math.random() * allCharacters.length)];
    window.open(`detail.html?id=${randomChar.id}`, '_blank');
  }
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('randomCharacter').addEventListener('click', openRandomCharacter);

setInterval(updateClock, 1000);
updateClock();
fetchCharacters();