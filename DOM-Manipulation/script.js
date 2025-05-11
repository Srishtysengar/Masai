// Select the UL and Button elements
const ul = document.querySelector('#itemList');
const addButton = document.getElementById('addButton');

addButton.addEventListener('click', function () {
  const newLi = document.createElement('li');
  const itemCount = ul.children.length + 1;
  newLi.textContent = `New Item ${itemCount}`;

  if (itemCount % 2 === 1) {
    newLi.style.fontWeight = 'bold';
    newLi.style.color = 'blue';
  } else {
    newLi.style.fontStyle = 'italic';
    newLi.style.color = 'red';
  }
  ul.appendChild(newLi);
});
