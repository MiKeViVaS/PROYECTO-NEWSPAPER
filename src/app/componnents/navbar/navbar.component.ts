import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
{
  formData:object;

  constructor(private _data:DataService, private _router:Router) {
    this.formData = {
      category: 'general',
      top: 'top-headlines',
      sort: 'popularity',
      country: 'us',
      searchInput: ''
    };
  }

  termSearch():void {
    if(this.formData['searchInput']) {
      this._data.loadNews(`https://newsapi.org/v2/top-headlines?q=${this.formData['searchInput']}&country=us&apiKey=d271b1bee3d941fa83b6e9df36bf1265`);
      this.formData['searchInput'] = '';
    };
  };


  homeButton():void {
    this._router.navigateByUrl('/');
    this._data.loadNews('https://newsapi.org/v2/top-headlines?country=us&apiKey=d271b1bee3d941fa83b6e9df36bf1265');
  };

  searchAdvanced(form:any):void {
    const country = (form.form.value === 'everything') ? `&country=${form.form.value.country}` : '';

    let url:string = `https://newsapi.org/v2/${form.form.value.filter}?apiKey=d271b1bee3d941fa83b6e9df36bf1265${country}&category=${form.form.value.options}&shortBy=${form.form.value.sortBy}`;

    if(form.form.value.searchTerm) url += `&q=${form.form.value.searchTerm}`
    if(form.form.value.from) url += `&from=${form.form.value.from}`
    if(form.form.value.to) url += `&to=${form.form.value.to}`

    this._data.loadNews(url);
  };
 
};
