import { ApplicationUser } from './applicationUser';
import { Company } from './company';
import { JobOffer } from './jobOffer';

export class Post {
  constructor(
    public id: string = '',
    public user: ApplicationUser = new ApplicationUser(),
    public company: Company = new Company(),
    public jobOffer: JobOffer = new JobOffer(),
    public timestamp: Date = new Date(),
    public type: string = ''
  ) {}
}
