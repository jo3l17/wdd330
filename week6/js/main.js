import Todos from './Todos.js';
import {onTouch} from './utilities.js';
// let todos = [
//   { id: 1, content: 'Task 1', completed: false },
//   { id: 2, content: 'Task 2', completed: true },
//   { id: 3, content: 'Task 3', completed: false },
//   { id: 4, content: 'Task 4', completed: false }
// ]
// localStorage.setItem('todos',JSON.stringify(todos))
window.onload= ()=>{
  let todoListElement = document.getElementById('todo_list');
  var Todo = new Todos('todos',todoListElement);
  onTouch('#addTask',()=>Todo.addTodo());
  onTouch('#filterAll',()=>Todo.filterTodos('all'));
  onTouch('#filterActive',()=>Todo.filterTodos('active'));
  onTouch('#filterCompleted',()=>Todo.filterTodos('completed'));
}
