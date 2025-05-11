const noteInput = document.getElementById("noteInput");
const message = document.getElementById("message");

// On page load, check if notes exist and load them
window.onload = function () {
  loadNote();
};

// Save note to localStorage
function saveNote() {
  const note = noteInput.value.trim(); // Trim to remove extra spaces

  // Validate input
  if (note === "") {
    showMessage("Cannot save an empty note.");
    return;
  }

  // Save to localStorage
  localStorage.setItem("myNote", note);
  showMessage("Note saved successfully.", "green");
}

// Load note from localStorage
function loadNote() {
  const savedNote = localStorage.getItem("myNote");

  if (savedNote) {
    noteInput.value = savedNote;
    showMessage("Note loaded.");
  } else {
    showMessage("No saved note found.");
  }
}

// Clear note from localStorage
function clearNote() {
  localStorage.removeItem("myNote");
  noteInput.value = "";
  showMessage("Note cleared.", "orange");
}

// Show user feedback
function showMessage(msg, color = "red") {
  message.style.color = color;
  message.textContent = msg;

  setTimeout(() => {
    message.textContent = "";
  }, 3000);
}
