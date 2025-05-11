const form = document.getElementById('preferencesForm');
const themeSelect = document.getElementById('theme');
const languageSelect = document.getElementById('language');
const notificationsCheckbox = document.getElementById('notifications');

// Applying the selected theme class to body
function applyTheme(theme) {
  document.body.classList.remove('dark-mode', 'light-mode');
  document.body.classList.add(`${theme}-mode`);
}

// Handling form submission and save to localStorage
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const preferences = {
    theme: themeSelect.value,
    language: languageSelect.value,
    notifications: notificationsCheckbox.checked
  };

  localStorage.setItem('preferences', JSON.stringify(preferences));

  // Applying theme immediately after saving
  applyTheme(preferences.theme);

  alert('Preferences Saved!');
});

// Loading preferences from localStorage on page load
window.onload = () => {
  const storedPrefs = localStorage.getItem('preferences');

  if (storedPrefs) {
    const preferences = JSON.parse(storedPrefs);

    // FIX 1: Assigning to element values by using correct references
    themeSelect.value = preferences.theme;
    languageSelect.value = preferences.language;
    notificationsCheckbox.checked = preferences.notifications;

    // FIX 2: Apply the theme on page load
    applyTheme(preferences.theme);
  }
};
