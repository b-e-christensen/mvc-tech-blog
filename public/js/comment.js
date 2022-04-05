const addComment = async () => {
    console.log('function hit')

    const comment = document.getElementById('comment-textarea')
    const content = comment.value

    console.log('req.body.content ---> ' + content)

    const postId = comment.getAttribute('value')

    console.log('req.body.postId ---> ' + postId)

    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, postId }),
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    
}

document.getElementById('comment-button').addEventListener('click' , addComment)
 