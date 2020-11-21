import { getJSON, getLocation } from './utilities.js';
import QuakesController from './QuakesController.js';
const quakesControl = new QuakesController('#quakeList');
quakesControl.init();
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click',reloadQuakes)
function reloadQuakes(){
    const radius = parseInt(document.getElementById('radius').value);
    const minDate = document.getElementById('InitialDate').value;
    const maxDate = document.getElementById('finalDate').value;
    console.log(minDate);
    console.log(maxDate);
    quakesControl.init(radius,minDate,maxDate)
}
// const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';
// getLocation().then(data => {
//     const latitude = data.coords.latitude;
//     const longitude = data.coords.longitude;
//     const fullUrl = `${baseUrl}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=100`
//     getJSON(fullUrl).then(quakes => {
//         console.log(quakes)
//         const quakesArray = Array.from(quakes.features);
//         console.log(quakesArray);
//         const quakesContainer = document.querySelector('#quakeList')
//         quakesArray.forEach(element => {
//             const properties = element.properties;
//             const li = document.createElement('li');
//             const divcontainer = document.createElement('div');
//             const location = document.createElement('span');
//             const magnitude = document.createElement('span');
//             const url = document.createElement('a');
//             const type = document.createElement('span');
//             location.textContent = 'Place: ' + properties.place;
//             magnitude.textContent = 'Magnitude: ' + properties.mag;
//             url.setAttribute('href', properties.url);
//             url.setAttribute('target', '_blank');
//             url.textContent = 'Check Details';
//             type.textContent = 'Type: ' + properties.type;
//             divcontainer.append(location, magnitude, type, url);
//             li.append(divcontainer);
//             quakesContainer.append(li);
//         });
//     }
//     );
// });