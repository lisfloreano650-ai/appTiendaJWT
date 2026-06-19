import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductosService } from '../../services/productos';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CatalogoPage implements OnInit {
  listaProductos: any[] = [];

  constructor(public prodService: ProductosService) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.prodService.obtenerTodos().subscribe({
      next: datos => this.listaProductos = datos,
      error: err => {
        console.error(err);
        alert('No se pudieron cargar los productos');
      }
    });
  }
}