import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonToast, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.page.html',
  standalone: true,
  imports: [FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonToast, IonBackButton, IonButtons]
})
export class DetalleClientePage implements OnInit {
  id: number = 0;
  cliente: any = {
    cli_identificacion: '',
    cli_nombre: '',
    cli_telefono: '',
    cli_correo: '',
    cli_direccion: '',
    cli_ciudad: '',
    cli_pais: ''
  };
  mostrarToast = false;
  mensaje = '';
  colorToast = 'success';

  constructor(private ruta: ActivatedRoute, private srv: ClientesService, private router: Router) {}

  ngOnInit() {
    this.id = Number(this.ruta.snapshot.paramMap.get('id'));
    this.cargarDatos();
  }

  cargarDatos() {
    this.srv.obtenerPorId(this.id).subscribe({
      next: (resp: any) => {
        if (resp.ok) this.cliente = resp.cliente;
      }
    });
  }

  guardarCambios() {
    const datos = {
      identificacion: this.cliente.cli_identificacion,
      nombre: this.cliente.cli_nombre,
      telefono: this.cliente.cli_telefono,
      correo: this.cliente.cli_correo,
      direccion: this.cliente.cli_direccion,
      ciudad: this.cliente.cli_ciudad,
      pais: this.cliente.cli_pais
    };

    this.srv.actualizar(this.id, datos).subscribe({
      next: (resp: any) => {
        this.mensaje = resp.mensaje;
        this.colorToast = resp.ok ? 'success' : 'danger';
        this.mostrarToast = true;
        setTimeout(() => this.router.navigate(['/clientes']), 1200);
      }
    });
  }
}