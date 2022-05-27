import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../app-global';
import { User } from '../model/user';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url = server + 'profile';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  getUserById(userId: string) {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/' + userId;
    return this._http.get<any>(url, { headers: headers });
  }

  getProfilesByAdmin() {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/admin-view';
    return this._http.get<any>(url, { headers: headers });
  }

  getFullName(profile: User) {
    return profile.name + ' ' + profile.surname;
  }
}
