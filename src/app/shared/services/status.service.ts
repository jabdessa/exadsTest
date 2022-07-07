import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusResponseMock } from '../interfaces';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getStatusById(id: number) {
    const url = `${Config.BASE_URL + Config.STATUSES}/${id} `;

    let options = {
      headers: new HttpHeaders().append("Content-Type", "application/json")
    };

    return this.httpClient.get<StatusResponseMock>(url, options);
  }

  getStatus() {
    const url = Config.BASE_URL + Config.STATUSES;

    let options = {
      headers: new HttpHeaders().append("Content-Type", "application/json")
    };

    return this.httpClient.get<StatusResponseMock>(url, options);
  }

}