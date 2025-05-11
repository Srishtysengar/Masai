// Get the element with id 'item2'
const item2 = document.getElementById('item2');

// Add click event listener to "Item 2"
item2.addEventListener('click', () => {
  // Get parent element (the <ul> with id="list")
  const parent = item2.parentNode;

  // Alert the text content of the parent element
  alert(parent.textContent.trim());

  // Get previous and next sibling elements
  const prevSibling = item2.previousElementSibling;
  const nextSibling = item2.nextElementSibling;

  // Log their text content to the console
  if (prevSibling) {
    console.log("Previous Sibling:", prevSibling.textContent);
  }
  if (nextSibling) {
    console.log("Next Sibling:", nextSibling.textContent);
  }
});
