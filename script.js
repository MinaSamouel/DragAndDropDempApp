// window.navigator.geolocation.getCurrentPosition(function (position) {
//   let longitude = position.coords.longitude;
//   let latitude = position.coords.latitude;

//   alert("Longitude: " + longitude + "\n Latitude: " + latitude);
// });

let inputTask = document.getElementById("input-task-box");


let taskElementToDo = "Tasks";
let retrievedTasks = localStorage.getItem(taskElementToDo);
let taskList;

if(!retrievedTasks)  {
  taskList = [];
  localStorage.setItem(taskElementToDo, JSON.stringify(taskList));
}
else {
  taskList = JSON.parse(retrievedTasks);
}

let taskElementInProgress = "TasksInProgress";
retrievedTasks = localStorage.getItem(taskElementInProgress);
let taskInProgress; 
if(!retrievedTasks)  {
  taskInProgress = [];
  localStorage.setItem(taskElementInProgress, JSON.stringify(taskInProgress));
}
else {
  taskInProgress = JSON.parse(retrievedTasks);
}

let taskElementDone = "TasksDone";
retrievedTasks = localStorage.getItem(taskElementDone);
let taskDone ;
if(!retrievedTasks)  {
  taskDone = [];
  localStorage.setItem(taskElementInProgress, JSON.stringify(taskDone));
}
else {
  taskDone = JSON.parse(retrievedTasks)
}

// if (taskList.length === 0)  localStorage.setItem(taskElementToDo, JSON.stringify(taskList));
// if (taskInProgress.length === 0)  localStorage.setItem(taskElementInProgress, JSON.stringify(taskInProgress));
// if (taskDone.length === 0) localStorage.setItem(taskElementDone, JSON.stringify(taskDone));

// localStorage.setItem(taskElementToDo, JSON.stringify(taskList));
// localStorage.setItem(taskElementInProgress, JSON.stringify(taskInProgress));
// localStorage.setItem(taskElementDone, JSON.stringify(taskDone));

showTaskToDo();
showTaskInProgress();
showTaskDone();

function addTaskToDo() {
  let task = {
    name: inputTask.value.trim().toLowerCase(),
  };

  if (task.name === " " || task.name === "") return;
  let taskCheck = taskList.findIndex((item) => item.name === task.name);
  if (taskCheck !== -1) {
    inputTask.value = " ";
    return;
  }

  let taskInProgress = localStorage.getItem(taskElementInProgress);
  let taskInProgressList = JSON.parse(taskInProgress);

  let taskIndex = taskInProgressList.findIndex(
    (item) => item.name === task.name
  );
  if (taskIndex !== -1) {
    inputTask.value = " ";
    return;
  }

  let taskDone = localStorage.getItem(taskElementDone);
  let taskDoneList = JSON.parse(taskDone);
  let taskIndex1 = taskDoneList.findIndex((item) => item.name === task.name);
  if (taskIndex1 !== -1) {
    inputTask.value = " ";
    return;
  }

  taskList.push(task);
  inputTask.value = "";

  let tasksString = JSON.stringify(taskList);
  localStorage.setItem(taskElementToDo, tasksString);
  showTaskToDo();
}

function showTaskToDo() {
  let retrievedTasks = localStorage.getItem(taskElementToDo);
  if (retrievedTasks) {
    taskList = JSON.parse(retrievedTasks);
    let taskItems = ``;
    for (let task of taskList) {
      taskItems += `<div
                      id="${task.name}" 
                      draggable="true" 
                      ondragstart="drag(event)"
                    >
                        ${task.name}

                    </div>`;
    }

    document.getElementById("task-todo").innerHTML = taskItems;
  }
}

function showTaskInProgress() {
  let retrievedTasks = localStorage.getItem(taskElementInProgress);
  if (retrievedTasks) {
    taskInProgress = JSON.parse(retrievedTasks);
    let taskItems = ``;
    for (let task of taskInProgress) {
      taskItems += `<div
                      id="${task.name}" 
                      draggable="true" 
                      ondragstart="drag(event)"
                    >
                        ${task.name}

                    </div>`;
    }

    document.getElementById("task-procesd").innerHTML = taskItems;
  }
}

function showTaskDone() {
  let retrievedTasks = localStorage.getItem(taskElementDone);
  if (retrievedTasks) {
    taskDone = JSON.parse(retrievedTasks);
    let taskItems = ``;
    for (let task of taskDone) {
      taskItems += `<div
                      id="${task.name}" 
                      draggable="true" 
                      ondragstart="drag(event)"
                    >
                        ${task.name}

                    </div>`;
    }

    document.getElementById("task-done").innerHTML = taskItems;
  }
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
  console.log(event);
  // console.log(event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  let id = event.dataTransfer.getData("text");
  // console.log("element id is " + id);
  let draggedElement = document.getElementById(id); // img
  event.target.appendChild(draggedElement);
  // console.log(event.target.id);
  if (event.target.id === "task-procesd") {
    addTaskInProgress(id);
  } else if (event.target.id === "task-done") {
    addTaskTaskDone(id);
  }
}

