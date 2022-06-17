export class RecoveryRequest {
    constructor(
        public email: string = '',
        public recoveryCode: string = '',
        public newPassword: string = '',
        public confirmNewPassword: string = '',
    ) { }

    validateProperty(): boolean {
        let [t, b] = this.passwordStrength();
        return this.email !== '' && this.recoveryCode !== '' && this.newPassword !== '' && this.newPassword === this.confirmNewPassword && b
    }

    passwordStrength(): [string, boolean] {

        if (this.newPassword === '') return ["", false];

        if (this.email !== '' && this.newPassword.toLowerCase().includes(this.email.toLowerCase())) {
            return ["Password should not contain you email", false]
        }

        var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,40}$/;
        if (this.newPassword.match(decimal)) {
            return ["Password is strong", true];
        }
        return ["Password is week (password must contain at least 8 charters with lower, upper, digit and special character)", false];
    }

    passwordMatch(): boolean {
        return this.newPassword === this.confirmNewPassword;
    }
}
