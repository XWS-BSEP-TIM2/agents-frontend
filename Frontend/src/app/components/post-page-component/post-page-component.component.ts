import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUser } from 'src/app/model/applicationUser';
import { JobOffer } from 'src/app/model/jobOffer';
import { JobOfferComment } from 'src/app/model/jobOfferComent';
import { BrowseService } from 'src/app/services/browse.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'post-page-component',
  templateUrl: './post-page-component.component.html',
  styleUrls: ['./post-page-component.component.scss'],
})
export class PostPageComponentComponent implements OnInit {
  jobOffer: JobOffer = new JobOffer();
  comments: JobOfferComment[] = [];
  currentUser: ApplicationUser = new ApplicationUser();
  commentsLoaded: boolean = false;

  constructor(
    private loginService: LoginService,
    private browseService: BrowseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.jobOffer.id = this.route.snapshot.paramMap.get('id')!;

    this.browseService.getJobOfferById(this.jobOffer.id).subscribe((data) => {
      this.jobOffer = data;
    });

    this.browseService
      .getJobOfferComments(this.jobOffer.id)
      .subscribe((data) => {
        this.comments = data;
        this.commentsLoaded = true;
      });

    this.currentUser.role = this.loginService.getCurrentUserRole();
  }
}
