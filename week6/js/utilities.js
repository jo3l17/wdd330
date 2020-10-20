export function onTouch(elementSelector, callback, arguments1 = {}) {
  if(typeof(elementSelector)=="string"){
    const element = qs(elementSelector);
    element.addEventListener('click', ()=>callback(arguments1))
    element.addEventListener('touchend',()=> callback(arguments1))
  }else{
    elementSelector.addEventListener('click', ()=>callback(arguments1))
    elementSelector.addEventListener('touchend',()=> callback(arguments1))
  }
  
}
export function qs(selector) {
  return document.querySelector(selector);
}
export function findIndexTodoById(id,list){
  return list.map(e => e.id ).indexOf(id);
}
export function findTodoById(id,list){
  return list.find(e => e.id == id);
}