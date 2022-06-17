import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/model/loginRequest';
import { LoginResponse } from 'src/app/model/loginResponse';
import { RecoveryRequest } from 'src/app/model/recoveryRequest';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginRequest: LoginRequest = new LoginRequest();
  recoveryRequest: RecoveryRequest = new RecoveryRequest();
  errorMessage = '';
  mail = '';
  magicLinkMail = '';
  recoveryMsg = '';
  recoveryFormVisible = false;

  constructor(private loginService: LoginService, private route: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.recoveryFormVisible) {
      this.sendRecoveryRequest();
      return;
    }


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
          console.log(error)
          if (error.status == 401) {
            this.errorMessage = 'Email or password are wrong.'; 
          } else if (error.status == 423) {
            
            if (confirm('Your Acc is not Verified. Resend verification code?')) {
              this.resendVerificationCode()
            }
            
          }else if (error.error.startsWith("Err")) { //status
            alert(error.error)
          }
        }
      );
    }
  }

  sendRecoveryRequest() {
    this.recoveryRequest.email = this.loginRequest.email;
    if (!this.recoveryRequest.validateProperty()) {
      this.errorMessage = 'Email or password missing.';
    } else {
      this.errorMessage = '';
      console.log(this.recoveryRequest)
      this.loginService.loginRecoverRequest(this.recoveryRequest).subscribe(
        (data) => {
          if (data.error == undefined || data.error === '')
            this.successfulLogin(data);
          else {
            //alert(data.error);
            this.errorMessage = data.error;
          }
        },
        (res) => (this.errorMessage = 'Error login recovery')
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

  resendVerificationCode() {
    this.loginService.resendVerificationCode(this.loginRequest.email).subscribe((response) => {
      if(response.status == 200)
        alert("Successfully resending new verification code, chack your email")
    }, (err) => {
      if(err.status==400)
        alert("Error resending new verification code")
    })
  }

  forggotPassword() {
    this.recoveryMsg = '';
    this.recoveryRequest.email = this.loginRequest.email;
    this.loginService.forggotPasswrod(this.loginRequest.email).subscribe(
      (data) => {
        console.log("DATA",data)
        if (data.status == 200) {
          this.errorMessage = '';
          this.recoveryMsg = data.msg;
          this.recoveryFormVisible = true;
        } else {
          this.errorMessage = data.msg;
        }
      },
      (err) => {
        console.log('ERR', err)
        if (err.status == 200) {
          this.errorMessage = '';
          this.recoveryMsg = err.error.text;
          this.recoveryFormVisible = true;
        } else {
          this.errorMessage = 'Error recovery'; 
        }
      }
    );
  }
}
