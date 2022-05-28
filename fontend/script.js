const body = document.querySelector("body");

window.addEventListener("load", () => {
  body.classList.add("visible");
});

const signInsignUpBtn = document.querySelector(".sign-in-sign-up");

signInsignUpBtn.addEventListener("click", () => {
  location.href = "./pages/signInsignUp/authenticate.html";
});
