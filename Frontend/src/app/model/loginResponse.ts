export class LoginResponse {
  constructor(
    public jwt: string = '',
    public id: string = '',
    public role: string = '',
    public email: string = '',
    public fullName: string = '',
    public twoFactor:boolean=false
  ) {}
}
