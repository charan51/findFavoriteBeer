import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ListBeerService {
  constructor(private http: HttpClient) { }
  findBeerType(data: any) {
    const { bitterness, fermentationType, food } = data;
    return this.http.get(`https://api.punkapi.com/v2/beers?ibu_lt=${bitterness}&yeast=${fermentationType}&food=${food}`);
  }
}
