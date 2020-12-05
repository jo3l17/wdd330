import { Injectable } from '@angular/core';
import { weatherAPI, weatherLink } from '../globals';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private utilities: UtilitiesService) { }
  async getWeatherByCityName(city) {
    const units = this.utilities.getFromLS('units')?'metric':'imperial';
    const link: string = `${weatherLink}weather?q=${city}&units=metric&appid=${weatherAPI}`;
    const data = await this.utilities.getJSON(link);
    return data;
  }
  async getFavoritesCities(){
    const favorites = this.utilities.getFromLS('favorites')
    if(!favorites){
      return []
    }
    const arrayFavorites = JSON.parse(favorites)
    const mapedArray = await Promise.all(arrayFavorites.map(async element => {
      const query = await this.getWeatherByCityName(element.name);
      return this.utilities.formatData(query,true);
    }));
    return mapedArray;
  }
}
