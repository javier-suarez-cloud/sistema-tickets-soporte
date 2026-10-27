import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  TicketsService
} from '../../services/tickets';

@Component({
  selector: 'app-formulario-ticket',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-ticket.html',
  styleUrl: './formulario-ticket.css'
})
export class FormularioTicket implements OnInit {

  ticketId: number | null = null;
  error = signal('');

  formulario = new FormGroup({

    asunto: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5)
      ]
    }),

    solicitante: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),

    descripcion: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10)
      ]
    }),

    categoria: new FormControl('Hardware', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    prioridad: new FormControl<'Baja' | 'Media' | 'Alta'>('Media', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    estado: new FormControl<'Abierto' | 'En proceso' | 'Resuelto'>('Abierto', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })

  });

  constructor(
    private ticketsService: TicketsService,
    private ruta: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.ruta.snapshot.paramMap.get('id');

    if (id) {
      this.ticketId = Number(id);
      this.cargarTicket(this.ticketId);
    }
  }

  cargarTicket(id: number): void {
    this.ticketsService
      .obtenerTicket(id)
      .subscribe({
        next: (ticket) => {
          this.formulario.patchValue(ticket);
        },
        error: (error) => {
          console.error(error);
          this.error.set(
            'No fue posible cargar el ticket.'
          );
        }
      });
  }

  guardar(): void {
    this.error.set('');

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const ticket =
      this.formulario.getRawValue();

    const peticion = this.ticketId
      ? this.ticketsService.actualizarTicket(this.ticketId, ticket)
      : this.ticketsService.crearTicket(ticket);

    peticion.subscribe({
      next: () => {
        this.router.navigate(['/tickets']);
      },
      error: (error) => {
        console.error(error);
        this.error.set(
          'No fue posible guardar el ticket.'
        );
      }
    });
  }
}