import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // Tu misma dirección de la API
  private API = 'https://apptiendajwt.onrender.com/api/productos';
  private URL_BASE = 'https://apptiendajwt.onrender.com';

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  obtenerTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  // Guardar producto con imagen
  guardar(datos: any, imagen: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', datos.nombre);
    formData.append('descripcion', datos.descripcion || '');
    formData.append('precio', datos.precio);
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post(this.API, formData);
  }

  // Obtener dirección completa de la imagen
  obtenerImagen(ruta: string | null): string {
    return ruta ? `${this.URL_BASE}${ruta}` : 'assets/icon/favicon.png';
  }
}