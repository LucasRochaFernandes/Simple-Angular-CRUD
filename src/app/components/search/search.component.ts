import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../models/Client';

@Component({
  selector: 'app-search',
  imports: [
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  nameSearch: string = '';
  listClients: Client[] = [];
  columnsToDisplay = ['name', 'email', 'cpf', 'dayOfBirth', 'actions'];

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listClients = this.clientService.getStorage();
  }
  onSearchClient(): void {
    this.listClients = this.clientService.searchClients(this.nameSearch.trim());
  }
  onEditClient(id: string): void {
    console.log('Edit client with id:', id);
    this.router.navigate(['/cadastro'], { queryParams: { id } });
  }
  onRequestDeleteClient(client: Client) {
    client.isDeleting = true;
  }
  onConfirmDeleteClient(id: string) {
    this.clientService.deleteClient(id);
    this.listClients = this.clientService.getStorage();
  }
}
