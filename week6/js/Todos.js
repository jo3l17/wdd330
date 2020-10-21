import { getfromLS, writeToLS } from "./ls.js";
import { findIndexTodoById, onTouch, qs } from "./utilities.js";

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
    qs("#tasksLeft").textContent = this.todos.filter((obj) => obj.completed === false).length;
  }

  listTodos() {
    if (this.todos != null) {
      qs('#message').textContent = "";
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
      button.classList.add("deleteBtn");
      checkbox.setAttribute('type', 'checkbox');
      checkbox.id = `checkbox_${elementLi.id}`;
      li.append(checkbox, span, button)
      onTouch(checkbox, this.completeTodo, { id: elementLi.id, completed: elementLi.completed });
      onTouch(button, this.removeTodo, { id: elementLi.id })
      element.append(li);
    })
  }

  addTodo() {
    const task = qs("#addTaskValue");
    if (task.value == "") {
      return
    }
    saveTodo(task.value, this.key)
    this.listTodos();
    task.value = "";
    this.filterTodos(ActualFilter);
  }

  filterTodos(filter) {
    ActualFilter = filter;
    qs("#filterAll").classList.remove("btnActive");
    qs("#filterActive").classList.remove("btnActive");
    qs("#filterCompleted").classList.remove("btnActive");
    if (filter == 'active') {
      qs("#filterActive").classList.add("btnActive");
      this.todos = todoList.filter(e => e.completed == false);
    } else if (filter == 'completed') {
      qs("#filterCompleted").classList.add("btnActive");
      this.todos = todoList.filter(e => e.completed == true);
    } else {
      qs("#filterAll").classList.add("btnActive");
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