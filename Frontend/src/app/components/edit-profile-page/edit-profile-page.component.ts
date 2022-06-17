import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordRequest } from 'src/app/model/changePasswordRequest';


@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {


  changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest();

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog
  ) {}


  changePasswordFormVisible: boolean = false;



  ngOnInit(): void {
  }

  startChangePassword() {
    this.changePasswordRequest = new ChangePasswordRequest();
    this.changePasswordRequest.email = this.loginService.getCurrentUser().email
    this.changePasswordFormVisible = true;
  }

  cancelChangePassword() {
    this.changePasswordFormVisible = false;
  }
  
  changePassword() {
    if (!this.changePasswordRequest.validateProperty()) {
      alert('All fields must be valid!');
      return;
    }
    this.loginService.changePassword(this.changePasswordRequest).subscribe(
      (data) => {
        console.log(data)
        if (data != null) {
          alert(data.msg);
          if (data.status == 200) this.cancelChangePassword();
        } else {
          alert('error?');
        }
      },
      (error) => {
        console.log(error)
        if (error.status == 200) {
          alert(error.error.text)
          this.cancelChangePassword();
        }
        else
          alert('ERROR');
      }
    );
  }
  
}
