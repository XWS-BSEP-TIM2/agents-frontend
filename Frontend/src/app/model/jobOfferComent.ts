import { ApplicationUser } from './applicationUser';
import { JobOffer } from './jobOffer';

export class JobOfferComment {
  constructor(
    public id: string = '',
    public user: ApplicationUser = new ApplicationUser(),
    public jobOffer: JobOffer = new JobOffer(),
    public rating: number = 5,
    public comment: string = '',
    public salary: number = 900.0
  ) {}
}
