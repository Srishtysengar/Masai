const API_BASE="https://rickandmortyapi.com/api/character";

async function fetchCharacters(url=API_BASE){
    const res=await fetch(url);
    return res.json();
}