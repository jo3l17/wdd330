let previous = '';
let next = '';
const main = document.getElementById('main');
const mainContainer = document.getElementById('main_container');
const detailbox = document.getElementById('details');
const returnButton = document.getElementById('back');
const pagination = document.getElementById('pagination');
function getData(url = 'https://swapi.dev/api/people/') {
    fetch(url).then(res => res.json())
        .then(data => {
            const count = data.count;
            const resultLength = 10;
            const countDivided = count/resultLength;
            const finalCounter = Math.ceil(countDivided)*resultLength;
            pagination.textContent = "";
            let counter = 1;
            for (let i = 0; i <= finalCounter; i++) {
                const a = document.createElement('a');
                a.setAttribute('href', '#')
                a.textContent = ` ${counter} `;
                const currentValue = counter;
                a.addEventListener('click', () => {
                    getData(`https://swapi.dev/api/people/?page=${currentValue}`)
                })
                pagination.append(a);
                counter++;
                i += resultLength;
            }
            const people = data.results
            main.textContent = "";
            people.forEach(element => {
                const div = document.createElement('div');
                const a = document.createElement('a');
                a.setAttribute('href', element.url)
                div.textContent = element.name
                div.addEventListener('click', () => showdetails(element.url));
                div.append(a);
                main.append(div);
            });
            document.getElementById('prev').removeEventListener('click', () => getPrev);
            document.getElementById('next').removeEventListener('click', () => getNext);
            if (data.previous) {
                previous = data.previous;
                document.getElementById('prev').addEventListener('click', getPrev);
            }
            if (data.next) {
                next = data.next;
                document.getElementById('next').addEventListener('click', getNext)
            }
        })
        .catch(err => console.error(err))
}
function getPrev() {
    getData(previous);
}
function getNext() {
    getData(next);
}
function showdetails(url) {
    while (detailbox.children.length > 1) {
        detailbox.removeChild(detailbox.lastChild);
    }
    fetch(url).then(res => res.json())
        .then(data => {
            const objArray = ['name', 'height', 'mass', 'eye_color', 'hair_color', 'gender', 'skin_color', 'birth_year']
            console.log(data);
            objArray.forEach(element => {
                const div = document.createElement('div');
                div.textContent = `${element} : ${data[element]}`;
                detailbox.append(div)
            })
            mainContainer.style.transform = 'translateX(-100vw)';
            detailbox.style.transform = 'translateX(-100vw)';
        }).catch(err => console.error(err));
}
getData();
returnButton.addEventListener('click', () => {
    mainContainer.style.transform = 'translateX(0vw)';
    detailbox.style.transform = 'translateX(100vw)';
})