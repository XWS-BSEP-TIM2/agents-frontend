export class RegistrationModel {
  constructor(
    public name: string = '',
    public surname: string = '',
    public email: string = '',
    public password: string = '',
    public role: string = 'USER'
  ) {}

  passwordStrength(): [string, boolean] {
    if (this.password === '') return ['', false];

    if (
      (this.name !== '' &&
        this.password.toLowerCase().includes(this.name.toLowerCase())) ||
      (this.surname !== '' &&
        this.password.toLowerCase().includes(this.surname.toLowerCase()))
    ) {
      return ['Password should not contain you name', false];
    }

    var decimal =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,40}$/;
    if (this.password.match(decimal)) {
      return ['Password is strong', true];
    }
    return [
      'Password is week (password must contain at least 8 charters with lower, upper, digit and special character)',
      false,
    ];
  }

  validateProperty(): boolean {
    for (const property in this) {
      if (property !== 'isPrivate' && !this[property]) {
        return false;
      }
    }
    let [t, b] = this.passwordStrength();
    return b;
  }
}
