const appHandle = document.getElementById("app");
const searchTodoHandle = document.getElementById("searchTodo");
const addTodoHandle = document.getElementById("addTodo");
const todoListHandle = document.getElementById("todoList");
const todoCountHandle = document.getElementById("todoCount");
const listOfTodos = document.querySelector("ul");

function getTodos() {
  todoListHandle.innerHTML = "";

  const stringifiedTodos = localStorage.getItem("todos");
  const todos = JSON.parse(stringifiedTodos);
  todoCountHandle.innerHTML = todos.length;

  for (let i = 0; i <= todos.length; i++) {
    const spanHandle = document.createElement("span");
    spanHandle.className = "todoWrapper";
    const todoText = document.createElement("li");
    todoText.textContent = todos[i].todo;
    todoText.id = `${i}`;
    todos[i].isCompleted ? todoText.classList.toggle("checked") : todoText;

    const todoDelete = document.createElement("button");
    todoDelete.id = `${i}`;
    todoDelete.innerHTML = "Delete";

    spanHandle.appendChild(todoText);
    spanHandle.appendChild(todoDelete);
    todoListHandle.appendChild(spanHandle);
  }
}

function addTodo() {
  const stringifiedTodos = localStorage.getItem("todos");
  let todos = JSON.parse(stringifiedTodos);
  let count = todos.length;

  if (searchTodoHandle.value) {
    let todo = {
      id: count + 1,
      todo: searchTodoHandle.value,
      isCompleted: false,
    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
    searchTodoHandle.value = "";
    getTodos();
  }
}

listOfTodos.addEventListener(
  "click",
  (e) => {
    console.log(e);
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");

      const stringifiedTodos = localStorage.getItem("todos");
      const todos = JSON.parse(stringifiedTodos);
      const todo = todos.filter((todo, index) => index == e.target.id);

      if (todo[0].isCompleted) {
        let updateTodo = {
          id: todo[0].id,
          todo: todo[0].todo,
          isCompleted: false,
        };
        todos.splice(e.target.id, 1);
        todos.splice(e.target.id, 0, updateTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
        getTodos();
      } else {
        let updateTodo = {
          id: todo[0].id,
          todo: todo[0].todo,
          isCompleted: true,
        };
        todos.splice(e.target.id, 1);
        todos.splice(e.target.id, 0, updateTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
        getTodos();
      }
    } else if (e.target.innerHTML === "Delete") {
      const stringifiedTodos = localStorage.getItem("todos");
      const todos = JSON.parse(stringifiedTodos);
      todos.splice(e.target.id, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      getTodos();
    }
  },
  false
);

addTodoHandle.addEventListener(
  "click",
  (e) => {
    addTodo()
  },
  false
);

searchTodoHandle.addEventListener(
  "keyup",
  (e) => {
    if (e.keyCode === 13) {
      addTodo()
    }
  },
  false
);

window.addEventListener("load", (e) => {
  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    getTodos();
  }
});
