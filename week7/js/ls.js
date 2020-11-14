export function getfromLS(key){
  return localStorage.getItem(key)
}
export function writeToLS(key, data) {
  localStorage.setItem(key,data);
}