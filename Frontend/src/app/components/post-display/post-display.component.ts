import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss'],
})
export class PostDisplayComponent implements OnInit {
  @Input() post: Post = new Post();
  constructor() {}

  ngOnInit(): void {
    console.log(this.post);
  }

  redirectProfile(id: string) {
    window.location.href = '/user/' + id;
  }

  redirectJobOffer(id: string) {
    window.location.href = '/job-offer/' + id;
  }
}
