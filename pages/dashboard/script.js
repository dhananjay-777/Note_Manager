const body = document.querySelector("body");

window.addEventListener("load", () => {
  body.classList.add("visible");
});

const cardContainer = document.querySelector(".card-container");

const cardData = [
  {
    heading: "heading",
    content: "asdfadsfasdfadsf",
    id: 1,
  },
  {
    heading: "heading",
    content: "asdfadsfasdfadsf",
    id: 1,
  },
  {
    heading: "heading",
    content: "asdfadsfasdfadsf",
    id: 1,
  },
  {
    heading: "heading",
    content: "asdfadsfasdfadsf",
    id: 1,
  },
  {
    heading: "heading",
    content: "asdfadsfasdfadsf",
    id: 1,
  },
  {
    heading: "heading",
    content: "asdfadsfasdfadsf",
    id: 1,
  },
];

const createNotes = (cards) => {
  cards.forEach((card) => {
    let { heading, content, id } = card;

    let Card = document.createElement("div");
    Card.classList.add("card");
    Card.id = id;
    Card.innerHTML = `<div class="card-header" >
          <div class="card-heading">${heading}</div>
          <div class="edit-note">
            <img class="image" src="./../../assets/editNote.svg" />
          </div>
        </div>
        <div class="card-content">
          ${content}
        </div>`;

    cardContainer.appendChild(Card);
  });
};

createNotes(cardData);
