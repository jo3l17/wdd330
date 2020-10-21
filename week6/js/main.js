import Todos from './Todos.js';
import {onTouch} from './utilities.js';
window.onload= ()=>{
  let todoListElement = document.getElementById('todo_list');
  var Todo = new Todos('todos',todoListElement);
  onTouch('#addTask',()=>Todo.addTodo());
  onTouch('#filterAll',()=>Todo.filterTodos('all'));
  onTouch('#filterActive',()=>Todo.filterTodos('active'));
  onTouch('#filterCompleted',()=>Todo.filterTodos('completed'));
}
