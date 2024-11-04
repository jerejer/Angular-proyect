/* import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

} */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User,UserEdit } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  userId: any;
  editForm!: FormGroup;
  loading: boolean = true;

  constructor(

    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadUser(this.userId);

    this.editForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      estado: [true, Validators.required],
      id_roles: ['', Validators.required],
    });
  }

  loadUser(id: number): void {
    this.loading = true;
    if (id) {
      this.userService.getUserById(id).subscribe({
        next: (data) => {
          this.editForm.patchValue({
            nombre: data.nombre,
            apellido: data.apellido,
            cedula: data.cedula,
            correo: data.correo,
            contrasena: data.contrasena,
            estado: data.estado,
            id_roles: data.id_roles,
          });
          this.loading = false;
          
          console.log('Usuario encontrado correctamente');
        },
      });
    } else {
      this.loading = false;
    }
  }

  updateUser(): void {
    if (this.editForm.valid) {
      const userData: User = {
        ...this.editForm.value,
        fech_actualizacion: new Date().toISOString(), 
      };

      this.userService.updateUser( this.userId,userData,).subscribe({
        next: () => {
          this.notificationService.aviseichon('El usuario, ha sido actualizado correctamente');
        //  alert('Actualizado correctamente');
          this.router.navigate(['/admin/user/list']);
        },
        error: (err) => {
          console.error('Error al actualizar el usuario:', err);
        },
      });
    }
  }
}
