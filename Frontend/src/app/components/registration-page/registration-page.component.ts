import { Component, OnInit } from '@angular/core';
import { RegistrationModel } from '../../model/registrationModel';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  passwordMatch: String = '';
  registrationModel: RegistrationModel;

  constructor(private registerService: RegisterService, private route: Router) {
    this.registrationModel = new RegistrationModel();
  }

  register() {
    if (
      !this.registrationModel.validateProperty() ||
      this.registrationModel.password != this.passwordMatch ||
      this.registrationModel.password == '' ||
      this.registrationModel.name == '' ||
      this.registrationModel.surname == '' ||
      this.registrationModel.email == ''
    ) {
      alert('An error occured.');
    } else {
      this.registerService
        .register(this.registrationModel)
        .subscribe((data) => {
          if (data) {
            alert('Succesfully signed up! Proceed to login.');
            this.route.navigate(['login']);
          } else {
            alert('This email is already taken.');
          }
        });
    }
  }

  ngOnInit(): void {}
}
