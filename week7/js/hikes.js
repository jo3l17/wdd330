import { qs } from "../../week6/js/utilities.js";
import { getfromLS, writeToLS } from "./ls.js";

const hikeList = [
  {
    name: "Bechler Falls",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    difficulty: "Easy",
    description:
      "Beautiful short hike along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
  },
  {
    name: "Teton Canyon",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    difficulty: "Easy",
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
  },
  {
    name: "Denanda Falls",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "7 miles",
    difficulty: "Moderate",
    description:
      "Beautiful hike through Bechler meadows river to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
  }
];
const imgBasePath = "//byui-cit.github.io/cit261/examples/";
class Hike {
  constructor(name, imgSrc, imgAlt, distance, difficulty, description, directions) {
    this.name = name;
    this.imgSrc = imgBasePath + imgSrc;
    this.imgAlt = imgAlt;
    this.distance = distance;
    this.difficulty = difficulty;
    this.description = description;
    this.directions = directions;
    this.comments = this.filterCommentsByName(this.name);
  }
  getAllComments() {
    return JSON.parse(getfromLS('comments')) || [];
  }
  renderCommentList(comments) {
    console.log(comments)
    const ul = document.createElement('ul');
    for (let i = 0; i < comments.length; i++) {
      const element = comments[i];
      const li = document.createElement('li');
      li.textContent = element.content;
      ul.append(li);
    }
    return ul;
  }
  filterCommentsByName(name) {
    const comments = this.getAllComments();
    // let list = hikeList.map(hike=>hike.name)
    let list2 = comments.filter(comment => comment.name == name);
    return list2;
  }
  showCommentsList(name){
    return this.renderCommentList(this.filterCommentsByName(name))
  }
  addComment(comment) {
    console.log(comment)
    const newComment = {
      name: this.name,
      date: new Date(),
      content: comment
    };
    let commentList = JSON.parse(getfromLS('comments')) || [];
    this.comments.push(newComment);
    commentList.push(newComment);
    writeToLS('comments', JSON.stringify(commentList));
    this.renderHike();
  }
  renderHike() {
    const item = document.createElement("li");
    const commentListOutside = this.showCommentsList(this.name)
    item.innerHTML = `<section><h2>${this.name}</h2>
    <div class="flex">
          <div class="image"><img src="${this.imgSrc}" alt="${this.imgAlt}"></div>
          <div>
                  <div>
                      <h3>Distance</h3>
                      <p>${this.distance}</p>
                  </div>
                  <div>
                      <h3>Difficulty</h3>
                      <p>${this.difficulty}</p>
                  </div>
          </div>
    </div>
    ${commentListOutside.outerHTML}
    </section>`;
    item.addEventListener('click', () => {
      const div = document.createElement('div');
      const section = document.createElement('section');
      const h2 = document.createElement('h2');
      const closeButton = document.createElement('button');
      const divFlex = document.createElement('div')
      const divImg = document.createElement('div')
      const img = document.createElement('img');
      const divDistDif = document.createElement('div');
      const divdistance = document.createElement('div');
      const h3distance = document.createElement('h3');
      const pdistance = document.createElement('p');
      const divdifficulty = document.createElement('div');
      const h3difficulty = document.createElement('h3');
      const pdifficulty = document.createElement('p');
      const divDescription = document.createElement('div');
      const h3Description = document.createElement('h3');
      const pDescription = document.createElement('p');
      const divDirection = document.createElement('div');
      const h3Direction = document.createElement('h3');
      const pDirection = document.createElement('p');
      const divComment = document.createElement('div');
      const textarea = document.createElement('textarea');
      const submitButton = document.createElement('button');
      section.classList.add('modal');
      h2.innerHTML = this.name;
      closeButton.innerHTML = 'close'
      // closeButton.addEventListener('click', () => qs('.modal').remove());
      closeButton.addEventListener('click', () => location.reload());
      closeButton.classList.add('closeBtn')
      divFlex.classList.add('flex');
      divImg.classList.add('image');
      img.setAttribute('src', this.imgSrc);
      img.setAttribute('alt', this.imgAlt);
      divImg.append(img);
      h3distance.innerHTML = 'Distance';
      pdistance.innerHTML = this.distance;
      divdistance.append(h3distance, pdistance);
      h3difficulty.innerHTML = 'Difficulty';
      pdifficulty.innerHTML = this.difficulty;
      divdifficulty.append(h3difficulty, pdifficulty);
      divDistDif.append(divdistance, divdifficulty);
      divFlex.append(divImg, divDistDif);
      h3Description.innerHTML = 'Description';
      pDescription.innerHTML = this.description;
      divDescription.append(h3Description, pDescription);
      h3Direction.innerHTML = 'Directions';
      pDirection.innerHTML = this.directions;
      divDirection.append(h3Direction, pDirection);
      divComment.classList.add('comment-box');
      submitButton.innerHTML = 'Submit';
      const commentslist = this.showCommentsList(this.name);
      submitButton.addEventListener('click', () => {
        this.addComment(textarea.value);
        const comment = document.createElement('li')
        comment.innerHTML = textarea.value;
        // commentListOutside.append(comment);
        commentslist.append(comment)
      });
      divComment.append(textarea, submitButton);
      section.append(h2, closeButton, divFlex, divDescription, divDirection, divComment,commentslist);
      div.append(section);
      qs('body').append(div)
    })
    return item;
  }
};
export default class Hikes {
  constructor(parent) {
    this.parent = document.getElementById(parent);
    this.createAllHikes();
  }
  createAllHikes() {
    this.hikeList = hikeList.map((hike) => new Hike(hike.name, hike.imgSrc, hike.imgAlt, hike.distance, hike.difficulty, hike.description, hike.directions));
  }
  showHikeList() {
    this.parent.innerHTML = "";
    this.renderHikeList(this.hikeList, this.parent);
  }
  renderHikeList(hikes, parent) {
    hikes.forEach(hike => {
      parent.appendChild(hike.renderHike());
    });
  }
};