
// Quake View handler
export default class QuakesView {
    renderQuakeList(quakeList, listElement) {
        //build a list of the quakes...include the title and time of each quake then append the list to listElement. You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
        listElement.innerHTML = quakeList.features
            .map(quake => {
                const properties = quake.properties;
                const li = document.createElement('li');
                const divcontainer = document.createElement('div');
                const location = document.createElement('span');
                const magnitude = document.createElement('span');
                const url = document.createElement('a');
                const type = document.createElement('span');
                location.textContent = 'Place: ' + properties.place;
                magnitude.textContent = 'Magnitude: ' + properties.mag;
                url.setAttribute('href', properties.url);
                url.setAttribute('target', '_blank');
                url.textContent = 'Check Details';
                type.textContent = 'Type: ' + properties.type;
                divcontainer.append(location, magnitude, type, url);
                li.setAttribute('id',properties.ids);
                li.append(divcontainer);
                // return `${quake.properties.title}, ${new Date(
                //     quake.properties.time
                // )}<br>`;
                return li.outerHTML;
            })
            .join('');
    }
    renderQuake(quake, element) {
        const quakeProperties = Object.entries(quake.properties);
        // for the provided quake make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
    }
}