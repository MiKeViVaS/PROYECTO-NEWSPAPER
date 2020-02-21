import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  data:object;
  view:string;
  subscribeRequest:Subscription;

  constructor(private _data:DataService, private _rouetr:Router)
  {
    this.subscribeRequest = this._data.subjectRequest.subscribe((data:object)=>{
      this.view = data[0] ? 'news' : 'notFound';
      this.data = data;
    });
    this._data.loadNews('https://newsapi.org/v2/top-headlines?country=us&apiKey=d271b1bee3d941fa83b6e9df36bf1265');
  };


  viewNew(index:number) {
    this._rouetr.navigateByUrl(`/view/${index}`);
  };

  
  ngOnDestroy() {
    this.subscribeRequest.unsubscribe();
  };
};

