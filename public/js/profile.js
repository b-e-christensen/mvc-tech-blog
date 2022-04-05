const newPost = async () => {

    const title = document.getElementById('post-title').value
    const content = document.getElementById('post-content').value

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json'}
    })
    if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }  
}
    

    document
        .querySelector('#new-post')
        .addEventListener('click', newPost)