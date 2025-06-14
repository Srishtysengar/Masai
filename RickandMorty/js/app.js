let currentURL = 'https://rickandmortyapi.com/api/character';
let debounceTimer;

async function loadCharacters(url = currentURL) {
  const data = await fetchCharacters(url);
  currentURL = url;
  renderCharacters(data.results);


  document.getElementById('prev').disabled = !data.info.prev;
  document.getElementById('next').disabled = !data.info.next;

  document.getElementById('prev').onclick = () => loadCharacters(data.info.prev);
  document.getElementById('next').onclick = () => loadCharacters(data.info.next);

 
  document.querySelectorAll('.card').forEach(card => {
    card.onclick = async () => {
      const id = card.dataset.id;
      const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const char = await res.json();
      showModal(char);
    };
  });
}

function applyFilters() {
  let url = new URL('https://rickandmortyapi.com/api/character');
  const name = document.getElementById('search').value;
  const status = document.getElementById('status').value;
  const species = document.getElementById('species').value;

  if (name) url.searchParams.append('name', name);
  if (status) url.searchParams.append('status', status);
  if (species) url.searchParams.append('species', species);

  loadCharacters(url.toString());
}

document.getElementById('search').addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(applyFilters, 300);
});



document.getElementById('status').onchange = applyFilters;
document.getElementById('species').onchange = applyFilters;

document.getElementById('modal-close').onclick = closeModal;

window.onload = () => loadCharacters();