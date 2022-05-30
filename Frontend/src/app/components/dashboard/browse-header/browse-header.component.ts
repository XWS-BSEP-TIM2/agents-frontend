import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'browse-header',
  templateUrl: './browse-header.component.html',
  styleUrls: ['./browse-header.component.scss'],
})
export class BrowseHeaderComponent implements OnInit {
  searchText: string = '';

  constructor() {}

  ngOnInit(): void {}

  resetSearch() {
    this.searchText = '';
  }

  performSearch() {
    if (this.searchText.trim() != '') {
      window.location.href = '/search/' + this.searchText.trim().toLowerCase();
    } else {
      window.location.href = '/';
    }
  }
}
