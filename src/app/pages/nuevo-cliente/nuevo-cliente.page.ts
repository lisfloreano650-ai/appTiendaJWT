import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, 
  IonInput, IonButton, IonToast, IonBackButton, IonButtons 
} from '@ionic/angular/standalone';
import { ClientesService } from '../../services/clientes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.page.html',
  standalone: true,
  imports: [
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton,
    IonToast, IonBackButton, IonButtons
  ]
})
export class NuevoClientePage {
  identificacion = '';
  nombre = '';
  correo = '';
  telefono = '';
  direccion = '';
  ciudad = '';
  pais = '';

  mostrarToast = false;
  mensaje = '';
  colorToast = 'success';

  constructor(private srv: ClientesService, private router: Router) {}

  guardarCliente() {
    if (!this.identificacion || !this.nombre || !this.correo || !this.telefono) {
      this.mensaje = '⚠️ Identificación, nombre, correo y teléfono son obligatorios';
      this.colorToast = 'warning';
      this.mostrarToast = true;
      return;
    }

    const datos = {
      identificacion: this.identificacion,
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono,
      direccion: this.direccion,
      ciudad: this.ciudad,
      pais: this.pais
    };

    this.srv.guardar(datos).subscribe({
      next: (resp: any) => {
        this.mensaje = resp.mensaje;
        this.colorToast = resp.ok ? 'success' : 'danger';
        this.mostrarToast = true;
        if (resp.ok) {
          setTimeout(() => this.router.navigate(['/clientes']), 1200);
        }
      },
      error: () => {
        this.mensaje = '❌ Error al conectar con la base de datos';
        this.colorToast = 'danger';
        this.mostrarToast = true;
      }
    });
  }
}