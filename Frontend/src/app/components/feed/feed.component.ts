import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/model/loginResponse';
import { Post } from 'src/app/model/post';
import { BrowseService } from 'src/app/services/browse.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  loginResponse: LoginResponse = new LoginResponse();

  constructor(
    private loginService: LoginService,
    private browseService: BrowseService
  ) {
    this.loginResponse = this.loginService.getCurrentUser();
  }

  ngOnInit(): void {
    this.browseService.getAllPosts().subscribe((data) => {
      if (data != null) {
        data.sort((a: Post, b: Post) => (a.timestamp < b.timestamp ? 1 : -1));
        this.posts = data;
      }
    });
  }
}
