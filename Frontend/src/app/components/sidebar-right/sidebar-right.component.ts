import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/app/model/applicationUser';
import { Company } from 'src/app/model/company';
import { BrowseService } from 'src/app/services/browse.service';

@Component({
  selector: 'sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss'],
})
export class SidebarRightComponent implements OnInit {
  users: ApplicationUser[] = [];
  companies: Company[] = [];

  constructor(private browseService: BrowseService) {}

  ngOnInit(): void {
    this.browseService.getAllCompanies().subscribe((data) => {
      if (data != null) {
        this.companies = this.shuffle(data);
      }
    });

    this.browseService.getAllUsers().subscribe((data) => {
      if (data != null) {
        this.users = this.shuffle(data);
      }
    });
  }

  fullName(user: ApplicationUser) {
    return user.name + ' ' + user.surname;
  }

  shuffle(array: []) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
