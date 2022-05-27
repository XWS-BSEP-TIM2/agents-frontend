import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from '../model/loginRequest';
import { LoginResponse as LoginResponse } from '../model/loginResponse';
import { server } from '../app-global';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = server + 'login';

  constructor(private _http: HttpClient, private route: Router) {}

  login(loginR: LoginRequest) {
    return this._http.post<any>(this.url, loginR);
  }

  loginSetUser(loginResponse: LoginResponse) {
    localStorage.setItem('currentUser', JSON.stringify(loginResponse));
    window.location.href = '/';
  }

  logout() {
    var user = new LoginResponse();
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = '/';
  }

  getCurrentUser(): LoginResponse {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {
      return JSON.parse(localStorage.getItem('currentUser')!);
    } else {
      return new LoginResponse();
    }
  }

  isUserLoggedIn() {
    if (this.getCurrentUser() == null) {
      return false;
    } else {
      return this.getCurrentUser().role !== '';
    }
  }

  getHeaders() {
    const token = this.getCurrentUser().jwt;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    });
    return headers;
  }

  getCurrentUserRole() {
    return this.getCurrentUser().role;
  }
}
