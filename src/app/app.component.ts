import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,               // Indica que el componente es standalone
  imports: [RouterModule, RouterOutlet],         // Importa RouterModule para poder usar <router-outlet>
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'miProyectoF';
}
