import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../app-global';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  url = server + 'browse';

  constructor(private _http: HttpClient) {}

  getAllUsers() {
    const url = this.url + '/users';
    return this._http.get<any>(url);
  }

  getUserById(id: string) {
    const url = this.url + '/user/' + id;
    return this._http.get<any>(url);
  }

  getAllCompanies() {
    const url = this.url + '/companies';
    return this._http.get<any>(url);
  }

  getCompanyById(id: string) {
    const url = this.url + '/company/' + id;
    return this._http.get<any>(url);
  }

  getAllPosts() {
    const url = this.url + '/posts';
    return this._http.get<any>(url);
  }

  getPostById(id: string) {
    const url = this.url + '/post/' + id;
    return this._http.get<any>(url);
  }

  getAllJobOffers() {
    const url = this.url + '/job-offers';
    return this._http.get<any>(url);
  }

  getAllJobOffersByCompany(id: string) {
    const url = this.url + '/job-offers/company/' + id;
    return this._http.get<any>(url);
  }

  getJobOfferById(id: string) {
    const url = this.url + '/job-offer/' + id;
    return this._http.get<any>(url);
  }

  getJobOfferComments(id: string) {
    const url = this.url + '/job-offer/comments/' + id;
    return this._http.get<any>(url);
  }

  getCompanyByUserId(id: string) {
    const url = this.url + '/company/user/' + id;
    return this._http.get<any>(url);
  }
}
