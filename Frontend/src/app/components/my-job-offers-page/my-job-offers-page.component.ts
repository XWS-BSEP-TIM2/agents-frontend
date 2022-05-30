import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationUser } from 'src/app/model/applicationUser';
import { Company } from 'src/app/model/company';
import { JobOffer } from 'src/app/model/jobOffer';
import { BrowseService } from 'src/app/services/browse.service';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { LoginService } from 'src/app/services/login.service';
import { EditJobOfferDialogComponent } from './edit-job-offer-dialog/edit-job-offer-dialog.component';
import { NewJobOfferDialogComponent } from './new-job-offer-dialog/new-job-offer-dialog.component';

@Component({
  selector: 'my-job-offers-page',
  templateUrl: './my-job-offers-page.component.html',
  styleUrls: ['./my-job-offers-page.component.scss'],
})
export class MyJobOffersPageComponent implements OnInit {
  user: ApplicationUser = new ApplicationUser();
  company: Company = new Company();
  jobOffers: JobOffer[] = [];

  constructor(
    private loginService: LoginService,
    private browseService: BrowseService,
    public dialog: MatDialog,
    private jobOfferService: JobOfferService
  ) {}

  ngOnInit(): void {
    this.user.id = this.loginService.getCurrentUser().id;

    this.browseService.getUserById(this.user.id).subscribe((data) => {
      this.user = data;

      this.browseService.getCompanyByUserId(this.user.id).subscribe((data) => {
        if (data != null) {
          this.company = data;

          if (this.user.role == 'COMPANY_OWNER') {
            this.browseService
              .getAllJobOffersByCompany(this.company.id)
              .subscribe((data) => {
                data.reverse();
                this.jobOffers = data;
              });
          }
        }
      });
    });
  }

  redirectJobOffer(id: string) {
    window.location.href = '/job-offer/' + id;
  }

  addNew() {
    const dialogRef = this.dialog.open(NewJobOfferDialogComponent);
  }

  editJobOffer(id: string) {
    const dialogRef = this.dialog.open(EditJobOfferDialogComponent, {
      data: id,
    });
  }

  deleteJobOffer(offer: JobOffer) {
    if (
      confirm(
        'Are you sure you want to delete job offer for: ' +
          offer.position +
          '? It cannot be undone.'
      )
    ) {
      this.jobOfferService.deleteOffer(offer).subscribe((data) => {
        if (data) {
          window.location.href = '/job-offers';
        }
      });
    }
  }
}
