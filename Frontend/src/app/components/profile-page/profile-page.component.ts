import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUser } from 'src/app/model/applicationUser';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: ApplicationUser = new ApplicationUser();

  constructor(
    private loginService: LoginService,
    private profileService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user.id = this.route.snapshot.paramMap.get('id')!;
    this.myProfileFunc();

    this.profileService.getUserById(this.user.id).subscribe((data) => {
      this.user = data;
    });
  }

  myProfileFunc(): boolean {
    let urlID = this.user.id;
    return urlID === this.loginService.getCurrentUser().id;
  }

  registerCompanyForm() {}
}
