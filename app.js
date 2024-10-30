var ulElement = document.getElementById("list");

function addTodo() {
  var input = document.getElementById("todoInput");

  if (input.value) {
    var liElement = document.createElement("li");

    var liText = document.createTextNode(input.value);

    liElement.appendChild(liText);

    ulElement.appendChild(liElement);


    var delBtnElement = document.createElement("button");

    var delBtnText = document.createTextNode("Delete");

    delBtnElement.appendChild(delBtnText);

    liElement.appendChild(delBtnElement);

    delBtnElement.setAttribute("onclick", "deleteSingleItem(this)");


    var editBtnELement = document.createElement("button");

    var editBtnText = document.createTextNode("Edit");

    editBtnELement.appendChild(editBtnText);

    editBtnELement.setAttribute("onclick", "editItem(this)");

    liElement.appendChild(editBtnELement);

    console.log(liElement);

    input.value = "";
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
