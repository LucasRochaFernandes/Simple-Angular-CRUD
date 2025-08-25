import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: 'cadastro',
    component: RegisterComponent,
  },
  {
    path: 'consulta',
    component: SearchComponent,
  },
];
