import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ✅ MISMA DIRECCIÓN PARA EL LOGIN
  private API_LOGIN = 'https://apptiendajwt.onrender.com/api/login';

  constructor(private http: HttpClient) { }

  login(credenciales: { usuario: string; clave: string }): Observable<any> {
    return this.http.post(this.API_LOGIN, credenciales);
  }
}