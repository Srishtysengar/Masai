const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");

let limit = 100;
let page = 1;
let loading = false;

async function loadPhotos() {
  try {
    loading = true;
    loader.style.display = "block";

    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
    if (!res.ok) throw new Error("Failed to load images");

    const data = await res.json();
    renderImages(data);

    page++; 
  } catch (error) {
    gallery.innerHTML += `<p style="color:red;">${error.message}</p>`;
    console.error(error);
  } finally {
    loader.style.display = "none";
    loading = false;
  }
}

function renderImages(images) {
  images.forEach(photo => {
    const card = document.createElement("div");
    card.className = "image-card";
    card.innerHTML = `
      <img src="${photo.thumbnailUrl}" alt="${photo.title}" />
      <div class="title">${photo.title}</div>
    `;
    gallery.appendChild(card);
  });
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading) {
    loadPhotos();
  }
});

loadPhotos();