function addTaskInProgress(ElementToAdd) {
  let task = {
    name: ElementToAdd,
  };

  taskInProgress.push(task);
  let tasksString = JSON.stringify(taskInProgress);
  localStorage.setItem(taskElementInProgress, tasksString);
  showTaskInProgress();

  let taskTodo = localStorage.getItem(taskElementToDo);
  let taskTodoList = JSON.parse(taskTodo);

  let taskIndex = taskTodoList.findIndex((item) => item.name === task.name);
  if (taskIndex !== -1) taskTodoList.splice(taskIndex, 1);

  let taskTodoString = JSON.stringify(taskTodoList);
  localStorage.setItem(taskElementToDo, taskTodoString);
  showTaskToDo();
}

function addTaskTaskDone(ElementToAdd) {
  let task = {
    name: ElementToAdd,
  };

  taskDone.push(task);

  let tasksString = JSON.stringify(taskDone);
  localStorage.setItem(taskElementDone, tasksString);
  showTaskDone();

  let taskInProgress = localStorage.getItem(taskElementInProgress);
  let taskInProgressList = JSON.parse(taskInProgress);

  let taskIndex = taskInProgressList.findIndex(
    (item) => item.name === task.name
  );
  if (taskIndex !== -1) taskInProgressList.splice(taskIndex, 1);

  let taskInProgressString = JSON.stringify(taskInProgressList);
  localStorage.setItem(taskElementInProgress, taskInProgressString);
  showTaskInProgress();

  let taskTodo = localStorage.getItem(taskElementToDo);
  let taskTodoList = JSON.parse(taskTodo);

  let taskIndex1 = taskTodoList.findIndex((item) => item.name === task.name);
  if (taskIndex1 !== -1) taskTodoList.splice(taskIndex1, 1);

  let taskTodoString = JSON.stringify(taskTodoList);
  localStorage.setItem(taskElementToDo, taskTodoString);
  showTaskToDo();
}

function resetToDoList() {
  let taskTodo = localStorage.getItem(taskElementToDo);
  let taskTodoList = JSON.parse(taskTodo);
  taskTodoList = [];

  let taskTodoString = JSON.stringify(taskTodoList);
  localStorage.setItem(taskElementToDo, taskTodoString);

  showTaskToDo();
}

let deleteTaskName = document.getElementById("input-task-box-delete");

function deleteTask() {
  if (deleteTaskName.value === "") return;
  let taskTodo = localStorage.getItem(taskElementToDo);
  let taskTodoList = JSON.parse(taskTodo);

  let taskIndex1 = taskTodoList.findIndex(
    (item) => item.name === deleteTaskName.value.trim().toLowerCase()
  );
  while (taskIndex1 !== -1){
    taskTodoList.splice(taskIndex1, 1);
    taskIndex1 = taskTodoList.findIndex(
      (item) => item.name === deleteTaskName.value.trim().toLowerCase()
    );
  } 

  let taskTodoString = JSON.stringify(taskTodoList);
  localStorage.setItem(taskElementToDo, taskTodoString);
  showTaskToDo();

  let taskInProgress = localStorage.getItem(taskElementInProgress);
  let taskInProgressList = JSON.parse(taskInProgress);

  let taskIndex = taskInProgressList.findIndex(
    (item) => item.name === deleteTaskName.value.trim().toLowerCase()
  );

  while (taskIndex !== -1) {
    taskInProgressList.splice(taskIndex, 1);
    taskIndex = taskInProgressList.findIndex(
      (item) => item.name === deleteTaskName.value.trim().toLowerCase()
    );
  } 

  let taskInProgressString = JSON.stringify(taskInProgressList);
  localStorage.setItem(taskElementInProgress, taskInProgressString);
  showTaskInProgress();

  let taskDone = localStorage.getItem(taskElementDone);
  let taskDoneList = JSON.parse(taskDone);

  let taskIndex2 = taskDoneList.findIndex(
    (item) => item.name === deleteTaskName.value.trim().toLowerCase()
  );

  while (taskIndex2 !== -1) {
    taskDoneList.splice(taskIndex2, 1);
    taskIndex2 = taskDoneList.findIndex(
      (item) => item.name === deleteTaskName.value.trim().toLowerCase()
    );
  } 

  let taskDoneString = JSON.stringify(taskDoneList);
  localStorage.setItem(taskElementDone, taskDoneString);
  showTaskDone();

  deleteTaskName.value = "";
}
