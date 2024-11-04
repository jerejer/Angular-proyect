import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { CommonModule, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { UppercasePipe } from '../../../../shared/components/pipes/user-status.pipe';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgForOf, RouterLink, CommonModule, UppercasePipe],
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'] 
})
export class ListUserComponent {
  User: User[] = [];

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,  // injectar el servicio de notificaciones
  ) {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.User = users.resultado;
        
      },
      error: (error) => {
        console.log('Error al obtener usuarios: ' + error.message);
      },
    });
  }

  deleteUserforid(id: number): void {

    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.notificationService.peligreichon('Usuario eliminado')
          // alert('Usuario eliminado');
          this.getUsers(); 
        },
        error: (error) => {
          console.log('Error al eliminar usuario: ' + error.message);
        },
        complete: () => {
          console.log('Proceso de eliminación completado');
        },
      });
    }
  }
}
