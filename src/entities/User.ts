export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private id: number
  ) {}

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getId(): number {
    return this.id;
  }
}
