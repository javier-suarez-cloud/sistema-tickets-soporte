export type Prioridad = 'Baja' | 'Media' | 'Alta';

export type Estado = 'Abierto' | 'En proceso' | 'Resuelto';

export interface Ticket {
  id: number;
  asunto: string;
  solicitante: string;
  descripcion: string;
  categoria: string;
  prioridad: Prioridad;
  estado: Estado;
  fechaRegistro: string;
}

// Ticket sin id ni fecha: lo que se envía al crear o editar
export type TicketNuevo =
  Omit<Ticket, 'id' | 'fechaRegistro'>;
