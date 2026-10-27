import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Ticket,
  TicketNuevo
} from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private apiUrl =
    'http://localhost:3000/api/tickets';

  constructor(
    private http: HttpClient
  ) {}

  obtenerTickets():
    Observable<Ticket[]> {
    return this.http.get<Ticket[]>(
      this.apiUrl
    );
  }

  obtenerTicket(
    id: number
  ): Observable<Ticket> {
    return this.http.get<Ticket>(
      `${this.apiUrl}/${id}`
    );
  }

  crearTicket(
    ticket: TicketNuevo
  ): Observable<Ticket> {
    return this.http.post<Ticket>(
      this.apiUrl,
      ticket
    );
  }

  actualizarTicket(
    id: number,
    ticket: TicketNuevo
  ): Observable<Ticket> {
    return this.http.put<Ticket>(
      `${this.apiUrl}/${id}`,
      ticket
    );
  }

  eliminarTicket(
    id: number
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
