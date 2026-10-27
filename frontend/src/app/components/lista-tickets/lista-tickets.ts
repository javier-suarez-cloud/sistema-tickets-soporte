import {
  DatePipe
} from '@angular/common';

import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  Ticket
} from '../../models/ticket';

import {
  TicketsService
} from '../../services/tickets';

@Component({
  selector: 'app-lista-tickets',
  imports: [RouterLink, DatePipe],
  templateUrl: './lista-tickets.html',
  styleUrl: './lista-tickets.css'
})
export class ListaTickets implements OnInit {

  tickets = signal<Ticket[]>([]);
  cargando = signal(true);
  error = signal('');

  constructor(
    private ticketsService: TicketsService
  ) {}

  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.cargando.set(true);
    this.error.set('');

    this.ticketsService
      .obtenerTickets()
      .subscribe({
        next: (datos) => {
          this.tickets.set(datos);
          this.cargando.set(false);
        },
        error: (error) => {
          console.error(error);
          this.error.set(
            'No fue posible cargar los tickets.'
          );
          this.cargando.set(false);
        }
      });
  }

  
  eliminar(ticket: Ticket): void {
    if (!confirm(`¿Eliminar el ticket "${ticket.asunto}"?`)) {
      return;
    }

    this.ticketsService
      .eliminarTicket(ticket.id)
      .subscribe({
        next: () => {
          this.cargarTickets();
        },
        error: (error) => {
          console.error(error);
          this.error.set(
            'No fue posible eliminar el ticket.'
          );
        }
      });
  }

}