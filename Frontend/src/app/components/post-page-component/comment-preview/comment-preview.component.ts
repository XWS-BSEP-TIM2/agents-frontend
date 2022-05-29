import { Component, Input, OnInit } from '@angular/core';
import { JobOfferComment } from 'src/app/model/jobOfferComent';

@Component({
  selector: 'comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss'],
})
export class CommentPreviewComponent implements OnInit {
  @Input() comment: JobOfferComment = new JobOfferComment();

  constructor() {}

  ngOnInit(): void {}
}
