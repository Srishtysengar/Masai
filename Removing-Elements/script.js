// Get references to the buttons and container
const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const paragraphContainer = document.getElementById("paragraphContainer");

// adding Event listener to a new paragraph
addBtn.addEventListener("click", () => {
  // Create a new paragraph element
  const newPara = document.createElement("p");

  // Seting its text content
  newPara.textContent = "This is a new paragraph.";
  paragraphContainer.appendChild(newPara);
});

// Event listener to remove the last paragraph
removeBtn.addEventListener("click", () => {
  // Geting the last paragraph inside the container
  const lastPara = paragraphContainer.lastElementChild;

  if (lastPara) {
    paragraphContainer.removeChild(lastPara);
  }
});
