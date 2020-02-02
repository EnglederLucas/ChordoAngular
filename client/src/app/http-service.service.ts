import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  http : HttpClient;

  
  constructor(http: HttpClient) {
    this.http = http;
  }

  getRawText(link: string){
    return this.http.post('http://localhost:5000/api/chords_raw', link);
  }
}
