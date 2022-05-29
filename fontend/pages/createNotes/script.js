const body = document.querySelector("body");
const apiUrl = "https://note-manager-dhananjay.herokuapp.com";
const token = localStorage.getItem("jwt");
window.addEventListener("load", () => {
  body.classList.add("visible");
});

const createNoteBtn = document.querySelector(".create-note-button");

createNoteBtn.addEventListener("click", () => {
  const heading = document.querySelector(".create-note-heading").value;
  const content = document.querySelector(".create-note-input").value;
  if (token) {
    fetch(`${apiUrl}/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ heading, content }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        location.href = "../dashboard/index.html";
      })
      .catch((err) => {
        alert("Error");
        console.log(err);
      });
  } else {
    location.href = "../../../index.html";
  }
});
