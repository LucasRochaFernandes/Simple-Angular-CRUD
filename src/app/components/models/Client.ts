export class Client {
  id: string;
  name: string = '';
  cpf: string = '';
  dayOfBirth: string = '';
  email: string = '';
  isDeleting: boolean = false;
  uf: string = '';
  municipality: string = '';

  constructor() {
    this.id = crypto.randomUUID();
  }
}
