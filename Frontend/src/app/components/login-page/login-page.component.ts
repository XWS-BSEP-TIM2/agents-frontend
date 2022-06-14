import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/model/loginRequest';
import { LoginResponse } from 'src/app/model/loginResponse';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginRequest: LoginRequest = new LoginRequest();
  errorMessage = '';
  mail = '';
  magicLinkMail='';

  constructor(private loginService: LoginService, private route: Router) {}

  ngOnInit(): void {}

  login() {
    if (!this.loginRequest.validateProperty()) {
      this.errorMessage = 'Email or password missing.';
    } else {
      this.errorMessage = '';
      this.loginService.login(this.loginRequest).subscribe(
        (response) => {
          if (response != undefined) {
            this.successfulLogin(response);
          } else {
            this.errorMessage = 'Email or password are wrong.';
          }
        },
        (error) => {
          this.errorMessage = 'Email or password are wrong.';
        }
      );
    }
  }

  successfulLogin(loginResponse: LoginResponse) {
    this.errorMessage = '';
    this.loginService.loginSetUser(loginResponse);
  }

  openModalTab():void{
    document.getElementById('modal')?.classList.toggle('is-active');
  }

  closeModalTab():void{
    document.getElementById('modal')?.classList.toggle('is-active');
  }

  sendMagicLinkMail():void{
    this.loginService.sendMagicLinkMail(this.magicLinkMail);
    console.log(this.mail);
    this.closeModalTab();
  }
}
