const items = [];
for (let i = 1; i <= 250; i++) {
  items.push(`Item ${i}`);
}

const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const loader = document.getElementById("loader");
const noResult = document.getElementById("noResult");
const backToTop = document.getElementById("backToTop");
const keystrokeCount = document.getElementById("keystrokes");
const debouncedSearchCount = document.getElementById("debouncedCount");

let keystrokes = 0;
let debouncedCount = 0;


function debounce(fn, delay) {
  let timer;
  return function (...args) {
    loader.innerText = "Searching...";
    clearTimeout(timer);
    timer = setTimeout(() => {
      loader.innerText = "";
      fn.apply(this, args);
    }, delay);
  };
}

function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
}


const searchItems = debounce((query) => {
  debouncedCount++;
  debouncedSearchCount.innerText = debouncedCount;

  results.innerHTML = "";
  noResult.innerText = "";

  if (query.trim() === "") return;

  const matched = items.filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  if (matched.length === 0) {
    noResult.innerText = "No results found.";
  } else {
    matched.forEach(name => {
      const div = document.createElement("div");
      div.className = "name";
      div.innerHTML = highlightMatch(name, query);
      results.appendChild(div);
    });
  }
}, 1000);

input.addEventListener("input", (e) => {
  keystrokes++;
  keystrokeCount.innerText = keystrokes;
  searchItems(e.target.value);
});

window.addEventListener("scroll", throttle(() => {
  if (window.scrollY >= 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
}, 500));


backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
