import { Component, Input, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/app/model/applicationUser';
import { JobOffer } from 'src/app/model/jobOffer';
import { JobOfferComment } from 'src/app/model/jobOfferComent';
import { BrowseService } from 'src/app/services/browse.service';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss'],
})
export class WriteCommentComponent implements OnInit {
  comment: JobOfferComment = new JobOfferComment();
  @Input() jobOffer: JobOffer = new JobOffer();
  user: ApplicationUser = new ApplicationUser();

  constructor(
    private browseService: BrowseService,
    private loginService: LoginService,
    private jobOfferService: JobOfferService
  ) {}

  ngOnInit(): void {
    this.user.id = this.loginService.getCurrentUser().id;

    this.browseService.getUserById(this.user.id).subscribe((data) => {
      this.user = data;
    });
  }

  discard() {
    this.comment = new JobOfferComment();
  }

  send() {
    if (this.comment.comment != '') {
      this.comment.user = this.user;
      this.comment.jobOffer = this.jobOffer;
      this.jobOfferService
        .postNewOfferComment(this.comment)
        .subscribe((data) => {
          alert('Your comment has been published!');
          window.location.href = '/job-offer/' + this.jobOffer.id;
        });
    }
  }
}
