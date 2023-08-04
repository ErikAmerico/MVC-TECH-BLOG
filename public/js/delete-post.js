function deletePost(event) {
  event.preventDefault();

  const form = event.target;
  const url = form.action;

  fetch(`/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      location.reload();
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const deleteForms = document.querySelectorAll(".delete-form");
  deleteForms.forEach((form) => {
    form.addEventListener("submit", deletePost);
  });
});


