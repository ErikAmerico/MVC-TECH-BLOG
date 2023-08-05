

  async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const postId = form.action.split('/').pop();
    console.log(postId)
    window.location.href = '/dashboard';

    try {
      const response = await fetch(`/update/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title.value,
          content: form.content.value,
        }),
      });

      if (response.ok) {
        return Promise.resolve();
      } else {
        alert('Failed to update the post.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    }
  }

  const editPostForm = document.getElementById('editPostForm');
  editPostForm.addEventListener('submit', (event) => {
    handleFormSubmit(event).then(() => {
      window.location.href = '/dashboard';
    });
  });

