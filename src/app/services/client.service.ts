import { Injectable } from '@angular/core';
import { Client } from '../components/models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly REPO_CLIENTES: string = '_CLIENTS';

  constructor() {}

  saveStorage(client: Client) {
    const storage = this.getStorage();
    storage.push(client);
    localStorage.setItem(this.REPO_CLIENTES, JSON.stringify(storage));
  }
  searchClients(name: string): Client[] {
    let clients = this.getStorage();
    if (name) {
      clients = clients.filter((client) => client.name?.toLowerCase().includes(name.toLowerCase()));
    }
    return clients;
  }
  getClientById(id: string): Client | null {
    const client = this.getStorage().find((client) => client.id === id);
    if (client) return client;
    return null;
  }
  updateClient(client: Client) {
    const storage = this.getStorage().map((clientStorage) => {
      if (clientStorage.id === client.id) {
        Object.assign(clientStorage, client);
        return clientStorage;
      }
      return clientStorage;
    });
    localStorage.setItem(this.REPO_CLIENTES, JSON.stringify(storage));
  }
  deleteClient(id: string) {
    let storage = this.getStorage();
    storage = storage.filter((client) => client.id !== id);
    localStorage.setItem(this.REPO_CLIENTES, JSON.stringify(storage));
  }
  getStorage(): Client[] {
    const clients = localStorage.getItem(this.REPO_CLIENTES);
    if (clients) {
      return JSON.parse(clients);
    }
    return [];
  }
}
