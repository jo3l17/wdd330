import Hikes from './hikes.js';
//create an array of hikes
const myHike = new Hikes('hikes');
//on load grab the array and insert it into the page
window.addEventListener("load", () => {
  myHike.showHikeList();
});