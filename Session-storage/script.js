const themeSelector = document.getElementById('themeSelector');

// Applying selected theme by adding/removing appropriate class from <body>
function applyTheme(theme) {
  document.body.classList.remove('light-theme', 'dark-theme', 'blue-theme');
  document.body.classList.add(`${theme}-theme`);
}

// Loading saved theme from sessionStorage (if any)
window.onload = () => {
  const savedTheme = sessionStorage.getItem('selectedTheme') || 'light';
  themeSelector.value = savedTheme;
  applyTheme(savedTheme);
};

// Saveing and applying the selected theme on change
themeSelector.addEventListener('change', () => {
  const selectedTheme = themeSelector.value;
  sessionStorage.setItem('selectedTheme', selectedTheme); // save theme to sessionStorage
  applyTheme(selectedTheme); // apply it immediately
});
