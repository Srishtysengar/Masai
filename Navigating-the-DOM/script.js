const heading = document.getElementById('mainHeading');
heading.textContent = 'Welcome to the DOM World!';

const paragraphs = document.getElementsByTagName('p');
for (let i = 0; i < paragraphs.length; i++) {
  paragraphs[i].style.color = 'blue';
}

const containerDiv = document.querySelector('.container');
containerDiv.style.backgroundColor = 'yellow';
