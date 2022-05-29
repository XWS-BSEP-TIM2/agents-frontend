import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../app-global';
import { ApplicationUser } from '../model/applicationUser';
import { Company } from '../model/company';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = server + 'user';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  getFullName(profile: ApplicationUser) {
    return profile.name + ' ' + profile.surname;
  }

  sendCompanyOwnerRequest(company: Company) {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/company-owner-request';
    return this._http.post<any>(url, company, { headers: headers });
  }

  acceptCompanyOwnerRequest(company: Company) {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/company-owner-request/accept';
    return this._http.post<any>(url, company, { headers: headers });
  }

  rejectCompanyOwnerRequest(company: Company) {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/company-owner-request/reject';
    return this._http.put<any>(url, company, { headers: headers });
  }

  getCompanyOwnerRequests() {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/company-owner-requests';
    return this._http.get<any>(url, { headers: headers });
  }
}
