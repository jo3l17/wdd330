import { getfromLS, writeToLS } from "./ls.js";
import { findIndexTodoById, findTodoById, onTouch } from "./utilities.js";
// import { renderTodoList } from './utilities.js';

var todoList = null;
var ActualFilter = "all";
export default class Todos {
  constructor(key = 'todos', element) {
    this.element = element
    this.key = key
    this.todos = getTodos(key);
    this.listTodos();
  }

  todosRemaining() {
    document.getElementById("tasksLeft").textContent = this.todos.filter((obj) => obj.completed === false).length;
  }

  listTodos() {
    if (this.todos != null) {
      document.getElementById('message').textContent = "";
      this.renderTodoList(this.todos, this.element)
      this.todosRemaining()
    }
  }

  completeTodo = (object) => {
    const index = findIndexTodoById(object.id, this.todos)
    this.todos[index].completed = !object.completed;
    writeToLS('todos', JSON.stringify(this.todos));
    this.listTodos();
    this.filterTodos(ActualFilter);
  }

  removeTodo = (object) => {
    const index = findIndexTodoById(object.id, todoList);
    const index1 = findIndexTodoById(object.id, this.todos);
    todoList.splice(index, 1);
    this.todos.splice(index1, 1);
    writeToLS('todos', JSON.stringify(todoList));
    this.listTodos();
    this.filterTodos(ActualFilter);
  }

  renderTodoList(list, element) {
    this.element.textContent = "";
    list.forEach(elementLi => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      const span = document.createElement('span');
      const button = document.createElement('button');
      elementLi.completed ? li.classList.add('checked') : '';
      checkbox.checked = elementLi.completed;
      li.id = `todo-${elementLi.id}`;
      span.textContent = elementLi.content;
      button.textContent = 'x';
      checkbox.setAttribute('type', 'checkbox');
      checkbox.id = `checkbox_${elementLi.id}`;
      li.append(checkbox, span, button)
      onTouch(checkbox, this.completeTodo, { id: elementLi.id, completed: elementLi.completed });
      onTouch(button, this.removeTodo, { id: elementLi.id })
      element.append(li);
    })
  }

  addTodo() {
    const task = document.getElementById("addTaskValue");
    if (task.value == "") {
      alert("todo can be empty");
      return
    }
    saveTodo(task.value, this.key)
    this.listTodos();
    task.value = "";
    this.filterTodos(ActualFilter);
  }

  filterTodos(filter) {
    ActualFilter = filter;
    if (filter == 'active') {
      document.getElementById("filterAll").classList.remove("btnActive");
      document.getElementById("filterActive").classList.add("btnActive");
      document.getElementById("filterCompleted").classList.remove("btnActive");
      this.todos = todoList.filter(e => e.completed == false);
    } else if (filter == 'completed') {
      document.getElementById("filterAll").classList.remove("btnActive");
      document.getElementById("filterActive").classList.remove("btnActive");
      document.getElementById("filterCompleted").classList.add("btnActive");
      this.todos = todoList.filter(e => e.completed == true);
    } else {
      document.getElementById("filterAll").classList.add("btnActive");
      document.getElementById("filterActive").classList.remove("btnActive");
      document.getElementById("filterCompleted").classList.remove("btnActive");
      this.todos = todoList;
    }
    this.listTodos();
  }
}
function getTodos(key) {
  if (todoList == null) {
    todoList = JSON.parse(getfromLS(key));
  }
  return todoList;
}
function saveTodo(task, key) {
  const todo = {
    id: Math.floor(Date.now() / 100),
    content: task,
    completed: false
  }
  if (todoList != null) {
    todoList.push(todo);
  } else {
    todoList = [todo]
  }
  writeToLS(key, JSON.stringify(todoList));
}