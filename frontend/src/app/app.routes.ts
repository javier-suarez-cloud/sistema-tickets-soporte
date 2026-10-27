import { Routes } from '@angular/router';
import { ListaTickets } from './components/lista-tickets/lista-tickets';
import { FormularioTicket } from './components/formulario-ticket/formulario-ticket';

export const routes: Routes = [
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'tickets', component: ListaTickets },
  { path: 'nuevo', component: FormularioTicket },
  { path: 'editar/:id', component: FormularioTicket },
  { path: '**', redirectTo: 'tickets' }
];