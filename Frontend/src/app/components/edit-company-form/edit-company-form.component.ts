import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationUser } from 'src/app/model/applicationUser';
import { Company } from 'src/app/model/company';
import { SelectTechnologiesDialogComponent } from 'src/app/select-technologies-dialog/select-technologies-dialog.component';
import { BrowseService } from 'src/app/services/browse.service';
import { CompanyService } from 'src/app/services/company.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'edit-company-form',
  templateUrl: './edit-company-form.component.html',
  styleUrls: ['./edit-company-form.component.scss'],
})
export class EditCompanyFormComponent implements OnInit {
  company: Company = new Company();
  user: ApplicationUser = new ApplicationUser();
  technologies: string = '';
  phoneNumbers: string = '';
  emails: string = '';

  constructor(
    private browseService: BrowseService,
    private companyService: CompanyService,
    private loginService: LoginService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user.id = this.loginService.getCurrentUser().id;
    this.browseService.getUserById(this.user.id).subscribe((data) => {
      this.user = data;

      this.browseService.getCompanyByUserId(this.user.id).subscribe((data) => {
        this.company = data;
        this.emails = this.company.emailList.toString();
        this.phoneNumbers = this.company.phoneNumberList.toString();
        this.technologies = this.company.technologies.toString();
      });
    });
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

  validForm() {
    return (
      this.company.name.trim() != '' &&
      this.company.description.trim() != '' &&
      this.company.tagline.trim() != '' &&
      this.emails.trim() != '' &&
      this.phoneNumbers.trim() != '' &&
      this.technologies.trim() != ''
    );
  }

  send() {
    if (this.validForm()) {
      this.company.name = this.company.name.trim();
      this.company.description = this.company.description.trim();
      this.company.tagline = this.company.tagline.trim();
      this.company.user = this.user;
      this.company.emailList = this.emails.split(',').map((e) => e.trim());
      this.company.phoneNumberList = this.phoneNumbers
        .split(',')
        .map((e) => e.trim());
      this.company.technologies = this.technologies
        .split(',')
        .map((e) => e.trim());

      this.userService.updateUserApiToken(this.user).subscribe((data) => {
        if (data) {
          this.companyService.updateCompany(this.company).subscribe((data) => {
            if (data) {
              alert('Your company has been updated!');
              window.location.href = '/user/' + this.user.id;
            }
          });
        }
      });
    }
  }
}
