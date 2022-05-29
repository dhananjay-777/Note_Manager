const body = document.querySelector("body");
const apiUrl = "https://note-manager-dhananjay.herokuapp.com";
const token = localStorage.getItem("jwt");

const cardContainer = document.querySelector(".card-container");

const logout = document.querySelector(".logout");
const createNoteBtn = document.querySelector(".new-note");

createNoteBtn.addEventListener("click", () => {
  location.href = "../createNotes/index.html";
});

logout.addEventListener("click", () => {
  localStorage.setItem("jwt", "");
  location.href = "../../index.html";
});

const createNotes = (cards) => {
  cards.forEach((card) => {
    let { heading, content, noteid } = card;

    let Card = document.createElement("div");
    Card.classList.add("card");
    Card.id = noteid;
    Card.innerHTML = `<div class="card-header">
          <div class="card-heading">${heading}</div>
         <div class="options">
            <a href="../updateNotes/index.html?noteID=${noteid}"
            <div class="edit-note">
              <img class="image" src="./../../assets/editNote.svg" /></div
          ></a>
          
            <div class="delete-note" >
              <img class="image delet" id="${noteid}" src="./../../assets/delete.svg" /></div>
         </div>
        </div>
        <div class="card-content">
         ${content}
        </div>
      </div>`;

    cardContainer.appendChild(Card);
  });
};

window.addEventListener("load", () => {
  body.classList.add("visible");
  if (token) {
    fetch(`${apiUrl}/notes/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const cardData = data.data;
        // console.log(cardData);
        createNotes(cardData);
      })
      .catch((err) => {
        alert("Error while fetching card");
        console.log(err);
      });
  } else {
    location.href = "../../index.html";
  }
});

body.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target.classList.contains("delet")) {
    const id = event.target.id;
    if (token) {
      fetch(`${apiUrl}/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          document.location.reload(true);
          // const cardData = data.data;
          // // console.log(cardData);
          // createNotes(cardData);
        })
        .catch((err) => {
          alert("Error while fetching card");
          console.log(err);
        });
    } else {
      location.href = "../../index.html";
    }
  }
});
