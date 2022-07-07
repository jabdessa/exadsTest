import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '@app/shared';
import { UserOutput, UserResponseMock, UserResponseMockPost } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  //*********************************************************GETS *********************************************************/

  getUserById(id: number) {
    const url = `${Config.BASE_URL + Config.USERS}/${id} `;

    let options = {
      headers: new HttpHeaders().append("Content-Type", "application/json")
    };
    return this.httpClient.get<UserResponseMock>(url, options);
  }

  getUsers() {
    const url = Config.BASE_URL + Config.USERS;

    let options = {
      headers: new HttpHeaders().append("Content-Type", "application/json")
    };
    return this.httpClient.get<UserResponseMock>(url, options);
  }

  getUsersByPage(page: number, limit: number) {
    const url = Config.BASE_URL + Config.USERS;

    let options = {
      headers: new HttpHeaders().append("Content-Type", "application/json"),
      params: new HttpParams().set("page", page.toString()).set("limit", limit.toString())
    };
    return this.httpClient.get<UserResponseMock>(url, options);
  }

  getUserByEmail(email: string) {
    const url = Config.BASE_URL + Config.USERS;

    let options = {
      headers: new HttpHeaders().append("Content-Type", "application/json"),
      params: new HttpParams().set("email", email.toString())
    };
    return this.httpClient.get<UserResponseMock>(url, options);
  }

  getUserByUsername(username: string) {
    const url = Config.BASE_URL + Config.USERS;

    let options = {
      headers: new HttpHeaders().append("Content-Type", "application/json"),
      params: new HttpParams().set("username", username.toString())
    };
    return this.httpClient.get<UserResponseMock>(url, options);
  }

  getUserByUserEmail(username: string, email: string) {
    const url = Config.BASE_URL + Config.USERS;

    let options = {
      headers: new HttpHeaders().append("Content-Type", "application/json"),
      params: new HttpParams().set("username", username.toString()).set("email", email.toString())
    };
    return this.httpClient.get<UserResponseMock>(url, options);
  }

  //*********************************************************POSTS *********************************************************/
  createUser(user: UserOutput) {
    const url = Config.BASE_URL + Config.USERS;

    // user Active by default
    user.id_status = 1;
    const us = {
      user: user
    }

    return this.httpClient.post<UserResponseMockPost>(url, us);
  }

}
