// Corrected JavaScript code with bug fixes

// Fixed incorrect id selector (#massage → #message)
const para = document.querySelector('#message');

//Fixed incorrect method (getElementByName → getElementById)
const textButton = document.getElementById('textButton');

//Fixed incorrect method name (addClickEventListener → addEventListener)
textButton.addEventListener('click', () => {
  //Fixed incorrect property name (contentText → textContent)
  para.textContent = 'New Message';
});

// Getting reference to the div
const box = document.getElementById('box');

// Getting reference to the background color change button
const colorButton = document.getElementById('colorButton');

//Fixed typo in 'style' (styl → style)
colorButton.addEventListener('click', () => {
  box.style.backgroundColor = 'blue';
});
