import { Company } from './company';

export class JobOffer {
  constructor(
    public id: string = '',
    public company: Company = new Company(),
    public position: string = '',
    public seniority: string = '',
    public description: string = '',
    public technologies: string[] = []
  ) {}
}
