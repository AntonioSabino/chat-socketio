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
    ul.innerHTML += `<li>${item}</li>`;
  });
}

function addMessage(type, user, message) {
  let ul = document.querySelector(".chatList");

  switch (type) {
    case "status":
      ul.innerHTML += `<li class="m-status">${message}</li>`;
      break;
    case "message":
      ul.innerHTML += `<li class="m-txt"><span>${user}</span> ${message}</li>`;
      break;
    default:
      break;
  }
}

loginInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let name = loginInput.value.trim();
    loginInput.value = "";

    if (name) {
      username = name;
      document.title = `Chat ('${username}')`;

      socket.emit("join-request", username);
    }
  }
});

textInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let txt = textInput.value.trim();
    textInput.value = "";

    if (txt) {
      socket.emit("send-message", txt);
    }
  }
});

socket.on("user-ok", (list) => {
  loginPage.style.display = "none";
  chatPage.style.display = "flex";
  textInput.focus();

  addMessage("status", null, "Conectado!");

  userList = list;
  renderUserList();
});

socket.on("list-update", (data) => {
  if (data.joined) {
    addMessage("status", null, `${data.joined} entrou no chat.`);
  }

  if (data.left) {
    addMessage("status", null, `${data.joined} saiu do chat.`);
  }
  userList = data.list;
  renderUserList();
});

socket.on("show-message", (data) => {
  addMessage("message", data.username, data.message);
});
