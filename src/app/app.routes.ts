import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';

// Aquí importamos las páginas que ya tienes
import { HomePage } from './home/home.page';
import { ClientesPage } from './pages/clientes/clientes.page';
import { NuevoClientePage } from './pages/nuevo-cliente/nuevo-cliente.page';
import { DetalleClientePage } from './pages/detalle-cliente/detalle-cliente.page';
import { LoginPage } from './pages/login/login.page';

// Definimos las rutas
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Página de inicio
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage },
  { path: 'clientes', component: ClientesPage },
  { path: 'nuevo-cliente', component: NuevoClientePage },
  { path: 'detalle-cliente/:id', component: DetalleClientePage } // Para editar
];

// Configuración para que funcione todo
export const appConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular(),
    importProvidersFrom(HttpClientModule) // Necesario para conectar con la base
  ]
};