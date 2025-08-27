import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../models/Client';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../../services/client.service';
import { BrazilapiService } from '../../services/brazilapi.service';
import { Estado, Municipio } from '../../services/models/brazilapi.models';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  client: Client;
  isUpdate: boolean;
  states: Estado[];
  municipalities: Municipio[];

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private _snack: MatSnackBar = inject(MatSnackBar),
    private brazilApiService: BrazilapiService
  ) {
    this.client = new Client();
    this.isUpdate = false;
    this.states = [];
    this.municipalities = [];
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: ParamMap) => {
      const paramId = query.get('id');
      if (paramId) {
        const clientFound = this.clientService.getClientById(paramId);
        if (clientFound) {
          this.isUpdate = true;
          this.client = clientFound;
          if (this.client.uf) {
            const event = { value: this.client.uf };
            this.loadMunicipalities(event as MatSelectChange);
          }
        }
      }
    });
    this.loadUFs();
  }
  loadMunicipalities(event: MatSelectChange) {
    const selectedUF = event.value;
    this.brazilApiService.listMunicipalities(selectedUF).subscribe({
      next: (listMunicipalities) => (this.municipalities = listMunicipalities),
      error: (err) => console.error(err),
    });
  }
  loadUFs() {
    this.brazilApiService.listUFs().subscribe({
      next: (listUFs) => (this.states = listUFs),
      error: (err) => console.error(err),
    });
  }

  onSaveClient() {
    if (this.isUpdate) {
      this.isUpdate = false;
      this.clientService.updateClient(this.client);
      this.router.navigate(['/consulta']);
      this.displayMessage('Cliente Atualizado com Sucesso!');
    } else {
      this.clientService.saveStorage(this.client);
      this.client = new Client();
      this.displayMessage('Cliente Cadastrado com Sucesso!');
    }
  }
  displayMessage(message: string) {
    this._snack.open(message, 'Ok');
  }
}
