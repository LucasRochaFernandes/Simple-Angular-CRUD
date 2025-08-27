import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, Municipio } from './models/brazilapi.models';

@Injectable({
  providedIn: 'root',
})
export class BrazilapiService {
  private readonly BASE_URL = 'https://brasilapi.com.br/api';

  constructor(private httpClient: HttpClient) {}

  listUFs(): Observable<Estado[]> {
    return this.httpClient.get<Estado[]>(this.BASE_URL + '/ibge/uf/v1');
  }
  listMunicipalities(uf: string): Observable<Municipio[]> {
    return this.httpClient.get<Municipio[]>(this.BASE_URL + '/ibge/municipios/v1/' + uf);
  }
}
