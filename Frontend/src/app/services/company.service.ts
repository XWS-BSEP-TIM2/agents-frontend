import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../app-global';
import { Company } from '../model/company';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  url = server + 'company';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  updateCompany(company: Company) {
    const headers = this.loginService.getHeaders();
    const url = this.url;
    return this._http.put<any>(url, company, { headers: headers });
  }
}
