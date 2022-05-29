import { Component, Input, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/app/model/applicationUser';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent implements OnInit {
  @Input() user: ApplicationUser = new ApplicationUser();
  @Input() size: number = 50;
  @Input() activeUser: boolean = false;
  fullName: string = 'Null';

  constructor(
    private profileService: UserService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    if (this.activeUser) {
      this.fullName = this.loginService.getCurrentUser().fullName;
      if (this.fullName == null) {
        this.fullName = 'Null';
      }
    } else if (this.user.id != '') {
      this.fullName = this.profileService.getFullName(this.user);
    }
  }
}
