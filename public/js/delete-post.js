document.querySelectorAll('.deleteBtn').forEach((button) => {
  button.addEventListener('click', async () => {
    const postId = button.dataset.id;
    console.log('postId front end', postId)

    try {
      const response = await fetch(`/delete/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete the post.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    }
  });
});