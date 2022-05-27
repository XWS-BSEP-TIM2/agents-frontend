import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: User = new User();

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
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

  registerCompanyForm() {
    
  }
}
