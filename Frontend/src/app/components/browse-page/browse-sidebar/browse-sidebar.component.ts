import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'browse-sidebar',
  templateUrl: './browse-sidebar.component.html',
  styleUrls: ['./browse-sidebar.component.scss'],
})
export class BrowseSidebarComponent implements OnInit {
  currentPage?: string = '';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.currentPage = this.router.url.substring(1);
  }

  redirect() {
    this.router.navigate([this.currentPage]);
  }

  redirectFeed() {
    this.currentPage = '';
    this.redirect();
  }
}
