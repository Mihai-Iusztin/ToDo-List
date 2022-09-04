function $(selector) {
  return document.querySelector(selector);
}

const addTaskBtn = $('button');
const saveTasksBtn = $('#save-tasks');
const taskInput = $('#add-task input');
let tasks = $('#tasks');
let taskList = [];
let cached = getForm();

document.addEventListener('DOMContentLoaded', init, false);

function init() {
  tasks.addEventListener('input', tasksHandler, false);

  if (cached) {
    cached.forEach((cache) => {
      tasks.innerHTML += `
        <div class = "task"> 
            <span id = "taskname">
            ${cache.task}
            </span>
            <button class = delete>
            <i class="far fa-trash-alt"></i>
            </button>
        </div>
            `;
    });
    const deleteBtns = document.querySelectorAll('.delete');
    for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].onclick = function () {
        this.parentNode.remove();
        cached.splice(i, 1);
      };
    }
  }
}
console.log(cached);
console.log(taskList);
const addTaskHandler = function (e) {
  e.preventDefault();
  if (taskInput.value == 0) {
    alert('Please Enter a Task!');
  } else {
    tasks.innerHTML += `
        <div class = "task"> 
            <span id = "taskname">
            ${taskInput.value}
            </span>
            <button class = delete>
            <i class="far fa-trash-alt"></i>
            </button>
        </div>
            `;
    tasksHandler();
    taskInput.value = '';

    const deleteBtns = document.querySelectorAll('.delete');
    for (let i = 0; i < deleteBtns.length; i++) {
      deleteBtns[i].onclick = function () {
        this.parentNode.remove();
        cached.splice(i, 1);
      };
    }
  }
};

function tasksHandler() {
  let form = {};
  form.task = taskInput.value;
  taskList.push(form);
  // taskList = taskList.concat(cached);
  saveForm(taskList);
}

const saveForm = (taskList) => {
  let f = JSON.stringify(taskList);
  localStorage.setItem('taskList', f);
};

function getForm() {
  let f = localStorage.getItem('taskList');
  if (f) return JSON.parse(f);
}

function saveTasks() {
  cached = taskList;
}

addTaskBtn.addEventListener('click', addTaskHandler);
saveTasksBtn.addEventListener('click', saveTasks);
