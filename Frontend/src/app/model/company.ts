import { ApplicationUser } from './applicationUser';

export class Company {
  constructor(
    public id: string = '',
    public user: ApplicationUser = new ApplicationUser(),
    public description: string = '',
    public name: string = '',
    public tagline: string = '',
    public technologies: string[] = [],
    public emailList: string[] = [],
    public phoneNumberList: string[] = []
  ) {}
}
