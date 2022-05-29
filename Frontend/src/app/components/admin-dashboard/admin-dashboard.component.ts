import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/model/company';
import { CompanyOwnerRequest } from 'src/app/model/companyOwnerRequest';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  requests: CompanyOwnerRequest[] = [];

  constructor(
    private userService: UserService,
    private loginService: LoginService
  ) {
    if (loginService.getCurrentUserRole() != 'ADMIN') {
      window.location.href = 'error';
    }
  }

  ngOnInit(): void {
    this.userService.getCompanyOwnerRequests().subscribe((data) => {
      this.requests = data;
    });
  }

  reject(company: Company) {
    this.userService.rejectCompanyOwnerRequest(company).subscribe((data) => {
      if (data) {
        window.location.href = '/admin';
      }
    });
  }

  accept(company: Company) {
    this.userService.acceptCompanyOwnerRequest(company).subscribe((data) => {
      if (data) {
        window.location.href = '/admin';
      }
    });
  }
}
