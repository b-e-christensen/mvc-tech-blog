const addComment = async () => {
    console.log('function hit')
    const comment = document.getElementById('comment-textarea')
    const content = comment.value
    const postId = comment.getAttribute('value')
    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, postId }),
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    
}

const commentButtons = document.querySelectorAll('.comment-button')

for (let i = 0 ; i < commentButtons.length; i++) {
    commentButtons[i].addEventListener('click' , addComment) ; 
 }