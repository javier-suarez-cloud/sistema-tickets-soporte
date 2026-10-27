import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css'
})
export class Cabecera {
  titulo = 'Sistema de Soporte Técnico';
  subtitulo = 'Gestión de tickets de atención';
}