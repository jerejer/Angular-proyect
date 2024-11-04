import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'] 
})
export class CreateUserComponent implements OnInit {
  createForm!: FormGroup;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: [0, [Validators.required, Validators.pattern("^[0-9]*$")]], 
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      estado: [true, Validators.required],
      id_roles: [0, Validators.required]
    });
  }

  createUser(): void {
   

    if (this.createForm.valid) {
      const userData: User = {
        id_usuario: 0, 
        ...this.createForm.value,
        fech_creacion: new Date().toISOString(),
        fech_actualizacion: new Date().toISOString() 
      };

      this.userService.createUser(userData).subscribe({
        next: () => {
          this.notificationService.succes('Usuario creadeichon')
          console.log('R');
          alert('Usuario creado correctamente');
          this.router.navigate(['/admin/user/list']);
        },
        error: (err) => {
          console.error('Error al crear el usuario:', err);
          alert('Hubo un error al crear el usuario');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente');
    }
  }
}
