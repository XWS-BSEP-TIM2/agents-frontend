import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  guest: boolean = true;

  constructor(private loginService: LoginService) {
    this.guest = !this.loginService.isUserLoggedIn();
  }

  ngOnInit(): void {}
}
