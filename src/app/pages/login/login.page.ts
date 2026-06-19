import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonToast } from '@ionic/angular/standalone';
import { ClientesService } from '../../services/clientes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonToast]
})
export class LoginPage {
  usuario = '';
  clave = '';
  mostrarToast = false;
  mensaje = '';
  colorToast = 'danger';

  constructor(private servicio: ClientesService, private router: Router) {}

  ingresar() {
    if (!this.usuario || !this.clave) {
      this.mensaje = '⚠️ Completa ambos campos';
      this.mostrarToast = true;
      return;
    }

    this.servicio.validarAcceso({ usuario: this.usuario, clave: this.clave }).subscribe({
      next: (respuesta: any) => {
        this.mensaje = respuesta.mensaje;
        this.colorToast = respuesta.ok ? 'success' : 'danger';
        this.mostrarToast = true;

        if (respuesta.ok) {
          setTimeout(() => this.router.navigate(['/clientes']), 1000);
        }
      },
      error: () => {
        this.mensaje = '❌ No hay conexión con el servidor';
        this.mostrarToast = true;
      }
    });
  }
}