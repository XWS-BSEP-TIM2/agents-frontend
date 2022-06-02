import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/app/model/applicationUser';
import { Company } from 'src/app/model/company';
import { JobOffer } from 'src/app/model/jobOffer';
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
    private jobOfferService: JobOfferService
  ) { }

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

  send() {
    if (this.validForm()) {
      this.offer.publishToDislinkt = this.publishToDislinkt;
      this.offer.position = this.offer.position.trim();
      this.offer.seniority = this.offer.seniority.trim();
      this.offer.description = this.offer.description.trim();
      this.offer.technologies = this.technologies

        .split(',')
        .map((e) => e.trim());

      this.jobOfferService.postNewOffer(this.offer).subscribe((data) => {
        if (data) {
          alert('Your job offer has been published!');
          window.location.href = '/job-offers';
        }
      });
    }
  }
}
