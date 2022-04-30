const socket = io();
let username = "";
let userList = [];
const loginPage = document.querySelector("#loginPage");
const chatPage = document.querySelector("#chatPage");
const loginInput = document.querySelector(".loginNameInput");
const textInput = document.querySelector(".chatTextInput");

loginPage.style.display = "flex";
chatPage.style.display = "none";

function renderUserList() {
  let ul = document.querySelector(".userList");
  ul.innerHTML = "";

  userList.forEach((item) => {
    ul.innerHTML += `<li>${item}<li>`;
  });
}

loginInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let name = loginInput.value.trim();
    if (name) {
      username = name;
      document.title = `Chat ('${username}')`;

      socket.emit("join-request", username);
    }
  }
});

socket.on("user-ok", (list) => {
  loginPage.style.display = "none";
  chatPage.style.display = "flex";
  textInput.focus();

  userList = list;
  renderUserList();
});
