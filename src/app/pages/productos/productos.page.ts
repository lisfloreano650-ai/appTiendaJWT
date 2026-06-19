import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Agregado
import { CommonModule } from '@angular/common'; // ✅ Agregado
import { IonicModule, ToastController } from '@ionic/angular';
import { ProductosService } from '../../services/productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true, // ✅ Si dice true, así se deja
  imports: [
    CommonModule,
    FormsModule, // ✅ AQUÍ LO PONEMOS
    IonicModule
  ]
})
export class ProductosPage {
  producto = { nombre: '', descripcion: '', precio: null };
  imagenSeleccionada: File | null = null;

  constructor(
    private prodService: ProductosService,
    private toastCtrl: ToastController
  ) {}

  seleccionarImagen(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  async guardarProducto() {
    if (!this.producto.nombre || !this.producto.precio) {
      const toast = await this.toastCtrl.create({
        message: 'Completa nombre y precio',
        duration: 2000
      });
      toast.present();
      return;
    }

    this.prodService.guardar(this.producto, this.imagenSeleccionada).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: '✅ Producto guardado',
          duration: 2000
        });
        toast.present();
        this.producto = { nombre: '', descripcion: '', precio: null };
        this.imagenSeleccionada = null;
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: '❌ Error al guardar',
          duration: 3000
        });
        toast.present();
      }
    });
  }
}