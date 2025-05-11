// Get references to DOM elements
const colorInput = document.getElementById('colorInput');
const textInput = document.getElementById('textInput');
const changeBgBtn = document.getElementById('changeBgBtn');
const updateTextBtn = document.getElementById('updateTextBtn');
const myDiv = document.getElementById('myDiv');

/**
 * Function to check if a color is valid.
 * We use a dummy element and see if the browser accepts the color.
 */
function isValidColor(color) {
  const temp = document.createElement('div');
  temp.style.color = color;
  return temp.style.color !== '';
}

// Event listener for changing background color
changeBgBtn.addEventListener('click', function () {
  const color = colorInput.value.trim();

  if (isValidColor(color)) {
    myDiv.style.backgroundColor = color;
  } else {
    alert('Invalid color name!');
  }
});

// Event listener for updating text content
updateTextBtn.addEventListener('click', function () {
  const newText = textInput.value.trim();

  if (newText) {
    myDiv.textContent = newText;
  } else {
    alert('Please enter some text!');
  }
});
