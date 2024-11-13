const firebaseConfig = {
  apiKey: "AIzaSyAZSLgLF8V_lxg6GhvrATzXJp5zkaGAjOc",
  authDomain: "todo-firebase-27bd3.firebaseapp.com",
  databaseURL: "https://todo-firebase-27bd3-default-rtdb.firebaseio.com",
  projectId: "todo-firebase-27bd3",
  storageBucket: "todo-firebase-27bd3.firebasestorage.app",
  messagingSenderId: "616406327762",
  appId: "1:616406327762:web:66a6cecc2e32f8c508e80b"
};

const frb = firebase.initializeApp(firebaseConfig);
console.log(frb.database)

var ulElement = document.getElementById("list");

function renderTasks() {
  firebase.database().ref('todos').once('value', (snapshot) => {
    ulElement.innerHTML = ""; 
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const liElement = document.createElement("li");
      const liText = document.createTextNode(data.value);
      liElement.appendChild(liText);
      ulElement.appendChild(liElement);

      const delBtnElement = document.createElement("button");
      const delBtnText = document.createTextNode("Delete");
      delBtnElement.appendChild(delBtnText);
      liElement.appendChild(delBtnElement);
      delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");

      const editBtnElement = document.createElement("button");
      const editBtnText = document.createTextNode("Edit");
      editBtnElement.appendChild(editBtnText);
      editBtnElement.setAttribute("onclick", "editItem(this)");
      liElement.appendChild(editBtnElement);
    });
  });
}

window.onload = renderTasks;

firebase.database().ref('todos').on("child_added", (data) => {
  console.log(data.val());
  var liElement = document.createElement("li");
  var liText = document.createTextNode(data.val().value);
  liElement.appendChild(liText);
  ulElement.appendChild(liElement);

  var delBtnElement = document.createElement("button");
  var delBtnText = document.createTextNode("Delete");
  delBtnElement.appendChild(delBtnText);
  liElement.appendChild(delBtnElement);
  delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");

  var editBtnElement = document.createElement("button");
  var editBtnText = document.createTextNode("Edit");
  editBtnElement.appendChild(editBtnText);
  editBtnElement.setAttribute("onclick", "editItem(this)");
  liElement.appendChild(editBtnElement);
});

function addTodo() {
  var input = document.getElementById("todoInput");
  if (input.value) {
    var key = firebase.database().ref('todos').push().key;

    let obj = {
      value: input.value,
      key: key,
    };

    firebase.database().ref('todos').child(key).set(obj);

    var liElement = document.createElement("li");
    var liText = document.createTextNode(input.value);
    liElement.appendChild(liText);
    ulElement.appendChild(liElement);

    var delBtnElement = document.createElement("button");
    var delBtnText = document.createTextNode("Delete");
    delBtnElement.appendChild(delBtnText);
    liElement.appendChild(delBtnElement);
    delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");

    var editBtnElement = document.createElement("button");
    var editBtnText = document.createTextNode("Edit");
    editBtnElement.appendChild(editBtnText);
    editBtnElement.setAttribute("onclick", "editItem(this)");
    liElement.appendChild(editBtnElement);

    input.value = ""; // Clear input after adding
  } else {
    alert("Enter your task..");
  }
}

function deleteAllItems() {
  ulElement.innerHTML = "";
}

function deleteSingleItem(e) {
  e.parentNode.remove();
}

function editItem(e) {
  var updatedVal = prompt("Enter updated value..");
  e.parentNode.firstChild.nodeValue = updatedVal;
}