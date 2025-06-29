const BASE_URL = "https://librarymanagementsystem-96555-default-rtdb.asia-southeast1.firebasedatabase.app/books";

    let currentPage = 1;
    let totalBooks = [];

    document.getElementById("bookForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        publishedYear: +document.getElementById("publishedYear").value,
        available: document.getElementById("available").value === "true"
      };
      await fetch(`${BASE_URL}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
      });
      loadBooks();
      e.target.reset();
    });

    async function loadBooks() {
      const res = await fetch(`${BASE_URL}.json`);
      const data = await res.json();
      totalBooks = Object.entries(data || {}).map(([id, book]) => ({ id, ...book }));
      applyFilters();
    }

    function applyFilters() {
      let books = [...totalBooks];
      const genre = document.getElementById("filterGenre").value.trim().toLowerCase();
      const author = document.getElementById("filterAuthor").value.trim().toLowerCase();
      const availability = document.getElementById("filterAvailability").value;
      const sortBy = document.getElementById("sortBooks").value;
      const perPage = +document.getElementById("itemsPerPage").value;

      if (genre) books = books.filter(b => b.genre.toLowerCase().includes(genre));
      if (author) books = books.filter(b => b.author.toLowerCase().includes(author));
      if (availability !== "") books = books.filter(b => String(b.available) === availability);

      books.sort((a, b) => {
        if (typeof a[sortBy] === "string") return a[sortBy].localeCompare(b[sortBy]);
        return a[sortBy] - b[sortBy];
      });

      renderPagination(books.length, perPage);
      renderBooks(books.slice((currentPage - 1) * perPage, currentPage * perPage));

      localStorage.setItem("filters", JSON.stringify({ genre, author, availability, sortBy, perPage, currentPage }));
    }

    function renderBooks(books) {
      const list = document.getElementById("bookList");
      list.innerHTML = "";
      if (books.length === 0) return list.innerHTML = "<p>No books found</p>";
      books.forEach(book => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<strong>${book.title}</strong> by ${book.author} (${book.publishedYear}) - ${book.genre} ${book.available ? "✅" : "❌"}`;
        list.appendChild(card);
      });
    }

    function renderPagination(total, perPage) {
      const pages = Math.ceil(total / perPage);
      const container = document.getElementById("pagination");
      container.innerHTML = "";
      for (let i = 1; i <= pages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.disabled = true;
        btn.onclick = () => {
          currentPage = i;
          applyFilters();
        };
        container.appendChild(btn);
      }
    }

    window.onload = () => {
      const saved = JSON.parse(localStorage.getItem("filters"));
      if (saved) {
        document.getElementById("filterGenre").value = saved.genre;
        document.getElementById("filterAuthor").value = saved.author;
        document.getElementById("filterAvailability").value = saved.availability;
        document.getElementById("sortBooks").value = saved.sortBy;
        document.getElementById("itemsPerPage").value = saved.perPage;
        currentPage = saved.currentPage;
      }
      loadBooks();
    };