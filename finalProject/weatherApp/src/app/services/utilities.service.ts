import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  getJSON(url): Object {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setItemLS(key,value){
    localStorage.setItem(key,value)
  }
  getFromLS(key){
    return localStorage.getItem(key);
  }

  formatData(data,favorite=false) {
    const { main, name, sys, weather } = data;
    return {
      name,
      country: sys.country,
      icon: `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]
        }.svg`,
      description: weather[0]["description"],
      temp: Math.round(main.temp),
      favorite
    }
  }
}
