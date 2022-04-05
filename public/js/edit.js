// grab post-title and post-content elements. 
// use them as the data to send to the database 

const editPost = async () => {

const title = document.getElementById('post-title').value
const content = document.getElementById('post-content').value

const url = document.URL;
const post_id = url.substring(url.lastIndexOf('/') + 1);

const response = await fetch('/api/posts/' + post_id, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }  
}


// document.getElementById('edit-anchor').addEventListener('click', renderEditor)
document
    .querySelector('#edit-post')
    .addEventListener('click', editPost)