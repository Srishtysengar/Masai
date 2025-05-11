document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('postForm');
    const titleInput = document.getElementById('title');
    const bodyInput = document.getElementById('body');
    const responseContainer = document.getElementById('responseContainer');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();
  
      if (title === '' || body === '') {
        alert('Both Title and Body fields are required.');
        return;
      }
  
      const postData = {
        title: title,
        body: body,
        userId: 1 
      };
  
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(data => {
        form.reset();
  
        responseContainer.innerHTML = `
          <div class="response">
            <h4>Post Created Successfully!</h4>
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Title:</strong> ${data.title}</p>
            <p><strong>Body:</strong> ${data.body}</p>
          </div>
        `;
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
    });
  });
  