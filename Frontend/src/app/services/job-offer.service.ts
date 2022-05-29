import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../app-global';
import { JobOffer } from '../model/jobOffer';
import { JobOfferComment } from '../model/jobOfferComent';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class JobOfferService {
  url = server + 'job-offer';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  postNewOffer(jobOffer: JobOffer) {
    const headers = this.loginService.getHeaders();
    const url = this.url;
    return this._http.post<any>(url, jobOffer, { headers: headers });
  }

  postNewOfferComment(comment: JobOfferComment) {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/comment';
    return this._http.post<any>(url, comment, { headers: headers });
  }

  updateOffer(jobOffer: JobOffer) {
    const headers = this.loginService.getHeaders();
    const url = this.url;
    return this._http.put<any>(url, jobOffer, { headers: headers });
  }

  deleteOffer(jobOffer: JobOffer) {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/delete';
    return this._http.put<any>(url, jobOffer, { headers: headers });
  }
}
