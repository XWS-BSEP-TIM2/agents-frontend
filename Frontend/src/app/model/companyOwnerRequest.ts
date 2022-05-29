import { Company } from "./company";

export class CompanyOwnerRequest {
  constructor(
    public id: string = "",
    public timestamp: Date = new Date(),
    public company: Company = new Company(),
    public accepted: boolean = false
  ) {}
}
