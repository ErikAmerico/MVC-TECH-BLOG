function deletePost(event) {
  event.preventDefault();

  const confirmation = confirm("Are you sure you want to delete this post?");

  if (confirmation) {
    const form = event.target;
    const url = form.action;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(new FormData(form)),
    })
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const deleteForms = document.querySelectorAll(".delete-form");
  deleteForms.forEach((form) => {
    form.addEventListener("submit", deletePost);
  });
});
