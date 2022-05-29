import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUser } from 'src/app/model/applicationUser';
import { Company } from 'src/app/model/company';
import { JobOffer } from 'src/app/model/jobOffer';
import { BrowseService } from 'src/app/services/browse.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: ApplicationUser = new ApplicationUser();
  company: Company = new Company();
  jobOffers: JobOffer[] = [];

  constructor(
    private loginService: LoginService,
    private browseService: BrowseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user.id = this.route.snapshot.paramMap.get('id')!;

    this.browseService.getUserById(this.user.id).subscribe((data) => {
      this.user = data;

      if (this.user.role == 'COMPANY_OWNER') {
        this.browseService
          .getCompanyByUserId(this.user.id)
          .subscribe((data) => {
            if (data != null) {
              this.company = data;

              this.browseService
                .getAllJobOffersByCompany(this.company.id)
                .subscribe((data) => {
                  this, (this.jobOffers = data);
                });
            }
          });
      }
    });
  }

  myProfileFunc(): boolean {
    let urlID = this.user.id;
    return urlID === this.loginService.getCurrentUser().id;
  }

  registerCompanyForm() {}

  redirectJobOffer(id: string) {
    window.location.href = '/job-offer/' + id;
  }
}
