export class AuthenticationForm {
  name;
  email;
  password;

  // Error messages
  nameError;
  emailError;
  passwordError;
  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';

    this.nameError = '';
    this.emailError = '';
    this.passwordError = '';
  }
}
