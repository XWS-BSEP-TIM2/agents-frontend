import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobOffer } from 'src/app/model/jobOffer';

@Component({
  selector: 'detailed-post-display',
  templateUrl: './detailed-post-display.component.html',
  styleUrls: ['./detailed-post-display.component.scss'],
})
export class DetailedPostDisplayComponent implements OnInit {
  @Input() jobOffer: JobOffer = new JobOffer();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  redirectAuthorProfile() {
    window.location.href = '/user/' + this.jobOffer.company.user.id;
  }
}
