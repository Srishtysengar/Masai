function getCharacterIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }
  
  async function fetchCharacterDetails(id) {
    const res = await fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`);
    return res.json();
  }
  
  function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString(undefined, options);
    document.getElementById('clock').textContent = `${time} ${date}`;
  }
  
  async function loadCharacter() {
    const id = getCharacterIdFromURL();
    const char = await fetchCharacterDetails(id);
  
    document.getElementById('name').textContent = char.name;
    document.getElementById('image').src = char.image;
    document.getElementById('gender').textContent = char.gender || 'Unknown';
    document.getElementById('species').textContent = char.species || 'Unknown';
    document.getElementById('homeworld').textContent = char.homeworld || 'Unknown';
    document.getElementById('affiliations').textContent = char.affiliations?.join(', ') || 'None';
    document.getElementById('height').textContent = char.height || 'Unknown';
    document.getElementById('mass').textContent = char.mass || 'Unknown';
    document.getElementById('eyeColor').textContent = char.eyeColor || 'Unknown';
    document.getElementById('hairColor').textContent = char.hairColor || 'Unknown';
    document.getElementById('skinColor').textContent = char.skinColor || 'Unknown';
  }
  
  setInterval(updateClock, 1000);
  updateClock();
  loadCharacter();
  