const API = "https://jsonplaceholder.typicode.com/posts";

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const bookList = document.getElementById("book-list");

const uid = localStorage.getItem("uid");

if (titleInput && authorInput) {
  document.getElementById("book-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const book = {
      title: titleInput.value,
      author: authorInput.value,
      read: false,
      uid: uid
    };
    await fetch(API, {
      method: "POST",
      body: JSON.stringify(book),
      headers: { "Content-Type": "application/json" },
    });
    loadBooks();
  });
}

async function loadBooks() {
  bookList.innerHTML = "Loading...";
  const res = await fetch(API);
  const books = await res.json();
  const userBooks = books.filter((b) => b.uid === uid);
  displayBooks(userBooks);
}

function displayBooks(books) {
  bookList.innerHTML = "";
  books.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.innerHTML = `
      <strong>${book.title}</strong> by ${book.author}
      <button onclick="markRead(${book.id})">📖 Read</button>
      <button onclick="deleteBook(${book.id})">❌ Remove</button>
    `;
    bookList.appendChild(bookDiv);
  });
}

window.markRead = async function (id) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ read: true }),
    headers: { "Content-Type": "application/json" },
  });
  loadBooks();
};

window.deleteBook = async function (id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
  loadBooks();
};

window.onload = loadBooks;
