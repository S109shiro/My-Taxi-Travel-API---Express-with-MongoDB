import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // Colocar url de la api para usuarios
  private urlApi = "http://localhost:3000/users";

  constructor(private http: HttpClient){}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlApi+"/getAll");  
  }

  // Obtener un usuario
  getUsuario(id: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlApi}/get/${id}`);
  }

  // Crear un usuario
  postUsuario(newUsuario: Usuario): Observable<String>{
    return this.http.post<String>(this.urlApi+"/create", newUsuario);
  }

  // Actualizar un usuario
  putUsuario(id: string, updateUsuario: Usuario): Observable<String>{
    return this.http.put<String>(`${this.urlApi}/update/${id}`, updateUsuario);
  }

  // Eliminar un usuario
  deleteUsuario(id:string): Observable<String>{
    return this.http.delete<String>(`${this.urlApi}/delete/${id}`);
  }

}
