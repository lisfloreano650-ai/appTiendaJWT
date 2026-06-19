import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonToast } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonToast]
})
export class ClientesPage implements OnInit {
  clientes: any[] = [];
  mostrarToast = false;
  mensaje = '';
  colorToast = 'success';

  constructor(private srv: ClientesService, private router: Router) {}

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista() {
    this.srv.obtenerTodos().subscribe({
      next: (respuesta: any) => {
        if (respuesta.ok) {
          this.clientes = respuesta.clientes;
        } else {
          this.mensaje = respuesta.mensaje;
          this.colorToast = 'danger';
          this.mostrarToast = true;
        }
      },
      error: () => {
        this.mensaje = '❌ No se pudo conectar con la base de datos';
        this.colorToast = 'danger';
        this.mostrarToast = true;
      }
    });
  }

  irAEditar(id: number) {
    this.router.navigate(['/detalle-cliente', id]);
  }

  borrarCliente(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este cliente? Se borrará de tu base de datos')) return;
    this.srv.eliminar(id).subscribe({
      next: (resp: any) => {
        this.mensaje = resp.mensaje;
        this.colorToast = resp.ok ? 'success' : 'danger';
        this.mostrarToast = true;
        this.cargarLista(); // Recarga la lista después de borrar
      }
    });
  }
}