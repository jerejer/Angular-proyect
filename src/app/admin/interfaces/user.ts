export interface User {
    id_usuario: number,
    nombre: string,
    apellido: string,
    cedula: string,
    correo: string,
    contrasena: string,
    fech_creacion: Date,
    fech_actualizacion: Date,
    estado: boolean,
    id_roles: number,
  }

  export interface UserEdit{
    
      nombre: string,
      apellido: string,
      correo: string,
      contrasena: string,
      fech_actualizacion: string,
      estado: true,
      id_roles: boolean
    
  }
  