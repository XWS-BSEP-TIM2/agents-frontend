import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from '../model/loginRequest';
import { LoginResponse as LoginResponse } from '../model/loginResponse';
import { server } from '../app-global';
import { Verify2Factor } from '../model/verifyTwoFactor';
import { PasswordlessLoginModel } from '../model/passwordlessModel';
import { RecoveryRequest } from '../model/recoveryRequest';
import { ChangePasswordRequest } from '../model/changePasswordRequest';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  

  loginPasswordless(token:PasswordlessLoginModel){
    const url=this.url+'/verify-magic-link/'+token.tokenCode;
    return this._http.get<any>(url);
  }

  sendMagicLinkMail(mail:string){
    const url=this.url+'/send-mail/'+mail
    return this._http.get<any>(url).subscribe();
  }

  
  url = server + 'login';

  constructor(private _http: HttpClient, private route: Router) {}

  verifyAuthCode(code: string) {
    const url = this.url + '/verify-qr';
    const dto:Verify2Factor={
      code:code,
      userId:this.getCurrentUser().id
    }
    return this._http.post<any>(url,dto);
  }
  getQrCode(id: string) {
    const url = this.url + '/generate-qr/'+id;
    return this._http.get<any>(url);
  }

  login(loginR: LoginRequest) {
    return this._http.post<any>(this.url, loginR);
  }

  resendVerificationCode(email: string) {
    return this._http.get<any>(this.url+'/resend-verify-code/'+email)
  }

  forggotPasswrod(email: string) {
    return this._http.get<any>(this.url+'/recovery-password/'+email)
  }

  loginRecoverRequest(recoveryRequest: RecoveryRequest) {
    return this._http.post<any>(this.url + '/recovery-password', recoveryRequest);
  }

  changePassword(changePasswordRequest: ChangePasswordRequest) {
    const headers = this.getHeaders();
    return this._http.post<any>(this.url + '/change-password', changePasswordRequest, { headers: headers })
  }

  loginSetUser(loginResponse: LoginResponse) {
    localStorage.setItem('currentUser', JSON.stringify(loginResponse));
    if (loginResponse.twoFactor==true){
      window.location.href="/two-factor";
    }else{
      window.location.href = '/';
    }
    
  }

  logout() {
    var user = new LoginResponse();
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = '/login';
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
    let user=this.getCurrentUser();
    if (user == null || user.jwt=='') {
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
