import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/model/loginResponse';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchText: string = '';
  loginUser: LoginResponse = new LoginResponse();

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginUser = this.loginService.getCurrentUser();
  }

  resetSearch() {
    this.searchText = '';
  }

  logout() {
    this.loginService.logout();
  }

  redirectMyProfile() {
    window.location.href = '/user/' + this.loginUser.id;
  }

  performSearch() {
    if (this.searchText.trim() != '') {
      window.location.href = '/search/' + this.searchText.trim().toLowerCase();
    } else {
      window.location.href = '/';
    }
  }
}
