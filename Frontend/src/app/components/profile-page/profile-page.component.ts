import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginResponse } from 'src/app/model/loginResponse';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  userProfile: User = new User();
  loginResponse!: LoginResponse;
  targetUserID: string = '';

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userProfile.id = this.route.snapshot.paramMap.get('id')!;
    this.targetUserID = this.userProfile.id;
    this.loginResponse = this.loginService.getCurrentUser();
    this.myProfileFunc();

    this.profileService.getUserById(this.userProfile.id).subscribe((data) => {
      this.userProfile = data.profile;
    });
  }

  myProfileFunc(): boolean {
    let urlID = this.userProfile.id;
    //return this.loginService.getCurrentUser().userID === urlID;   //TODO: fix
    //TODO: linija iznad uporedjuje prijavljenog korisnika i id prosledjenog
    return urlID === this.loginResponse.id;
  }

  redirectConnections() {
    window.location.href = 'user/' + this.userProfile.id + '/connections';
  }

  redirectBlocks() {
    window.location.href = 'user/' + this.userProfile.id + '/blocks';
  }

  redirectRequests() {
    window.location.href = 'user/' + this.userProfile.id + '/requests';
  }

  redirectFeed() {
    window.location.href = 'user/' + this.userProfile.id;
  }
}
