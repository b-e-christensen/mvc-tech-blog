const deleteButton = document.getElementById('delete-button')

const deleteComment = async () => {
    const id = deleteButton.getAttribute('value')
    const response = await fetch('/api/comments/delete/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }  
}

deleteButton.addEventListener('click', deleteComment)