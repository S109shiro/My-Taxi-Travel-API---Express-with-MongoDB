import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro implements OnInit{
  // Objeto para guardar datos del Usuario
  usuario: Usuario = {
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    edad: 0,
    numero_identificacion: 0,
    email: '',
    sexo: '',
    documento_identidad: '',
    numero_telefono: '',
    fecha_nacimiento: '1980-01-01',
    calificacion_media: 0,
    contrasena: '',
  };

  // Para validacion de contraseñas
  confirmPassword: string = '';


    // Constructor del service y el title de la pagina
  constructor(private titleService: Title, private usuarioService: UsuarioService){};

  ngOnInit(){
    // Personalizacion del title
    this.titleService.setTitle("My Taxi Travel - Registro");
    
  }

  // Funcion para utilizar la funcion del post del service con la estructura del usuario
  crearUsuario(): void {
    this.usuarioService.postUsuario(this.usuario).subscribe(res =>(console.log(res)));
    //console.log("Toda la informacion almacenada");
  };


}
