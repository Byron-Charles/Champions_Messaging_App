import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://champions-65fcf-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const messagesInDB = ref(database, "messages");

const messageInput = document.querySelector(".message-input");
const publishBtn = document.querySelector(".publish-btn");
const fromInput = document.querySelector(".from-input");
const toInput = document.querySelector(".to-input");
const messageText = document.querySelector(".message-text");

publishBtn.addEventListener("click", function () {
  const messageInputValue = messageInput.value;
  const fromInputValue = fromInput.value;
  const toInputValue = toInput.value;

  const message = {
    from: fromInputValue,
    message: messageInputValue,
    to: toInputValue,
  };

  push(messagesInDB, message);

  clearInputFields();
});

function clearInputFields() {
  messageInput.value = "";
  fromInput.value = "";
  toInput.value = "";
}

function clearMessageText() {
  messageText.innerHTML = "";
}

onValue(messagesInDB, function (snapshot) {
  //   console.log(snapshot.val());

  if (snapshot.exists()) {
    let messagesArray = Object.entries(snapshot.val());
    console.log(messagesArray[0][1].to);

    clearMessageText();

    for (let i = 0; i < messagesArray.length; i++) {
      let currentMessage = messagesArray[i];
      //   let currentMessageID = currentMessage[i][0];
      //   let currentMessageText = currentMessage[i][1].message;
      //   let currentMessageFrom = currentMessage[i][1].from;
      //   let currentMessageTo = currentMessage[i][1].to;

      console.log(currentMessage);

      prependMessage(currentMessage);
    }
  } else {
    messageText.innerHTML = "No messages yet";
  }
});

function prependMessage(message) {
  let messageID = message[0];
  let messageContent = message[1].message;
  let messageFrom = message[1].from;
  let messageTo = message[1].to;

  let newParagraph = document.createElement("p");
  newParagraph.innerHTML = `<p class="message-paragraph">
  <span class="bold">To: ${messageTo}</span>
   <br>
   ${messageContent}
<br>
   <span class="bold">From: ${messageFrom}</bold>
   </p>
  `;

  messageText.prepend(newParagraph);
}
