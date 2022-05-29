export class ApplicationUser {
  constructor(
    public id: string = '',
    public name: string = '',
    public surname: string = '',
    public email: string = '',
    public role: string = ''
  ) {}
}
