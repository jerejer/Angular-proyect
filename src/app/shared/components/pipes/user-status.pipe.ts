// shared/pipes/user-status.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus',
  standalone: true,  // Esto es importante para que el pipe sea usado en componentes standalone
})
export class UserStatusPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Activo' : 'Inactivo';
  }
}
