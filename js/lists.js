'use strict';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DATA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// DOM ACCESS VARIABLES - unique to lists.html
var h1Element = document.getElementById('list-name');
var textInputElement = document.getElementById('text-input');
var addTaskButtonElement = document.getElementById('add-task');
var incompleteUlElement = document.getElementById('incomplete-list');
var completeUlElement = document.getElementById('complete-list');

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// RENDER ON PAGE LOAD
function renderOnPageLoad() {
  getListsFromLocalStorage();     // declared in app.js
  renderListName();               // declared below
  List.allLists[0].renderTasks(); // invokes list method that clears page and renders all tasks as li's
}

// RENDER LIST TITLE
function renderListName() {
  h1Element.textContent = List.allLists[0].listTitle;
}

// EVENT HANDLER FOR 'ADD TASK' BUTTON CLICK
function handleAddTask(event) {
  event.preventDefault();
  var userText = textInputElement.value; // get the user input
  List.allLists[0].addTask(userText);    // create a task with the user input
  List.allLists[0].renderTasks();        // invokes list method that clears page and renders all tasks as li's
}

// HANDLES CHECKING A TASK'S CHECKBOX
function handleCheckboxChange(event) {
  var taskName = event.target.parentNode.innerText;               // gets the text inside the label element (the input element's parent)
  var checked = event.target.checked;                             // gets checked status of the checkbox
  if (checked) {
    for (var i = 0; i < List.allLists[0].taskList.length; i++) {  // Loops through all the tasks
      if (List.allLists[0].taskList[i].userText === taskName) {   // Finds the targeted task
        List.allLists[0].taskList[i].checked = true;              // Changes the task object's property to 'checked'
        console.log(List.allLists[0].taskList[i].userText, 'changed checked to', List.allLists[0].taskList[i].checked);
        break;
      }
    }
  } else {
    for (var i = 0; i < List.allLists[0].taskList.length; i++) {  // Loops through all the tasks
      if (List.allLists[0].taskList[i].userText === taskName) {   // Finds the targeted task
        List.allLists[0].taskList[i].checked = false;             // Changes the task object's property to 'un-checked'
        console.log(List.allLists[0].taskList[i].userText, 'changed checked to', List.allLists[0].taskList[i].checked);
        break;
      }
    }
  }
  renderOnPageLoad();
}

// 'ADD TASK' BUTTON CLICK EVENT LISTENER
addTaskButtonElement.addEventListener('click', handleAddTask);

// 'CHECK TASK' EVENT LISTENERS
incompleteUlElement.addEventListener('change', handleCheckboxChange); // listens for checkbox change in 'incomplete' ul
completeUlElement.addEventListener('change', handleCheckboxChange); // listens for checkbox change in 'complete' ul

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// FUNCTION INVOCATIONS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

renderOnPageLoad();
