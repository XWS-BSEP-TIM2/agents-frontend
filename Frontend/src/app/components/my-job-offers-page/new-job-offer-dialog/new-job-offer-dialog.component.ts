import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationUser } from 'src/app/model/applicationUser';
import { Company } from 'src/app/model/company';
import { JobOffer } from 'src/app/model/jobOffer';
import { SelectTechnologiesDialogComponent } from 'src/app/select-technologies-dialog/select-technologies-dialog.component';
import { BrowseService } from 'src/app/services/browse.service';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'new-job-offer-dialog',
  templateUrl: './new-job-offer-dialog.component.html',
  styleUrls: ['./new-job-offer-dialog.component.scss'],
})
export class NewJobOfferDialogComponent implements OnInit {
  offer: JobOffer = new JobOffer();
  company: Company = new Company();
  user: ApplicationUser = new ApplicationUser();
  technologies: string = '';
  publishToDislinkt: boolean = false;

  constructor(
    private browseService: BrowseService,
    private loginService: LoginService,
    private jobOfferService: JobOfferService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user.id = this.loginService.getCurrentUser().id;
    this.browseService.getUserById(this.user.id).subscribe((data) => {
      this.user = data;

      this.browseService.getCompanyByUserId(this.user.id).subscribe((data) => {
        this.company = data;

        this.offer.company = this.company;
      });
    });
  }

  validForm() {
    return (
      this.offer.description.trim() != '' &&
      this.offer.position.trim() != '' &&
      this.offer.seniority.trim() != '' &&
      this.technologies.trim() != ''
    );
  }

  getTechnologyCount() {
    if (this.technologies != '') {
      return this.technologies.split(',').length;
    } else {
      return 0;
    }
  }

  openTechnologiesDialog() {
    const dialogRef = this.dialog.open(SelectTechnologiesDialogComponent, {
      data: { currentTechnologies: this.technologies },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.technologies = result;
    });
  }

  send() {
    if (this.validForm()) {
      this.offer.publishToDislinkt = this.publishToDislinkt;
      this.offer.position = this.offer.position.trim();
      this.offer.seniority = this.offer.seniority.trim();
      this.offer.description = this.offer.description.trim();
      this.offer.technologies = this.technologies

        .split(',')
        .map((e) => e.trim());

      this.jobOfferService.postNewOffer(this.offer).subscribe(
        (data) => {
          if (data) {
            alert('Your job offer has been published!');
            window.location.href = '/job-offers';
          }
        },
        (err) => {
          alert('Something has gone wrong. Incorrect API key.');
          window.location.href = '/job-offers';
        }
      );
    }
  }
}
