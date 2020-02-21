import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class DataService
{
  data:object;
  current:object;
  dataFiltered:object[];
  subjectRequest:Subject<object> = new Subject<object>();


  constructor(private _http:HttpClient, private _router:Router)
  {
    this.data = {
      api: {
        url: 'https://newsapi.org/v2/',
        key: 'key=fa1da7658ca346b7a593a81205017d3b',
        path: {
          all: 'everithing?',
          important: 'top-headlines?'
        },
        paramps: {
          search: 'q=',
          category: {
            key: 'category=',
            values: ['entertainment', 'general', 'health', 'science', 'sports', 'technology'],
          },
          from: 'from=',
          to: 'to=',
          pageSize: [0,100],
          sortBy: {
            key: 'shortBy=',
            values: {
              date: 'publishedAt',
              popularity: 'popularity'
            },
          },
          country: {
            key: 'country=',
            values: [
              'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg',
              'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma',
              'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg',
              'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
            ]
          },
          domain: {}
        }
      }
    };


  };


  loadNews(url:string):Subscription
  {
    return this._http.get(url, {
      headers: new HttpHeaders({ })
    }).subscribe(
      (data:object)=>
      {
        this.dataFiltered = [];
        let buffer:string[] = [];
        
        data['articles'].forEach((d:object)=>{
          if(buffer.indexOf(d['description']) === -1) {
            buffer.push(d['description']);

            if(!d['author'] && d['source'].name) {
              d['author'] = d['source'].name
            };
            if(!d['description'] && d['content']) {
              d['description'] = d['content']
            };
            if(d['author'] && d['description'] && d['urlToImage']) {
              this.dataFiltered.push(d)
            };
          };
        });
        this.subjectRequest.next(this.dataFiltered);
      },
      (err:object)=>{  this._router.navigateByUrl('/error') }
    );
  };


  googleSearch(searchTerm:string) {
    const win:any = window.open(`https://www.google.com/search?q=${searchTerm}`, '_blank');
    win.focus();
  };




};