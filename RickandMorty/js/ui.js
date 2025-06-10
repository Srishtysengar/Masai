function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = character.id;
  
    let veteranBadge = character.episode.length > 30
      ? '<div class="badge veteran">Veteran</div>' : '';
  
    card.innerHTML = `
      ${veteranBadge}
      <img src="${character.image}" alt="${character.name}" width="150"/>
      <h3>${character.name}</h3>
      <p>${character.species}</p>
      <p class="status ${character.status.toLowerCase()}">${character.status}</p>
      <p><strong>Location:</strong> ${character.location.name}</p>
    `;
    return card;
  }
  
  function renderCharacters(characters) {
    const container = document.getElementById('character-container');
    container.innerHTML = '';
    characters.forEach(char => {
      container.appendChild(createCharacterCard(char));
    });
  }
  
  function showModal(character) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
  
    modalBody.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}" width="200"/>
      <p><strong>Gender:</strong> ${character.gender}</p>
      <p><strong>Status:</strong> ${character.status}</p>
      <p><strong>Species:</strong> ${character.species}</p>
      <p><strong>Origin:</strong> ${character.origin.name}</p>
      <p><strong>Location:</strong> ${character.location.name}</p>
      <p><strong>Episode Count:</strong> ${character.episode.length}</p>
    `;
  
    modal.classList.remove('hidden');
  }
  
  function closeModal() {
    document.getElementById('modal').classList.add('hidden');
  }