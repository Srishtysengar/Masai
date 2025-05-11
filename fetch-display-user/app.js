// Geting the reference of the <ul> element where user names will be appended
const userList = document.getElementById('userList');

// Fetching the user data from the API
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json()) // Convert response to JSON
  .then(users => {
    // Looping through each user object
    users.forEach(user => {
      // Creating a new list item element
      const li = document.createElement('li');

      // Seting the text to user's name
      li.textContent = user.name;

      // Adding a click event listener to show user's email
      li.addEventListener('click', () => {
        alert(`Email: ${user.email}`);
      });

      // Appending the list item to the user list
      userList.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error fetching users:', error);
  });
