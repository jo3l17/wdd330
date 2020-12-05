import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  city = new FormControl('', [Validators.required]);
  cities = [];
  hintMessage = "";
  hint = false;
  favoriteCities = [];

  @ViewChild("cityInput") nameField: ElementRef;

  focusInput(): void {
    this.nameField.nativeElement.focus();
  }

  constructor(private weatherService: WeatherService, private utilities: UtilitiesService) {
  }

  createHintMessage(city) {
    return `You already know the weather for ${city} ...otherwise be more specific by providing the country code as well 😉`;
  }

  async sendCity() {
    this.city.markAsTouched()
    if (this.city.invalid || !this.city.value) {
      this.city.setErrors({ 'empty': true })
      return
    }
    let inputVal = this.city.value;
    if (this.cities.length > 0) {
      const filteredArray = this.cities.filter(el => {
        let content = el.name.toLowerCase();
        //athens,gr
        if (inputVal.includes(",")) {
          //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
          if (inputVal.split(",")[1].length > 2) {
            inputVal = inputVal.split(",")[0];
            content = el.name.toLowerCase();
          }
        }
        return content == inputVal.toLowerCase();
      });
      if (filteredArray.length > 0) {
        this.resetForm();
        this.hint = true;
        this.hintMessage = this.createHintMessage(filteredArray[0].name);
        return
      }
    }

    const data = await this.weatherService.getWeatherByCityName(inputVal)
    if (!data) {
      this.city.setErrors({ 'incorrect': true });
    } else {
      this.cities.push(this.utilities.formatData(data));
      this.resetForm();
    }
    console.log(data)
  }

  resetForm() {
    this.city.reset();
    this.focusInput();
  }

  deleteCity(city) {
    this.favoritesCity(city, false);
    const index = this.cities.findIndex(x => x.name == city);
    if (index > -1) {
      this.cities.splice(index, 1);
    }
  }

  favoritesCity(city, val) {
    this.cities.forEach(element => {
      if (element.name == city) {
        element.favorite = val
        if (val) {
          this.favoriteCities.push(element);
        } else {
          const index = this.favoriteCities.findIndex(x => x.name == city);
          if (index > -1) {
            this.favoriteCities.splice(index, 1);
          }
        }
      }
    });
    this.save();
  }

  save() {
    this.utilities.setItemLS('favorites', JSON.stringify(this.favoriteCities));
  }

  noErrors() {
    this.city.setErrors(null);
  }

  async ngOnInit() {
    this.city.valueChanges.subscribe(val => {
      if (val != "") {
        this.hint = false;
        this.noErrors();
      }
    });
    this.favoriteCities = await this.weatherService.getFavoritesCities();
    this.cities = [...this.favoriteCities]
  }
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.sendCity();
    }
  }

  getErrorMessage() {
    if (this.city.hasError('required') || this.city.hasError('empty')) {
      return "You must write a City";
    }
    return "please enter a valid city name";
  }

}
