import { getJSON } from './utilities.js';
// Quake Model
export default class Quake {
    constructor() {
        this.baseUrl =
            'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
        this.startTime = '2019-01-01';
        this.endTime = '2019-03-02';
        // this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
        this._quakes = [];
    }
    async getEarthQuakesByRadius(position, radius = 100, minDate, maxDate) {
        const latitude = position.lat;
        const longitude = position.lon;
        if (minDate == '') {
            this.startTime = '2019-01-01'
        } else {
            this.startTime = minDate
        }
        if (maxDate == '') {
            this.endTime = '2019-03-02'
        } else {
            this.endTime = maxDate
        }
        if (radius > 20001.6) {
            alert('invalid radius');
            return this._quakes;
        } else {
            const fullUrl = `${this.baseUrl}&starttime=${this.startTime}&endtime=${this.endTime}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radius}`
            console.log(fullUrl)
            this._quakes = await getJSON(fullUrl);
            // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._quakes, then return it
            return this._quakes;
        }
    }
    getQuakeById(id) {
        // filter this._quakes for the record identified by id and return it
        return this._quakes.features.filter(item => item.id === id)[0];
    }
}