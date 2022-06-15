import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { JobOffer } from 'src/app/model/jobOffer';
import { SelectTechnologiesDialogComponent } from 'src/app/select-technologies-dialog/select-technologies-dialog.component';
import { BrowseService } from 'src/app/services/browse.service';
import { JobOfferService } from 'src/app/services/job-offer.service';

@Component({
  selector: 'edit-job-offer-dialog',
  templateUrl: './edit-job-offer-dialog.component.html',
  styleUrls: ['./edit-job-offer-dialog.component.scss'],
})
export class EditJobOfferDialogComponent implements OnInit {
  offer: JobOffer = new JobOffer();
  technologies: string = '';
  publishToDislinkt: boolean = false;

  constructor(
    public dialog: MatDialog,
    private browseService: BrowseService,
    private jobOfferService: JobOfferService,
    public dialogRef: MatDialogRef<EditJobOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.offer.id = data;
  }

  ngOnInit(): void {
    this.browseService.getJobOfferById(this.offer.id).subscribe((data) => {
      this.offer = data;
      this.technologies = this.offer.technologies.toString();
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
      this.offer.position = this.offer.position.trim();
      this.offer.seniority = this.offer.seniority.trim();
      this.offer.description = this.offer.description.trim();
      this.offer.technologies = this.technologies
        .split(',')
        .map((e) => e.trim());

      this.jobOfferService.updateOffer(this.offer).subscribe((data) => {
        if (data) {
          alert('Your job offer has been updated!');
          window.location.href = '/job-offers';
        }
      });
    }
  }
}
