document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.querySelector('.comment-form');
  
    if (commentForm) {
      commentForm.addEventListener('submit', handleCommentSubmit);
    }
  });
  
  async function handleCommentSubmit(event) {
    event.preventDefault();
  
    const form = event.target;
    const commentBody = form.querySelector('textarea[name="comment-body"]').value;
    const postId = form.querySelector('input[name="post_id"]').value; 
    console.log(postId)
  
    try {
      const response = await fetch('/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentBody, post_id: postId, }),
      });
  
      if (response.ok) {
        console.log('Comment added successfully!');
        form.reset();
        window.location.reload()
      } else {
        alert('Failed to add comment.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    }
  }
  