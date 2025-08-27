import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/register/register.component';

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
