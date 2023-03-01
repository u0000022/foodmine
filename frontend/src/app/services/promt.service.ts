import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FOOD_BY_ID_URL, PROMTS_URL, PROMT_BY_ID_URL } from '../shared/constants/urls';
import { Promt } from '../shared/models/Promt';

@Injectable({
  providedIn: 'root'
})
export class PromtService {

  constructor(private httpClient : HttpClient ) { }

  getAll() : Observable<Promt[]> {
      return this.httpClient.get<Promt[]>(PROMTS_URL)
  }

  getFoodById(promtId:string) : Observable<Promt> {
    return this.httpClient.get<Promt>(PROMT_BY_ID_URL + promtId)
  }

}
